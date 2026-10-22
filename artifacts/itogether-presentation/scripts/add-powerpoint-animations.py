"""Add native entrance effects to an exported PPTX, preserving its artwork.

Usage: python scripts/add-powerpoint-animations.py input.pptx output.pptx
The source export remains unchanged. Animations start automatically per slide.
"""
import argparse
import re
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

P = "http://schemas.openxmlformats.org/presentationml/2006/main"
A = "http://schemas.openxmlformats.org/drawingml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
NS = {"p": P, "a": A}
for prefix, uri in (("p", P), ("a", A), ("r", R)):
    ET.register_namespace(prefix, uri)


def node(parent, name, **attrs):
    return ET.SubElement(parent, f"{{{P}}}{name}", attrs)


def animate_slide(root):
    tree = root.find("p:cSld/p:spTree", NS)
    targets = []
    for shape in tree:
        info = shape.find(".//p:cNvPr", NS)
        if info is None:
            continue
        text = "".join(t.text or "" for t in shape.findall(".//a:t", NS)).strip()
        is_picture = shape.tag == f"{{{P}}}pic"
        if not text and not is_picture:
            continue
        if text == "FIT-HPUni — ITogether" or re.fullmatch(r"\d{2}", text):
            continue
        extent = shape.find("p:spPr/a:xfrm/a:ext", NS)
        if is_picture and extent is not None:
            # The exporter includes a full-frame background picture.
            if int(extent.get("cx", "0")) >= 9_100_000 and int(extent.get("cy", "0")) >= 5_100_000:
                continue
        targets.append((info.get("id"), bool(text)))

    old = root.find("p:timing", NS)
    if old is not None:
        root.remove(old)
    timing = ET.Element(f"{{{P}}}timing")
    # Slide child order: cSld, clrMapOvr?, transition?, timing?, extLst?.
    ext = root.find("p:extLst", NS)
    root.insert(list(root).index(ext) if ext is not None else len(root), timing)
    timeline = node(node(node(timing, "tnLst"), "par"), "cTn",
                    id="1", dur="indefinite", restart="never", nodeType="tmRoot")
    sequence = node(node(timeline, "childTnLst"), "seq", concurrent="1", nextAc="seek")
    main = node(sequence, "cTn", id="2", dur="indefinite", nodeType="mainSeq")
    group = node(node(node(main, "childTnLst"), "par"), "cTn", id="3", fill="hold")
    node(node(group, "stCondLst"), "cond", delay="0")
    effects = node(group, "childTnLst")
    next_id = 4
    for index, (shape_id, _) in enumerate(targets):
        effect = node(node(effects, "par"), "cTn",
                      id=str(next_id), presetID="10", presetClass="entr",
                      presetSubtype="0", fill="hold", nodeType="withEffect")
        next_id += 1
        node(node(effect, "stCondLst"), "cond", delay=str(index * 180))
        children = node(effect, "childTnLst")

        # Explicitly show the shape when its entrance begins.
        visible = node(children, "set")
        behavior = node(visible, "cBhvr")
        clock = node(behavior, "cTn", id=str(next_id), dur="1", fill="hold")
        next_id += 1
        node(node(clock, "stCondLst"), "cond", delay="0")
        node(node(behavior, "tgtEl"), "spTgt", spid=shape_id)
        node(node(behavior, "attrNameLst"), "attrName").text = "style.visibility"
        node(node(visible, "to"), "strVal", val="visible")

        fade = node(children, "animEffect", transition="in", filter="fade")
        behavior = node(fade, "cBhvr")
        node(behavior, "cTn", id=str(next_id), dur="650")
        next_id += 1
        node(node(behavior, "tgtEl"), "spTgt", spid=shape_id)

    for name, event in (("prevCondLst", "onPrev"), ("nextCondLst", "onNext")):
        condition = node(node(sequence, name), "cond", evt=event, delay="0")
        node(node(condition, "tgtEl"), "sldTgt")
    builds = node(timing, "bldLst")
    for shape_id, is_text in targets:
        if is_text:
            node(builds, "bldP", spid=shape_id, grpId="0", build="allAtOnce")
    return len(targets)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    if args.source.resolve() == args.output.resolve():
        parser.error("Source and output must be different files.")
    counts = {}
    with ZipFile(args.source) as original, ZipFile(args.output, "w") as output:
        for entry in original.infolist():
            data = original.read(entry.filename)
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", entry.filename):
                root = ET.fromstring(data)
                counts[entry.filename] = animate_slide(root)
                data = ET.tostring(root, encoding="utf-8", xml_declaration=True)
            output.writestr(entry, data)

    # Check every XML part, shape reference and timeline id after packaging.
    with ZipFile(args.output) as output:
        assert output.testzip() is None, "Corrupt ZIP entry"
        for name in output.namelist():
            if name.endswith((".xml", ".rels")):
                ET.fromstring(output.read(name))
        for name, count in counts.items():
            root = ET.fromstring(output.read(name))
            timing = root.find("p:timing", NS)
            ids = [element.get("id") for element in timing.findall(".//p:cTn", NS)]
            assert len(ids) == len(set(ids)), f"Duplicate timeline ids: {name}"
            shapes = {item.get("id") for item in root.findall(".//p:cNvPr", NS)}
            refs = {item.get("spid") for item in timing.findall(".//p:spTgt", NS)}
            assert refs <= shapes, f"Unknown target shape: {name}"
            assert len(timing.findall(".//p:animEffect", NS)) == count > 0
    print(f"Validated {len(counts)} animated slides, {sum(counts.values())} native fade effects.")
    print(args.output)


if __name__ == "__main__":
    main()
