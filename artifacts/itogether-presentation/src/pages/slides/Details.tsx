const base = import.meta.env.BASE_URL;

export default function Details() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Chỉn chu trong từng chi tiết</h2>
      <div className="absolute left-[6vw] top-[25vh] w-[27vw] h-[20vh]">
        <img src={`${base}assets/collar-detail.svg`} crossOrigin="anonymous" alt="Hai sọc uốn theo cổ áo" className="garment" />
      </div>
      <p className="absolute left-[6vw] top-[49vh] w-[27vw] copy">Hai sọc cổ chạy liền theo dáng cổ</p>
      <div className="absolute left-[37vw] top-[25vh] w-[27vw] h-[20vh]">
        <img src={`${base}assets/cuff-detail.svg`} crossOrigin="anonymous" alt="Ba dải bo tay áo" className="garment" />
      </div>
      <div className="absolute left-[37vw] top-[49vh] w-[27vw] text-[2vw] leading-[1.4] flex flex-col gap-[2vh]">
        <p>Bo tay áo xanh than: trắng – xanh than – trắng</p>
        <p>Hai dải ngoài bằng nhau; dải trắng phía trong dày hơn</p>
        <p>Áo trắng đảo màu bo tay</p>
      </div>
      <div className="absolute left-[68vw] top-[25vh] w-[26vw] h-[20vh]">
        <img src={`${base}assets/label-detail.svg`} crossOrigin="anonymous" alt="Nhãn cổ FIT-HPUni và cỡ L" className="garment" />
      </div>
      <p className="absolute left-[68vw] top-[49vh] w-[26vw] copy">Nhãn cổ chia ngăn: FIT-HPUni, Information Technology và cỡ áo</p>
      <div className="footer"><span>FIT-HPUni — ITogether</span><span>09</span></div>
    </div>
  );
}
