const base = import.meta.env.BASE_URL;

export default function Accompany() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Bạn tự tin, Khoa tiếp bước</h2>
      <div className="absolute left-[6vw] top-[25vh] w-[88vw] h-[29vh] bg-primary px-[6vw] py-[2vh]">
        <img src={`${base}assets/slogan-detail.svg`} crossOrigin="anonymous" alt="Cận cảnh vế đồng hành và con trỏ lệnh" className="garment" />
      </div>
      <div className="absolute left-[6vw] top-[61vh] w-[40vw] copy">
        <p>Nét chữ đậm đối lập với sắc xám bạc</p>
        <p className="mt-[4vh] rule pt-[3vh]">Hai vế slogan tạo nhịp đọc rõ ràng</p>
      </div>
      <div className="absolute left-[54vw] top-[61vh] w-[40vw] copy">
        <p>Con trỏ lệnh sau “accompany” gợi ngôn ngữ công nghệ</p>
        <p className="mt-[4vh] rule pt-[3vh]">Biểu tượng cho sự đồng hành luôn tiếp diễn</p>
      </div>
      <div className="footer"><span>FIT-HPUni — ITogether</span><span>08</span></div>
    </div>
  );
}
