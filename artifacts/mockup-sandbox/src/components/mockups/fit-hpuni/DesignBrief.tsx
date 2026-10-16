import type { ReactNode } from "react";
import { BoardShell } from "./_shared/BoardShell";
import { BRAND, PALETTE } from "./_shared/brand";
import { FitLogo, PoloShirt, TeeShirt } from "./_shared/garments";

const ink = PALETTE.navyDeep.hex;
const navy = BRAND.navy;
const line = "#CDD6DF";

function SectionHead({ number, title, note }: { number: string; title: string; note?: string }) {
  return <div style={{ display: "flex", alignItems: "baseline", gap: 15, marginBottom: 20 }}>
    <span style={{ fontSize: 12, fontWeight: 700, color: navy, letterSpacing: 2 }}>{number}</span>
    <h2 style={{ fontSize: 25, fontWeight: 750, letterSpacing: "-.7px", margin: 0 }}>{title}</h2>
    {note && <span style={{ marginLeft: "auto", fontSize: 11, color: "#607286" }}>{note}</span>}
  </div>;
}

function Label({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.6, marginBottom: 10, textTransform: "uppercase", color: "#607286" }}>{children}</div>;
}

function Motif({ kind }: { kind: "A" | "B" | "C" }) {
  return <svg viewBox="0 0 300 100" style={{ width: 225, height: 75 }} aria-label={`Gợi ý họa tiết phương án ${kind}`}>
    {kind === "A" ? <g fill="none" stroke={PALETTE.silver.hex}>
      <path d="M118 13h64v40q-1 23-32 36-31-13-32-36Z" strokeWidth="2" />
      <path d="M128 23h44v28q-1 16-22 26-21-10-22-26Z" />
      <path d="M16 44h80m-80 7h80m108-7h80m-80 7h80" strokeWidth="2" />
      <text x="150" y="55" textAnchor="middle" fill={PALETTE.silver.hex} stroke="none" fontSize="16" fontWeight="700">FIT</text>
    </g> : kind === "B" ? <g fill="none" stroke={PALETTE.terminal.hex} strokeWidth="2">
      <path d="M0 70h35q15 0 15-15V30q0-15 15-15h20M216 80h24q15 0 15-15V45q0-15 15-15h30" />
      <text x="87" y="55" fill={PALETTE.terminal.hex} stroke="none" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="26">&gt; do IT_</text>
    </g> : <g>
      <path d="M40 76h72l37-35 41 35h70M150 42V15" fill="none" stroke={PALETTE.silver.hex} strokeWidth="2" />
      {[[145,20],[125,29],[128,48],[151,54],[169,35]].map(([x,y], i) => <g key={i} transform={`translate(${x} ${y}) rotate(${i*65})`}><path d="M-6-5h12v-8h10V0h-6v12H-6Z" fill={PALETTE.phuong.hex}/></g>)}
      <rect x="146" y="32" width="9" height="9" fill={PALETTE.nhuy.hex} />
      <g fill={PALETTE.phuong.hex}><rect x="87" y="72" width="7" height="7"/><rect x="202" y="72" width="7" height="7"/></g>
    </g>}
  </svg>;
}

const concepts = [
  { key: "A" as const, name: "Dấu Ấn", tag: "HỌC THUẬT · BỀN VỮNG", accent: PALETTE.silver.hex,
    hypothesis: "Logo như một huy hiệu. Thêu làm chủ đạo; viền sọc (tipping) ở cổ và bo tay tạo vẻ chỉn chu. Slogan kín đáo ở gáy, nẹp hoặc tay áo.",
    fit: "Giảng viên, hội nghị, sự kiện chính thức và đại diện khoa.",
    trade: "An toàn, ít hứng khởi với sinh viên. Thành bại phụ thuộc chất lượng thêu và bo dệt.",
    color: "Xám bạc · #C9D1D9" },
  { key: "B" as const, name: "do IT", tag: "HÀNH ĐỘNG · KẾT NỐI", accent: PALETTE.terminal.hex,
    hypothesis: "Slogan chính là thiết kế: chữ kiểu code / terminal. Dây cáp từ logo thành đường liền vòng thân tới slogan ở lưng — một hành trình đồng hành.",
    fit: "Hackathon, câu lạc bộ, sinh viên và các hoạt động năng lượng.",
    trade: "Polo phải tiết chế để đủ trang trọng. Đường cáp qua sườn phải tách vị trí in, canh khớp tại đường may.",
    color: "Xanh Terminal · #34D399" },
  { key: "C" as const, name: "Phượng Số", tag: "HẢI PHÒNG · CÔNG NGHỆ", accent: PALETTE.phuong.hex,
    hypothesis: "Hoa phượng bằng pixel / mạch điện: Hải Phòng — Thành phố Hoa Phượng Đỏ, cũng là hoa học trò của mùa thi và mùa tốt nghiệp.",
    fit: "Nhận diện riêng của ĐH Hải Phòng; hoạt động và quà tặng đại diện.",
    trade: "Thêm đỏ tăng chi phí. Họa tiết cần chắt lọc để không rối; đỏ trên navy phải so màu thật kỹ.",
    color: "Đỏ Phượng + Vàng nhụy" },
];

