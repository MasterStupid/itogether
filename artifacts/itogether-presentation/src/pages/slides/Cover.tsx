const base = import.meta.env.BASE_URL;

export default function Cover() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <div className="absolute left-[56vw] top-0 w-[44vw] h-screen bg-primary" />
      <img src={`${base}assets/fit-logo.png`} crossOrigin="anonymous" alt="Logo Khoa Công nghệ thông tin" className="absolute left-[6vw] top-[7vh] w-[5.2vw] h-[5.2vw] object-contain" />
      <img src={`${base}assets/university-logo.png`} crossOrigin="anonymous" alt="Logo Trường Đại học Hải Phòng" className="absolute left-[12.8vw] top-[7vh] w-[5.2vw] h-[5.2vw] object-contain" />
      <h1 className="absolute left-[6vw] top-[28vh] w-[46vw] text-[5.2vw]">ITogether — Dấu ấn riêng, tinh thần chung</h1>
      <p className="absolute left-[6vw] top-[73vh] w-[43vw] text-[2vw] leading-[1.5]">Bài dự thi thiết kế áo Khoa Công nghệ thông tin — Trường Đại học Hải Phòng Nhóm thiết kế ITogether</p>
      <img src={`${base}assets/white-front.svg`} crossOrigin="anonymous" alt="Áo trắng mặt trước" className="absolute left-[53vw] top-[9vh] w-[39vw] h-[70vh] object-contain" />
      <img src={`${base}assets/navy-back.svg`} crossOrigin="anonymous" alt="Áo xanh than mặt sau" className="absolute left-[66vw] top-[33vh] w-[33vw] h-[60vh] object-contain" />
      <div className="absolute left-[56vw] bottom-[6vh] w-[7vw] h-[.7vh] bg-bg" />
      <div className="absolute left-[56vw] bottom-[4.6vh] w-[7vw] h-[.7vh] bg-bg" />
    </div>
  );
}
