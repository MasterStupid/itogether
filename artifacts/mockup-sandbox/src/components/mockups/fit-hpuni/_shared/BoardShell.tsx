import * as React from "react";
import { BRAND } from "./brand";

/**
 * Common presentation frame for every FIT-HPUni board, so concepts are
 * compared on equal footing. The content area (children) is free.
 */
export function BoardShell({
  code,
  concept,
  garment,
  accent = BRAND.navy,
  children,
}: {
  /** "A" | "B" | "C" | "00" */
  code: string;
  /** e.g. "Dấu Ấn" */
  concept: string;
  /** e.g. "Áo polo" | "Áo thun" | "Định hướng thiết kế" */
  garment: string;
  /** Concept accent used for the code badge */
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-screen w-full flex-col overflow-hidden bg-[#F3F4F6] text-[#16212C]"
      style={{ fontFamily: "'Be Vietnam Pro', 'Inter', sans-serif" }}
    >
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#DCE1E6] bg-white px-10">
        <div className="flex items-center gap-3">
          <img src={BRAND.logo} alt="Logo Khoa Công nghệ Thông tin" className="h-10 w-10" />
          <div className="leading-tight">
            <div className="text-[13px] font-bold tracking-[0.08em]">ÁO ĐỒNG PHỤC KHOA CNTT</div>
            <div className="text-[11px] text-[#5B6875]">
              {BRAND.universityVi} · {BRAND.short}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-[12px] font-semibold text-white"
            style={{ background: accent }}
          >
            {code === "00" ? "Tổng quan" : `Phương án ${code}`}
          </span>
          <span className="text-[16px] font-bold">{concept}</span>
          <span className="text-[#9AA5B1]">/</span>
          <span className="text-[16px] text-[#3B4855]">{garment}</span>
        </div>
      </header>
      <main className="relative min-h-0 flex-1">{children}</main>
      <footer className="flex h-8 shrink-0 items-center justify-between border-t border-[#DCE1E6] px-10 text-[11px] text-[#6B7785]">
        <span>{BRAND.slogan}</span>
        <span>Bản phác thảo ý tưởng · Hình vẽ đúng tỷ lệ size L · Màu trên màn hình chỉ mang tính tham khảo</span>
      </footer>
    </div>
  );
}
