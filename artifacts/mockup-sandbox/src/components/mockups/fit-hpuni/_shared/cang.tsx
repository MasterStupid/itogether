import type { ReactNode } from "react";
import { PALETTE } from "./brand";
import { FitLogo, PoloShirt, TeeShirt } from "./garments";

export const C = { navy: PALETTE.navy.hex, deep: PALETTE.navyDeep.hex, orange: PALETTE.cang.hex, white: PALETTE.white.hex, paper: "#F1F4F6", rule: "#CCD5DE" };
export const stencil = "'Saira Stencil One', sans-serif";
const values: Record<string, number> = { A:10,B:12,C:13,D:14,E:15,F:16,G:17,H:18,I:19,J:20,K:21,L:23,M:24,N:25,O:26,P:27,Q:28,R:29,S:30,T:31,U:32,V:34,W:35,X:36,Y:37,Z:38 };
export function checkDigit(code: string) {
  if (!/^[A-Z]{3}U\d{6}$/.test(code)) throw new Error("Mã container cần 3 chữ cái, U và 6 chữ số.");
  return [...code].reduce((sum, char, i) => sum + (values[char] ?? Number(char)) * 2 ** i, 0) % 11 % 10;
}
export const containerBase = "FITU000080";
export const containerCode = `FITU 000080 ${checkDigit(containerBase)}`;

export function ContainerLabel() {
  return <g><rect x="671" y="703" width="76" height="25" fill={C.deep} stroke={C.orange} strokeWidth="1.1"/><text x="709" y="719.5" textAnchor="middle" fill={C.white} fontFamily={stencil} fontSize="9">{containerCode}</text><path d="M675 706v19m68-19v19" stroke={C.orange} strokeWidth="1"/></g>;
}

export function PortArt() {
  return <g>
    <g fill={C.white} fontFamily="'Barlow Condensed', sans-serif" fontWeight="600" fontSize="10" letterSpacing="1.5"><text x="350" y="221">FIT-HPUni</text><text x="650" y="221" textAnchor="end">CẢNG KHỞI HÀNH</text></g>
    <path d="M350 231H650" stroke={C.orange} strokeWidth="2"/>
    <text x="347" y="313" fill={C.white} fontFamily={stencil} fontSize="96" letterSpacing="-1">PORT</text>
    <g stroke={C.orange} strokeWidth="2.4" fill="none" strokeLinejoin="miter">
      <path d="M365 443V354h219V443m-219-89 46-24h211v24H365m46-24v24m173 0 38-24m-38 24 30 89m-230 0 27-89m-46 11h219m-219 29h219m-160-40v40m126-40v40m-22-40v29m-13 0h26v11h-26z"/>
      <path d="M350 451h300m-300 7h300"/>
      <rect x="421" y="414" width="99" height="29"/><path d="M432 418v21m11-21v21m11-21v21m11-21v21m11-21v21m11-21v21m11-21v21m11-21v21"/>
    </g>
    <text x="639" y="432" textAnchor="end" fill={C.white} fontFamily={stencil} fontSize="34">80</text>
    <g fill={C.white} fontFamily="'Barlow Condensed', sans-serif" fontWeight="600">
      <text x="350" y="491" fontSize="28">You can do IT,</text>
      <text x="350" y="516" fontSize="22">we are ready to accompany</text>
    </g>
    <path d="M350 535H650" stroke={C.orange} strokeWidth="1.3"/>
    <text x="350" y="559" fill={C.orange} fontFamily={stencil} fontSize="19">{containerCode}</text>
    <text x="650" y="559" textAnchor="end" fill={C.white} fontFamily="'Barlow Condensed', sans-serif" fontSize="12">22G1</text>
    <text x="350" y="589" fill={C.white} fontFamily="'Barlow Condensed', sans-serif" fontSize="11" letterSpacing=".5">KHOA CÔNG NGHỆ THÔNG TIN</text>
    <text x="350" y="605" fill={C.white} fontFamily="'Barlow Condensed', sans-serif" fontSize="11" letterSpacing=".5">TRƯỜNG ĐẠI HỌC HẢI PHÒNG</text>
  </g>;
}

