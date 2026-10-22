const base = import.meta.env.BASE_URL;

export default function Close() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <div className="absolute right-0 top-0 w-[35vw] h-screen bg-primary" />
      <h2 className="absolute left-[6vw] top-[10vh] w-[56vw] text-[4.6vw]">Khoác bản sắc Khoa, cùng nhau tiến bước</h2>
      <div className="absolute left-[6vw] top-[43vh] w-[53vw] text-[2vw] leading-[1.5]">
        <p>Một thiết kế hướng đến sự tự tin và gắn kết</p>
        <p className="mt-[3vh]">Một cách thể hiện tinh thần đồng hành của Khoa</p>
        <p className="mt-[5vh] text-[2.7vw] font-extrabold">You can do IT, we are ready to accompany</p>
        <p className="mt-[4vh]">Nhóm ITogether trân trọng cảm ơn!</p>
      </div>
      <img src={`${base}assets/white-back.svg`} crossOrigin="anonymous" alt="Mặt sau polo trắng với slogan của Khoa" className="absolute left-[63vw] top-[20vh] w-[37vw] h-[65vh] object-contain" />
    </div>
  );
}
