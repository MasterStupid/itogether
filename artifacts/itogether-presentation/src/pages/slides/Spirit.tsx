const base = import.meta.env.BASE_URL;

export default function Spirit() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <div className="navy-panel absolute left-0 top-0 w-[43vw] h-screen" />
      <img src={`${base}assets/white-front.svg`} crossOrigin="anonymous" alt="Mẫu polo trắng đã duyệt" className="absolute left-[1vw] top-[12vh] w-[42vw] h-[77vh] object-contain" />
      <h2 className="absolute left-[49vw] top-[14vh] w-[45vw] text-[4vw]">Một chiếc áo, một tinh thần đồng hành</h2>
      <div className="absolute left-[49vw] top-[47vh] w-[44vw] flex flex-col gap-[4vh] copy">
        <p>Thể hiện bản sắc Khoa Công nghệ thông tin</p>
        <p className="rule pt-[3vh]">Gắn kết các thế hệ sinh viên trong Khoa</p>
        <p className="rule pt-[3vh]">Kết hợp phong cách polo lịch sự với dấu ấn công nghệ</p>
      </div>
      <div className="absolute right-[6vw] bottom-[3.5vh] caption text-muted">03</div>
    </div>
  );
}
