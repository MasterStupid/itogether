import "./DesignCredits.css";

const DESIGNERS = [
  { name: "Lê Văn Quản", studentId: "253148201055", className: "CNTT.K26-01" },
  { name: "Vũ Thị Minh Ngọc", studentId: "253148201037", className: "CNTT.K26-01" },
  { name: "Bùi Thị Bích Phương", studentId: "253148201022", className: "CNTT.K26-01" },
  { name: "Trần Đỗ Phương Vy", studentId: "263148201252", className: "CNTT.K27-02" },
] as const;

export function DesignCredits() {
  return (
    <section className="design-credits" aria-labelledby="design-credits-title" data-testid="section-design-credits">
      <div className="design-credits__mast">
        <span className="design-credits__eyebrow">FIT-HPUni · Nhóm thiết kế ITogether</span>
        <span className="design-credits__edition" aria-hidden="true">HỒ SƠ THIẾT KẾ&nbsp; / &nbsp;04</span>
      </div>
      <div className="design-credits__body">
        <div className="design-credits__intro">
          <span className="design-credits__index" aria-hidden="true">01</span>
          <div>
            <h2 id="design-credits-title">Nhóm thiết kế</h2>
            <p>Ý tưởng được gửi gắm từ những sinh viên Công nghệ Thông tin.</p>
          </div>
        </div>
        <ol className="design-credits__list">
          {DESIGNERS.map((designer, index) => (
            <li className="design-credits__person" key={designer.studentId} data-testid={`credit-person-${index + 1}`}>
              <span className="design-credits__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{designer.name}</h3>
              <dl>
                <div>
                  <dt>Mã sinh viên</dt>
                  <dd>{designer.studentId}</dd>
                </div>
                <div>
                  <dt>Lớp</dt>
                  <dd>{designer.className}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
      <div className="design-credits__foot" aria-hidden="true">
        <span>KHOA CÔNG NGHỆ THÔNG TIN</span>
        <span>TRƯỜNG ĐẠI HỌC HẢI PHÒNG</span>
      </div>
    </section>
  );
}
