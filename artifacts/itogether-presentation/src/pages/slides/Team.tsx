const base = import.meta.env.BASE_URL;

export default function Team() {
  return (
    <div className="deck w-screen h-screen overflow-hidden relative">
      <h2 className="title">Nhóm thiết kế ITogether</h2>
      <img src={`${base}assets/fit-logo.png`} crossOrigin="anonymous" alt="Logo FIT-HPUni" className="absolute right-[6vw] top-[7vh] w-[6vw] h-[6vw] object-contain" />
      <div className="absolute left-[6vw] right-[6vw] top-[28vh]">
        <div className="grid grid-cols-[37vw_25vw_26vw] items-center h-[13vh] rule text-[2vw]">
          <p className="font-extrabold">Lê Văn Quản</p><p>253148201055</p><p>CNTT.K26-01</p>
        </div>
        <div className="grid grid-cols-[37vw_25vw_26vw] items-center h-[13vh] rule text-[2vw]">
          <p className="font-extrabold">Vũ Thị Minh Ngọc</p><p>253148201037</p><p>CNTT.K26-01</p>
        </div>
        <div className="grid grid-cols-[37vw_25vw_26vw] items-center h-[13vh] rule text-[2vw]">
          <p className="font-extrabold">Bùi Thị Bích Phương</p><p>253148201022</p><p>CNTT.K26-01</p>
        </div>
        <div className="grid grid-cols-[37vw_25vw_26vw] items-center h-[13vh] rule text-[2vw]">
          <p className="font-extrabold">Trần Đỗ Phương Vy</p><p>263148201252</p><p>CNTT.K27-02</p>
        </div>
      </div>
      <div className="footer"><span>FIT-HPUni — ITogether</span><span>02</span></div>
    </div>
  );
}