function Placement() {
  const dims = { fill: "none", stroke: "#C9D1D9", strokeWidth: 2.5 };
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
    <div>
      <PoloShirt body={navy} collar={ink} cuff={ink} buttonCount={3} realistic={false} style={{ width: "100%" }}
        annotations={<g fontFamily="'Be Vietnam Pro', sans-serif" fontSize="21" fill={ink}>
          <path d="M600 60h190M600 250h190M780 60v190m-8-181 8-9 8 9m-16 172 8 9 8-9" fill="none" stroke={navy} strokeWidth="2"/>
          <text x="800" y="160" fontSize="23">18–20 cm</text>
          <path d="M560 307h80m-80-8v16m80-16v16" {...dims}/><text x="600" y="340" textAnchor="middle" fill={PALETTE.white.hex}>7–9 cm</text>
          <circle cx="600" cy="250" r="47" fill="none" stroke="#C9D1D9" strokeWidth="2" strokeDasharray="8 5"/>
          <text x="500" y="850" textAnchor="middle">POLO / MẶT TRƯỚC</text>
        </g>}>
        <FitLogo cx={600} cy={250} d={80} />
      </PoloShirt>
    </div>
    <div>
      <TeeShirt body={navy} side="back" rib={ink} realistic={false} style={{ width: "100%" }}
        annotations={<g fontFamily="'Be Vietnam Pro', sans-serif" fontSize="23" fill={PALETTE.white.hex}>
          <rect x="350" y="225" width="300" height="400" rx="3" stroke="#C9D1D9" strokeWidth="2.5" strokeDasharray="10 7" fill="none"/>
          <text x="500" y="408" textAnchor="middle">TỐI ĐA</text><text x="500" y="445" textAnchor="middle">30 × 40 cm</text>
          <rect x="460" y="123" width="80" height="32" stroke="#C9D1D9" strokeWidth="2" strokeDasharray="6 4" fill="none"/>
          <path d="M548 137h125" {...dims}/><text x="679" y="145">6–8 cm</text>
          <text x="500" y="850" textAnchor="middle" fill={ink} fontSize="21">ÁO THUN / MẶT SAU</text>
        </g>} />
    </div>
  </div>;
}

