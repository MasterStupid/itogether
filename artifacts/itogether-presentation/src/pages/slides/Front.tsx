const base = import.meta.env.BASE_URL;

export default function Front() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Mặt trước — Gọn gàng để nhận diện</h2>
      <div className="absolute left-[6vw] top-[29vh] w-[44vw] h-[58vh]">
        <img src={`${base}assets/navy-front.svg`} crossOrigin="anonymous" alt="Mặt trước polo xanh than, giữ nguyên logo Khoa" className="garment" />
      </div>
      <ul className="body-list copy absolute left-[56vw] top-[32vh] w-[37vw]">
        <li>Logo Khoa là điểm nhận diện trên ngực áo</li>
        <li>Dáng polo với cổ bẻ bản rộng</li>
        <li>Hai sọc tương phản uốn theo cổ áo</li>
        <li>Bố cục tiết chế, tập trung vào nhận diện Khoa</li>
      </ul>
      <div className="footer"><span>FIT-HPUni — ITogether</span><span>06</span></div>
    </div>
  );
}
