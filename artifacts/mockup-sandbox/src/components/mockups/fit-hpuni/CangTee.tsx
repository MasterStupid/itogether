import { BoardShell } from "./_shared/BoardShell";
import { PALETTE } from "./_shared/brand";
import { shade } from "./_shared/garments";
import { C, ConceptHead, Detail, Kicker, Spec, Swatches, TeeFlat } from "./_shared/cang";

export function CangTee() {
  return <BoardShell code="D" concept="Cảng Khởi Hành" garment="Áo thun" accent={shade(PALETTE.cang.hex,-.3)}>
    <div style={{height:"100%",background:C.paper,color:C.deep}}>
      <ConceptHead tee/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 342px",height:"calc(100% - 117px)"}}>
        <div style={{padding:"16px 28px 0 30px",borderRight:`1px solid ${C.rule}`,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"0 8px"}}><Kicker>02 / Dành cho những chuyến đi đầu tiên</Kicker><span style={{fontSize:11,color:C.navy}}>Dáng rộng vừa · Cotton · Size L</span></div>
          <div style={{height:466,display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"start",position:"relative"}}>
            <div><TeeFlat/><div style={{textAlign:"center",fontSize:11,marginTop:-4,fontWeight:600}}>MẶT TRƯỚC · LOGO Ø90 MM</div></div>
            <div><TeeFlat back/><div style={{textAlign:"center",fontSize:11,marginTop:-4,fontWeight:600}}>MẶT SAU · KHỔ IN 300 × 400 MM</div></div>
            <div style={{position:"absolute",bottom:28,left:10,fontSize:11,color:C.navy,borderLeft:`2px solid ${C.orange}`,paddingLeft:9}}>Một cảng biển.<br/>Một cổng kết nối.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18}}>
            <Detail n="01" title="Logo đúng bản gốc" caption="DTF Ø90 mm · tâm cách HPS 178 mm; lệch tâm trước 98 mm."><TeeFlat crop={{x:532,y:190,w:132,h:94}}/></Detail>
            <Detail n="02" title="Nét cẩu, không mảng đặc" caption="Nét in nhỏ nhất 1,3 mm; cẩu và container được để rỗng, thoáng vải."><TeeFlat back crop={{x:343,y:326,w:314,h:145}}/></Detail>
            <Detail n="03" title="Lời hẹn đồng hành" caption="Slogan nguyên văn · mã ISO có số kiểm tra; không gắn niên khóa."><TeeFlat back crop={{x:339,y:470,w:322,h:145}}/></Detail>
          </div>
        </div>
        <aside style={{padding:"22px 25px 0"}}>
          <Kicker>Hồ sơ kỹ thuật / D — Tee</Kicker>
          <h2 style={{fontSize:23,lineHeight:1.3,letterSpacing:"-.6px",margin:"10px 0 15px"}}>Mang theo cảng.<br/>Mở một kết nối.</h2>
          <Spec title="Vải & phom">Cotton compact 100%, 200 g/m². Dáng rộng vừa, vai xuôi nhẹ; bo cổ 1 × 1 xanh than. Phù hợp sinh hoạt khoa, câu lạc bộ và hackathon.</Spec>
          <Spec title="Tách màu & kỹ thuật">Lưng in lụa: <strong>2 màu pha — trắng + Cam Cảng</strong>; trắng đồng thời làm lót dưới cam. Xanh than là nền vải, không là màu in. Không thêm màu thứ ba.<br/>Ngực: DTF logo gốc, giữ nguyên màu và tỷ lệ. Không in thăng hoa / không in tràn thân.</Spec>
          <Spec title="Kích thước & định vị">Lưng: khung 300 × 400 mm, giữa lưng; mép trên cách HPS 150 mm. Hình nằm trong thân sau, không qua đường sườn.<br/>Ngực trái: Ø90 mm. Tay và gáy không in.</Spec>
          <Spec title="Bảng màu & duyệt mẫu"><Swatches/><div style={{marginTop:9,fontSize:11}}>Xanh FIT: PANTONE 19-4035 TCX Dark Blue (tham khảo). Vải xanh than và mực Cam Cảng: chốt bằng lab dip / so màu mẫu in.</div></Spec>
          <div style={{borderTop:`3px solid ${C.orange}`,marginTop:4,paddingTop:11,fontSize:11,lineHeight:1.6}}><strong>Bản sắc sinh viên Cảng:</strong> Chữ stencil, nét cẩu, mực thoáng; mặc được nhiều mùa.<br/><strong>Đánh đổi:</strong> Ngoài Hải Phòng cần giải thích “port”; nhiều cam dễ thành đồ bảo hộ. DTF serial bằng 6 số cuối mã sinh viên tăng phí và quản lý đơn.</div>
        </aside>
      </div>
    </div>
  </BoardShell>;
}
