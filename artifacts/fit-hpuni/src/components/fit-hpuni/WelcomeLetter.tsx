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
              <text x="22" y="191" fill="#876d59" fontSize="7" fontFamily="sans-serif" letterSpacing="1.2">GỬI ĐẾN BẠN</text>
              <text x="308" y="191" textAnchor="end" fill="#876d59" fontSize="7" fontFamily="sans-serif" letterSpacing="1">FIT · HPUNI</text>
            </svg>
            <div className="welcome-envelope__seal">
              <svg viewBox="0 0 80 80" fill="none">
                <defs>
                  <radialGradient id="wax-gradient" cx=".35" cy=".3" r=".75">
                    <stop stopColor="#3f6286" /><stop offset=".55" stopColor="#24405f" /><stop offset="1" stopColor="#14263b" />
                  </radialGradient>
                  <radialGradient id="wax-press" cx=".6" cy=".65" r=".7">
                    <stop stopColor="#2b4a6b" /><stop offset="1" stopColor="#182d45" />
                  </radialGradient>
                  <linearGradient id="wax-gold" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#f3dcae" /><stop offset=".5" stopColor="#c99d5c" /><stop offset="1" stopColor="#a9793d" />
                  </linearGradient>
                </defs>
                {/* Wax pool with soft, uneven edges */}
                <path d="M40 4c5 0 7 2 11 2.5s8 .5 10.5 3.5 2 6 4.5 8.5 5.5 4 6.5 8-1 6.5-.5 10 2.5 6.5 1.5 10-4 5.5-5 8.5.5 6.5-2.5 9.5-6.5 2.5-9.5 4.5-5 4.5-9 5-6.5-1.5-10-1.5-6.5 2.5-10 1.5-5.5-3.5-8.5-4.5-7-.5-9.5-3.5-2-6.5-4-9-5.5-4.5-6-8.5 1.5-6.5 1-10-3-6.5-2-10 4-5.5 5-8.5 0-6.5 3-9.5 6.5-2.5 9.5-4.5 5-4.5 9-5Z" fill="url(#wax-gradient)" />
                {/* Pressed stamp face */}
                <circle cx="40" cy="40" r="25.5" fill="url(#wax-press)" />
                <circle cx="40" cy="40" r="25.5" stroke="#5b7ea3" strokeOpacity=".55" strokeWidth="1.2" />
                <circle cx="40" cy="40" r="21.5" stroke="url(#wax-gold)" strokeWidth="1.1" />
                <circle cx="40" cy="40" r="19" stroke="url(#wax-gold)" strokeWidth=".5" strokeDasharray="1 2.2" />
                <text x="40" y="47" textAnchor="middle" fill="url(#wax-gold)" fontSize="21" fontFamily="Georgia, serif" fontWeight="bold" letterSpacing=".5">IT</text>
                <path d="M30 51.5h20" stroke="url(#wax-gold)" strokeWidth=".8" strokeLinecap="round" />
                <path d="m40 24.2.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3.9-1.9Z" fill="url(#wax-gold)" />
                {/* Glossy highlight */}
                <path d="M17 26c3-6 8-10 15-12" stroke="#fff" strokeOpacity=".35" strokeWidth="2.2" strokeLinecap="round" />
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
