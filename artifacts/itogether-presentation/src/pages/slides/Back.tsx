const base = import.meta.env.BASE_URL;

export default function Back() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Mặt sau — Chữ “IT” lặng đầy bản lĩnh</h2>
      <div className="absolute left-[6vw] top-[27vh] w-[44vw] h-[43vh] bg-primary">
        <img src={`${base}assets/it-detail.svg`} crossOrigin="anonymous" alt="Chữ IT tạo khoảng âm trên khối mực" className="garment" />
      </div>
      <img src={`${base}assets/white-back.svg`} crossOrigin="anonymous" alt="Toàn bộ mặt sau polo trắng" className="absolute left-[9vw] top-[68vh] w-[38vw] h-[22vh] object-contain" />
      <ul className="body-list copy absolute left-[56vw] top-[29vh] w-[37vw]">
        <li>Chữ “IT” để trống trên khối mực đặc, để lộ nền vải</li>
        <li>Khoảng âm tạo điểm nhấn thị giác</li>
        <li>“IT” vừa thuộc câu khích lệ, vừa gợi nhắc ngành Công nghệ thông tin</li>
        <li>FIT-HPUni và tên Khoa khẳng định bản sắc</li>
      </ul>
      <div className="footer"><span>FIT-HPUni — ITogether</span><span>07</span></div>
    </div>
  );
}
