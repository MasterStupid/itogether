const base = import.meta.env.BASE_URL;

export default function ColorPair() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Bộ đôi Polo Xanh than &amp; Trắng</h2>
      <p className="absolute left-[6vw] top-[21vh] copy">Hai phiên bản màu, chung một ngôn ngữ thiết kế</p>
      <img src={`${base}assets/navy-front.svg`} crossOrigin="anonymous" alt="Polo xanh than mặt trước" className="absolute left-[6vw] top-[29vh] w-[41vw] h-[47vh] object-contain" />
      <img src={`${base}assets/white-front.svg`} crossOrigin="anonymous" alt="Polo trắng mặt trước" className="absolute left-[53vw] top-[29vh] w-[41vw] h-[47vh] object-contain" />
      <p className="absolute left-[6vw] top-[77vh] w-[41vw] text-center text-[2vw] font-semibold leading-[1.4]">Xanh than: trầm, vững vàng và chỉn chu</p>
      <p className="absolute left-[53vw] top-[77vh] w-[41vw] text-center text-[2vw] font-semibold leading-[1.4]">Trắng: sáng, gọn gàng và trẻ trung</p>
      <p className="absolute left-[6vw] top-[89vh] w-[88vw] text-center text-[2vw]">Viền cổ và bo tay tương phản tạo sự thống nhất</p>
    </div>
  );
}