export function DesignBrief() {
  return <BoardShell code="00" concept="Định hướng thiết kế" garment="Polo + Áo thun" accent={BRAND.navy}>
    <style>{`
      .fit-brief p { margin:0; }
      .fit-brief { color:${ink}; font-family:'Be Vietnam Pro',sans-serif; font-size:13px; line-height:1.7; }
      .fit-brief * { box-sizing:border-box; }
      .fit-brief .rule { border-top:1px solid ${line}; }
    `}</style>
    <div className="fit-brief" style={{ height: "100%", display: "grid", gridTemplateRows: "322px 228px 354px 300px 592px 604px 1fr", background: "#F3F5F7" }}>
      <section style={{ background: ink, color: "#F3F5F7", padding: "31px 52px 28px", display: "grid", gridTemplateColumns: "1fr 245px", gap: 30 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2.5, color: "#B9C8D7", marginBottom: 17 }}>FIT–HPUni / HỒ SƠ ĐỊNH HƯỚNG / 00</div>
          <h1 style={{ margin: "0 0 15px", fontSize: 53, lineHeight: 1.17, fontWeight: 750, letterSpacing: "-2px" }}>Một bản sắc.<br/>Nhiều cách đồng hành.</h1>
          <p style={{ maxWidth: 840, fontSize: 14, color: "#D3DDE7", lineHeight: 1.85 }}>Định hướng áo đồng phục cho Khoa Công nghệ Thông tin, Trường Đại học Hải Phòng. Ba giả thuyết thiết kế, hai loại trang phục và một hệ tiêu chuẩn chung — để chọn bằng cả bản sắc lẫn khả năng sản xuất.</p>
          <div style={{ marginTop: 16, fontSize: 16, fontWeight: 600 }}>{BRAND.slogan}</div>
        </div>
        <div style={{ borderLeft: "1px solid #4C6075", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 13 }}>
          <img src={BRAND.logo} alt="Logo chính thức FIT-HPUni" style={{ width: 154, height: 154, objectFit: "contain" }}/>
          <span style={{ fontSize: 10, letterSpacing: 2, color: "#C9D1D9" }}>NHẬN DIỆN KHÔNG THAY ĐỔI</span>
        </div>
      </section>

      <section style={{ padding: "24px 52px 20px" }}>
        <SectionHead number="01" title="Đúng người. Đúng hoàn cảnh." note="MỤC TIÊU & ĐỐI TƯỢNG"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 290px", gap: 29 }}>
          <div><Label>Polo / Trang phục chính thức</Label><p>Giảng viên 25–60 tuổi; sự kiện, hội nghị, tư vấn tuyển sinh, đại diện khoa. Ưu tiên lịch sự, bền dáng, nhận diện rõ và mặc thoải mái.</p></div>
          <div style={{ borderLeft: `1px solid ${line}`, paddingLeft: 29 }}><Label>Áo thun / Trang phục hoạt động</Label><p>Sinh viên 18–22 tuổi; tuần sinh hoạt công dân, thể thao, tình nguyện, hackathon, câu lạc bộ. Ưu tiên vận động và tinh thần tập thể.</p></div>
          <div style={{ background: "#E3E9EF", padding: "15px 18px" }}><strong style={{ fontSize: 14 }}>Dùng được nhiều năm</strong><p style={{ fontSize: 12, marginTop: 5 }}>Không in năm / khóa lên thiết kế chính. Nếu cần, đặt khóa ở tem phụ hoặc ống tay.</p></div>
        </div>
      </section>

      <section className="rule" style={{ padding: "26px 52px 24px" }}>
        <SectionHead number="02" title="Đọc thương hiệu trước khi vẽ." note="GIỮ NGUYÊN LOGO & SLOGAN"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 44 }}>
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 24 }}>
            <img src={BRAND.logo} alt="Các thành phần logo chính thức" style={{ width: 130, height: 130 }}/>
            <div style={{ fontSize: 12, lineHeight: 1.85 }}>
              <p><strong>Mũ tốt nghiệp</strong> — nền tảng học thuật.</p>
              <p><strong>Chữ “e” viết tay</strong> — e-learning, điện tử.</p>
              <p><strong>Cáp nối chuột & bàn phím</strong> — kết nối.</p>
              <p><strong>Vành tròn Việt – Anh</strong> — danh tính của khoa.</p>
              <p><strong>Xanh navy</strong> — màu cốt lõi của nhận diện.</p>
            </div>
          </div>
          <div>
            <Label>Một lời mời hành động, một lời hứa đồng hành</Label>
            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.7px", marginBottom: 8 }}>“do IT” = “do it” + IT</div>
            <p>“Cứ làm đi” gặp công nghệ thông tin. Vế “we are ready to accompany” là lời hứa đồng hành của khoa. Giữ nguyên câu tiếng Anh; có thể xuống dòng hoặc nhấn chữ “IT”.</p>
          </div>
        </div>
        <div style={{ marginTop: 25, border: `1px solid ${navy}`, display: "grid", gridTemplateColumns: "205px 1fr 1fr", gap: 24, padding: "17px 21px", fontSize: 12, background: "#E8EDF2" }}>
          <strong style={{ fontSize: 14, lineHeight: 1.5 }}>ĐIỂM CHẶN<br/>TRƯỚC SẢN XUẤT</strong>
          <p>File nguồn hiện có chỉ <strong>474 × 474 px</strong> (raster): sắc nét khoảng <strong>4 cm ở 300 dpi</strong>. Bản hiển thị 948 px không thay thế vector. Xin file <strong>AI / SVG / PDF gốc</strong> từ khoa.</p>
          <p>Chi tiết bàn phím quá nhỏ khi thêu logo 8 cm: phải <strong>đơn giản hóa phím trong file thêu</strong>. Không vẽ lại, đổi màu, kéo méo logo; không gõ lại chữ bên trong logo.</p>
        </div>
      </section>

      <section className="rule" style={{ padding: "23px 52px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 48 }}>
          <div>
            <SectionHead number="03" title="Hệ màu có kỷ luật."/>
            <div style={{ display: "flex", gap: 10 }}>
              {[PALETTE.navy, PALETTE.navyDeep, PALETTE.white].map((c) => <div key={c.hex} style={{ flex: 1 }}>
                <div style={{ height: 41, background: c.hex, border: `1px solid ${line}` }}/>
                <strong style={{ display: "block", fontSize: 11, marginTop: 7 }}>{c === PALETTE.navy ? "Xanh FIT · đo từ logo" : c.name}</strong>
                <span style={{ fontSize: 10 }}>{c.hex}</span>
              </div>)}
            </div>
            <div style={{ display: "flex", gap: 19, marginTop: 11, fontSize: 10 }}>
              {[["A", PALETTE.silver], ["B", PALETTE.terminal], ["C", PALETTE.phuong], ["C", PALETTE.nhuy]].map(([k, c]) => typeof c !== "string" && <span key={c.hex} style={{ display: "flex", alignItems: "center", gap: 6 }}><i style={{ width: 13, height: 13, background: c.hex, display: "inline-block" }}/>{String(k)} · {c.name}<br/>{c.hex}</span>)}
            </div>
            <p style={{ fontSize: 10, marginTop: 11, color: "#607286" }}>Navy: {PALETTE.navy.pantone}. Đỏ: {PALETTE.phuong.pantone}. So vải theo Pantone TCX và duyệt lab dip; màn hình chỉ tham khảo.</p>
          </div>
          <div>
            <SectionHead number="04" title="Tiếng Việt trọn dấu."/>
            <div style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.4, letterSpacing: "-.7px" }}>Đồng hành cùng<br/>những ý tưởng mới.</div>
            <p style={{ fontSize: 11, marginTop: 7 }}>Be Vietnam Pro — thiết kế cho tiếng Việt, đầy đủ dấu.</p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: navy, fontSize: 16, marginTop: 14 }}>&gt; kết_nối("ý tưởng");</div>
            <p style={{ fontSize: 10, marginTop: 5, color: "#607286" }}>JetBrains Mono cho dòng code ở B. Chữ trong logo giữ nguyên artwork.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "25px 52px", background: "#E5EAF0", borderTop: `1px solid ${line}` }}>
        <SectionHead number="05" title="Ba giả thuyết. Không chỉ ba cách trang trí." note="06 BOARD CHI TIẾT ĐƯỢC TRÌNH BÀY RIÊNG"/>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {concepts.map(c => <article key={c.key} style={{ background: "#F3F5F7", border: `1px solid ${line}`, minHeight: 441 }}>
            <div style={{ background: ink, color: "#F3F5F7", padding: "15px 21px 10px", borderTop: `4px solid ${c.accent}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h3 style={{ fontSize: 27, fontWeight: 750, letterSpacing: "-1px", margin: 0 }}>{c.name}</h3><span style={{ fontSize: 33, color: c.accent, lineHeight: 1 }}>{c.key}</span></div>
              <span style={{ fontSize: 9, letterSpacing: 1.5, color: "#BAC9D8" }}>{c.tag}</span>
              <Motif kind={c.key}/>
            </div>
            <div style={{ padding: "16px 21px", fontSize: 12, lineHeight: 1.75 }}>
              <p style={{ minHeight: 89 }}>{c.hypothesis}</p>
              <p style={{ marginTop: 12 }}><strong>Phù hợp nhất / </strong>{c.fit}</p>
              <p style={{ marginTop: 12 }}><strong>Đánh đổi / </strong>{c.trade}</p>
              <div style={{ borderTop: `1px solid ${line}`, paddingTop: 9, marginTop: 12, fontSize: 10, fontWeight: 600 }}>{c.color}</div>
            </div>
          </article>)}
        </div>
        <p style={{ fontSize: 11, marginTop: 15, color: "#607286" }}>Cùng một chuẩn nhận diện; mỗi phương án triển khai riêng cho polo và áo thun. Chọn hướng trước, tinh chỉnh chi tiết sau.</p>
      </section>

      <section style={{ padding: "27px 52px 23px" }}>
        <SectionHead number="06" title="Thiết kế đẹp phải may và in được." note="THÔNG SỐ KHỞI ĐIỂM / SIZE L"/>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <div>
            <div style={{ borderBottom: `1px solid ${line}`, paddingBottom: 14, marginBottom: 14 }}>
              <Label>Polo / Thêu là chủ đạo</Label>
              <p>Vải cá sấu (pique) CVC 65/35 hoặc 100% cotton, <strong>220–230 gsm</strong>. Cổ và bo tay dệt rib có viền sọc (tipping); nẹp <strong>3 cúc</strong>; xẻ tà hai bên; logo thêu.</p>
            </div>
            <div style={{ borderBottom: `1px solid ${line}`, paddingBottom: 14, marginBottom: 14 }}>
              <Label>Áo thun / Thoải mái vận động</Label>
              <p>100% cotton (hoặc CVC), <strong>200–230 gsm</strong>; cổ tròn bo rib <strong>2 cm</strong>. In lụa cho số lượng lớn: tối đa <strong>4 màu / vị trí</strong>; DTF cho nhiều màu hoặc lô nhỏ.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 23, fontSize: 12 }}>
              <div><Label>Kích thước & vị trí</Label><p>Ngực trái polo 7–9 cm; áo thun 8–10 cm. Tâm cách đỉnh vai (HPS) 18–20 cm. Gáy 6–8 cm; tay 5–8 cm (tối đa 9 cm); lưng tối đa 30 × 40 cm (A3).</p></div>
              <div><Label>Giới hạn kỹ thuật</Label><p>Thêu tối đa 6 màu chỉ / vị trí; chữ thêu cao ≥ 5 mm. Đơn giản hóa phím bàn phím trong file digitising. Không sublimation hoặc in toàn thân trên cotton.</p></div>
            </div>
            <div style={{ background: "#E5EAF0", marginTop: 18, padding: "13px 16px", fontSize: 12 }}>
              <strong>S–3XL · Khảo sát size trước khi đặt · Dự phòng 3–5%</strong>
              <p style={{ marginTop: 5 }}>Đường in tiếp nối qua sườn phải chia thành các vị trí canh khớp, hoặc in tấm trước khi may. Không in đè qua đường may sườn đã ráp.</p>
            </div>
          </div>
          <div style={{ border: `1px solid ${line}`, padding: "19px 16px 14px", background: "#E8EDF2" }}>
            <Label>Sơ đồ vùng đặt hình / đơn vị cm</Label>
            <Placement/>
            <div style={{ borderTop: `1px solid ${line}`, marginTop: 10, paddingTop: 11, fontSize: 11, color: "#607286" }}>Nét đứt: vùng thêu / in. HPS: đỉnh vai cao nhất. Thông số điều chỉnh theo rập và bộ size; kiểm tra trên mẫu thật trước khi nhân bản.</div>
          </div>
        </div>
      </section>

      <section style={{ padding: "22px 52px 25px", background: ink, color: "#F3F5F7", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 15, marginBottom: 22 }}>
          <span style={{ fontSize: 12, letterSpacing: 2, color: "#BCCCDC" }}>07</span><h2 style={{ margin: 0, fontSize: 25, fontWeight: 700 }}>Từ phương án đến chiếc áo thật.</h2>
          <span style={{ marginLeft: "auto", fontSize: 10, letterSpacing: 1, color: "#BCCCDC" }}>LỘ TRÌNH & ĐIỂM DUYỆT</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 22 }}>
          {[
            ["01", "Chọn phương án", "Lãnh đạo khoa", "Duyệt hướng A / B / C, loại áo, ngân sách và số lượng."],
            ["02", "Vector & tech pack", "Thiết kế + khoa", "Duyệt logo gốc, bố cục, kích thước và file thêu / in."],
            ["03", "Lab dip & may mẫu", "Khoa + nhà cung cấp", "Duyệt màu vải, bo dệt, độ vừa và mẫu thêu / in thực tế."],
            ["04", "Size & sản xuất", "Đầu mối khoa + xưởng", "Chốt bảng size, số lượng. Khoảng 1–2 tuần sau khi chốt mẫu."],
            ["05", "Kiểm hàng & phát áo", "Đầu mối khoa", "Duyệt số lượng, lỗi may / in; phân size và bàn giao."],
          ].map(([n, title, who, desc]) => <div key={n} style={{ borderTop: "1px solid #5C7086", paddingTop: 12 }}>
            <div style={{ fontSize: 11, color: "#ACBFD1", marginBottom: 7 }}>{n} <span style={{ float: "right" }}>→</span></div>
            <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 650 }}>{title}</h3>
            <strong style={{ fontSize: 10, color: "#CBD7E3" }}>{who}</strong>
            <p style={{ fontSize: 11, color: "#CBD7E3", marginTop: 7, lineHeight: 1.8 }}>{desc}</p>
          </div>)}
        </div>
        <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #5C7086", paddingBottom: 13 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Quyết định hôm nay: chọn hướng thiết kế, không chốt sản xuất.</span>
          <span style={{ fontSize: 11, color: "#CBD7E3" }}>Tiếp theo / 03 phương án × 02 loại áo</span>
        </div>
      </section>
    </div>
  </BoardShell>;
}
