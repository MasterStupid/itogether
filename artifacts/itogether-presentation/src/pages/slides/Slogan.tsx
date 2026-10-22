export default function Slogan() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Từ slogan của Khoa đến ngôn ngữ thiết kế</h2>
      <div className="absolute left-[6vw] top-[29vh] w-[88vw] bg-primary text-bg px-[3.2vw] py-[4vh]">
        <p className="text-[3.7vw] font-extrabold leading-[1.3]">“You can do IT, we are ready to accompany”</p>
        <p className="text-[2vw] mt-[1.5vh]">là slogan của Khoa</p>
      </div>
      <div className="absolute left-[6vw] top-[62vh] w-[42vw] copy">
        <p>“You can do IT”: lời khích lệ sự tự tin và bản lĩnh</p>
      </div>
      <div className="absolute left-[54vw] top-[62vh] w-[40vw] copy">
        <p>“we are ready to accompany”: sự sẵn sàng đồng hành</p>
      </div>
      <p className="absolute left-[6vw] top-[79vh] w-[88vw] text-[2vw] leading-[1.5] font-semibold">ITogether thể hiện thông điệp có sẵn bằng màu sắc, chữ và chi tiết áo</p>
      <div className="footer"><span>FIT-HPUni — ITogether</span><span>04</span></div>
    </div>
  );
}
