import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { EnvelopeBorder, LetterBorder } from "./LetterBorder";
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
              <EnvelopeBorder />
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
          <LetterBorder />
          <Dialog.Close className="welcome-close" aria-label="Đóng thư chào mừng">
            <X size={20} aria-hidden="true" />
          </Dialog.Close>
          <div className="welcome-letter__sheet">
            <div className="welcome-letter__top">
              <span>ITogether <span aria-hidden="true">/</span> FIT-HPUni</span>
              <span>THƯ NGỎ</span>
            </div>
            <div className="welcome-letter__body">
              <svg className="welcome-plane" viewBox="75 0 270 355" fill="none" aria-hidden="true">
                <path d="M104 147 314 8 182 174Z" fill="#fffefa" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M314 8 317 225 222 200Z" fill="#fffefa" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M314 8 222 200 196 248 182 174Z" fill="#e9edf0" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M196 248 222 200 242 206Z" fill="#d2dce0" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M188 263 C181 284 168 295 148 298 C130 300 119 311 124 329" stroke="#9a846e" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 9" />
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
              <div className="welcome-letter__footer-note">
                <span>How did we get here!</span>
                <span>KHOA CÔNG NGHỆ THÔNG TIN</span>
              </div>
              <Dialog.Close className="welcome-action">
                Khám phá thiết kế <ArrowRight size={18} aria-hidden="true" />
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