export function PoloFlat({ back = false, crop }: { back?: boolean; crop?: { x:number; y:number; w:number; h:number } }) {
  return <PoloShirt side={back ? "back" : "front"} body={C.navy} collar={C.deep} cuff={C.deep} placket={C.navy} placketInner={C.orange} buttons={C.deep} buttonCount={2} crop={crop} style={{width:"100%"}}>
    {!back && <><FitLogo cx={600} cy={250} d={80} embroidered/><ContainerLabel/></>}
  </PoloShirt>;
}
export function TeeFlat({ back = false, crop }: { back?: boolean; crop?: { x:number; y:number; w:number; h:number } }) {
  return <TeeShirt side={back ? "back" : "front"} body={C.deep} rib={C.deep} crop={crop} style={{width:"100%"}}>{back ? <PortArt/> : <FitLogo cx={598} cy={238} d={90}/>}</TeeShirt>;
}
export function Kicker({ children }: { children:ReactNode }) {
  return <div style={{fontSize:11,fontWeight:700,letterSpacing:"1.5px",color:C.navy,textTransform:"uppercase"}}>{children}</div>;
}
export function Spec({ title, children }: { title:string; children:ReactNode }) {
  return <section style={{padding:"9px 0",borderTop:`1px solid ${C.rule}`}}><h3 style={{fontSize:11,fontWeight:800,letterSpacing:".9px",margin:"0 0 6px",textTransform:"uppercase"}}>{title}</h3><div style={{fontSize:11,lineHeight:1.65,color:C.navy}}>{children}</div></section>;
}
export function Swatches() {
  return <div style={{display:"flex",gap:14,marginTop:10}}>{[["Xanh FIT",C.navy],["Than đậm",C.deep],["Trắng",C.white],["Cam Cảng",C.orange]].map(([name,hex])=><div key={name}><div style={{height:16,width:51,background:hex,border:`1px solid ${C.rule}`}}/><div style={{fontSize:11,marginTop:5}}>{name}</div><div style={{fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}>{hex}</div></div>)}</div>;
}
export function Detail({ n, title, children, caption }: { n:string; title:string; children:ReactNode; caption:string }) {
  return <div style={{borderTop:`1px solid ${C.rule}`,paddingTop:10,minWidth:0}}>
    <div style={{display:"flex",gap:8,alignItems:"center",fontSize:11,fontWeight:700}}><span style={{color:C.orange,fontFamily:stencil,fontSize:16}}>{n}</span>{title}</div>
    <style>{`.cang-detail > svg { height:100%; width:100%; }`}</style>
    <div className="cang-detail" style={{height:116,overflow:"hidden",marginTop:6,background:"#E2E8EE",position:"relative"}}>{children}</div>
    <div style={{fontSize:11,lineHeight:1.5,marginTop:7,color:C.navy}}>{caption}</div>
  </div>;
}
export function ConceptHead({ tee = false }: { tee?:boolean }) {
  return <div style={{height:117,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 36px",borderBottom:`1px solid ${C.rule}`}}>
    <div><Kicker>Hải Phòng / Một điểm tựa. Nhiều hành trình.</Kicker><h1 style={{fontSize:38,fontWeight:800,letterSpacing:"-1.8px",lineHeight:1.2,margin:"8px 0 0"}}>Từ cảng, <span style={{color:C.orange}}>vươn xa.</span></h1></div>
    <div style={{maxWidth:320,fontSize:12,lineHeight:1.8,color:C.navy,paddingLeft:20,borderLeft:`3px solid ${C.orange}`}}>“Port” là cảng biển và cổng kết nối.<br/>FIT-HPUni là nơi khởi hành, cũng là nơi luôn đồng hành.{tee ? " Tinh thần ấy được mặc trên lưng." : " Tinh thần cảng, trong diện mạo trang trọng."}</div>
  </div>;
}
