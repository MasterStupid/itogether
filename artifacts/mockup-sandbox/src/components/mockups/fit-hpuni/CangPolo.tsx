import { BoardShell } from "./_shared/BoardShell";
import { PALETTE } from "./_shared/brand";
import { shade } from "./_shared/garments";
import { C, ConceptHead, Detail, Kicker, PoloFlat, Spec, Swatches, containerCode } from "./_shared/cang";

export function CangPolo() {
  return <BoardShell code="D" concept="Cảng Khởi Hành" garment="Áo polo" accent={shade(PALETTE.cang.hex,-.3)}>
    <div style={{height:"100%",background:C.paper,color:C.deep}}>
      <ConceptHead/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 342px",height:"calc(100% - 117px)"}}>
        <div style={{padding:"16px 28px 0 30px",borderRight:`1px solid ${C.rule}`,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"0 8px"}}><Kicker>01 / Trang phục đại diện</Kicker><span style={{fontSize:11,color:C.navy}}>Dáng thẳng · Cổ bo · Size L</span></div>
          <div style={{height:466,display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"start",position:"relative"}}>
            <div><PoloFlat/><div style={{textAlign:"center",fontSize:11,marginTop:-4,fontWeight:600}}>MẶT TRƯỚC · LOGO THÊU Ø80 MM</div></div>
            <div><PoloFlat back/><div style={{textAlign:"center",fontSize:11,marginTop:-4,fontWeight:600}}>MẶT SAU · GIỮ TRƠN</div></div>
            <div style={{position:"absolute",bottom:28,left:10,fontSize:11,color:C.navy,borderLeft:`2px solid ${C.orange}`,paddingLeft:9}}>Không mảng cam lớn.<br/>Không hình in sau lưng.</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18}}>
            <Detail n="01" title="Nhận diện nguyên bản" caption="Ø80 mm · tâm cách HPS 190 mm; lệch tâm trước 100 mm."><PoloFlat crop={{x:533,y:203,w:134,h:94}}/></Detail>
            <Detail n="02" title="Cam ở lớp trong" caption="Nẹp trong 3 × 150 mm. Chỉ hé lộ khi chuyển động; không viền bo."><PoloFlat crop={{x:459,y:104,w:79,h:101}}/></Detail>
            <Detail n="03" title="Nhãn dệt mã container" caption="76 × 25 mm · cạnh phải cách sườn ≈15 mm; cách gấu ≈58 mm."><PoloFlat crop={{x:658,y:687,w:102,h:53}}/></Detail>
          </div>
        </div>
        <aside style={{padding:"22px 25px 0"}}>
          <Kicker>Hồ sơ kỹ thuật / D — Polo</Kicker>
          <h2 style={{fontSize:23,lineHeight:1.3,letterSpacing:"-.6px",margin:"10px 0 15px"}}>Chất cảng.<br/>Không phải đồ bảo hộ.</h2>
          <Spec title="Vải & phom">Piqué CVC 60% cotton / 40% polyester, 220 g/m². Cổ và tay bo xanh than; xẻ sườn, gấu sau dài hơn trước 20 mm.</Spec>
          <Spec title="Thêu & phụ liệu">Ngực trái: logo chính thức Ø80 mm, 2 màu chỉ xanh FIT / trắng, tối đa 6 màu tại vị trí. Đơn giản hóa phím bàn phím trong file số hóa thêu.<br/>Nhãn dệt: 3 màu xanh than / trắng / cam; may trên thân trước, không bắc qua sườn.</Spec>
          <Spec title="Mã nhận diện"><strong style={{fontFamily:"'Saira Stencil One',sans-serif",fontSize:18,color:C.deep}}>{containerCode}</strong><br/>Cấu trúc ISO 6346; chữ số cuối tính kiểm tra. Mã ý tưởng, không phải container đăng ký. “000080” gợi cổng web 80.</Spec>
          <Spec title="Bảng màu & duyệt mẫu"><Swatches/><div style={{marginTop:9,fontSize:11}}>Xanh FIT: PANTONE 19-4035 TCX Dark Blue (tham khảo). Vải, bo và Cam Cảng: chốt bằng lab dip.</div></Spec>
          <div style={{borderTop:`3px solid ${C.orange}`,marginTop:4,paddingTop:11,fontSize:11,lineHeight:1.6}}><strong>Trang trọng:</strong> Logo thêu, lưng trơn; dấu cảng ở gấu. Hợp giảng viên, hội nghị và lễ khoa.<br/><strong>Đánh đổi:</strong> Ngoài Hải Phòng cần giải thích “port”; nhiều cam dễ thành đồ bảo hộ. Cá nhân hóa từng mã tăng phí và khâu quản lý.</div>
        </aside>
      </div>
    </div>
  </BoardShell>;
}
