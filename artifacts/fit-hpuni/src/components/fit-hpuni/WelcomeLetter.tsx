import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import "./welcome-letter.css";

export function WelcomeLetter() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="welcome-overlay" />
        <div className="welcome-envelope-scene" aria-hidden="true">
          <div className="welcome-envelope">
            <div className="welcome-envelope__back" />
            <div className="welcome-envelope__flap" />
            <div className="welcome-envelope__paper">
              <span>ITogether / FIT-HPUni</span>
              <strong>Xin chào!</strong>
              <i /><i /><i />
            </div>
            <div className="welcome-envelope__front" />
            <svg className="welcome-envelope__decoration" viewBox="0 0 330 213" fill="none">
              <rect x="9" y="9" width="312" height="195" rx="2" stroke="#c8b59f" strokeWidth="0.8" />
              <path d="M18 25h24M18 29h15M288 25h24M297 29h15M18 184h34M278 184h34" stroke="#b99d80" strokeWidth="1" />
              <path d="M19 176c7-8 15-8 22-2m-22 6c8-7 15-7 22-1m238-3c7-8 15-8 22-2m-22 6c8-7 15-7 22-1" stroke="#b99d80" strokeWidth=".7" />
              <text x="20" y="197" fill="#876d59" fontSize="7" fontFamily="sans-serif" letterSpacing="1.2">GỬI ĐẾN BẠN</text>
              <text x="310" y="197" textAnchor="end" fill="#876d59" fontSize="7" fontFamily="sans-serif" letterSpacing="1">FIT · HPUNI</text>
            </svg>
            <div className="welcome-envelope__seal">
              <svg viewBox="0 0 80 80" fill="none">
                <defs>
                  <radialGradient id="wax-gradient" cx=".34" cy=".25" r=".8">
                    <stop stopColor="#c89a75" /><stop offset=".6" stopColor="#a97553" /><stop offset="1" stopColor="#805039" />
                  </radialGradient>
                </defs>
                <path d="M40 3c4-1 7 3 10 3s7-1 10 2 3 6 6 8 6 4 7 8-1 7 0 10 3 7 2 11-4 6-5 9 0 7-3 10-6 3-9 5-5 5-9 5-7-2-10-1-7 3-11 2-6-4-9-5-7 0-10-3-3-6-5-9-5-5-5-9 2-7 1-10-3-7-2-11 4-6 5-9 0-7 3-10 6-3 9-5 5-5 9-5 7 2 10 1Z" fill="url(#wax-gradient)" stroke="#744b38" strokeWidth="1.2" />
                <circle cx="40" cy="40" r="27" stroke="#e6c7a2" strokeOpacity=".6" strokeWidth="1.4" />
                <circle cx="40" cy="40" r="23.5" stroke="#704a38" strokeOpacity=".5" strokeWidth=".8" />
                <path d="M23 49c-3-7-3-13 0-19m34 19c3-7 3-13 0-19M24 35l3-3m-4 9 4-3m-3 8 4-2m28-9-3-3m4 9-4-3m3 8-4-2" stroke="#f0d4b6" strokeOpacity=".8" strokeWidth="1" strokeLinecap="round" />
                <text x="40" y="45" textAnchor="middle" fill="#f7e7d1" fontSize="20" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing="1">IT</text>
                <path d="m40 16 1.1 2.3 2.6.4-1.9 1.8.5 2.6-2.3-1.2-2.3 1.2.5-2.6-1.9-1.8 2.6-.4L40 16Z" fill="#f1d4b2" />
              </svg>
            </div>
          </div>
        </div>
        <Dialog.Content className="welcome-letter">
          <Dialog.Close className="welcome-close" aria-label="Đóng thư chào mừng">
            <X size={20} aria-hidden="true" />
          </Dialog.Close>
          <div className="welcome-letter__top">
            <span>ITogether <span aria-hidden="true">/</span> FIT-HPUni</span>
            <span>THƯ NGỎ</span>
          </div>
          <div className="welcome-letter__body">
            <svg className="welcome-plane" viewBox="0 0 200 150" fill="none" aria-hidden="true">
              <path d="M15 116c21 11 43 10 55-2 9-9 8-19-1-22-8-3-13 6-8 12 7 9 23 8 35 0" stroke="#c5ad94" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 5" />
              <path d="m46 55 139-35-59 96-21-32-36-7-23-22Z" fill="#f7f8f4" stroke="#738a96" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="m46 55 139-35-80 64-59-29Z" fill="#e7eeeb" stroke="#738a96" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="m105 84 80-64-59 96-21-32Z" fill="#cedde0" stroke="#738a96" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="m105 84 2 31 19-21" fill="#b5c9ce" stroke="#738a96" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M46 55 185 20" stroke="#fff" strokeOpacity=".7" strokeWidth="1" />
            </svg>
            <span className="welcome-letter__eyebrow">GỬI ĐẾN BẠN</span>
            <Dialog.Title className="welcome-letter__title">Xin chào!</Dialog.Title>
            <Dialog.Description className="welcome-letter__intro">
              Rất vui vì bạn đã ghé thăm ITogether.
            </Dialog.Description>
            <p>
              Chào mừng bạn đến với thiết kế áo dành cho Khoa Công nghệ thông tin,
              Trường Đại học Hải Phòng. Mỗi chi tiết là một cách thể hiện tinh thần
              gắn kết và niềm tự hào của chúng ta.
            </p>
            <p>
              Mời bạn khám phá hai phiên bản màu, ngắm nhìn từng chi tiết và cảm
              nhận câu chuyện được gửi gắm trong thiết kế.
            </p>
            <blockquote>“You can do IT, we are ready to accompany”</blockquote>
            <p className="welcome-letter__signature">Thân mến,<br /><strong>Nhóm ITogether</strong></p>
          </div>
          <div className="welcome-letter__footer">
            <span>KHOA CÔNG NGHỆ THÔNG TIN</span>
            <Dialog.Close className="welcome-action">
              Khám phá thiết kế <ArrowRight size={18} aria-hidden="true" />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
