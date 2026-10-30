import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { EnvelopeBorder, LetterBorder } from "./LetterBorder";
import waxSeal from "@/assets/wax-seal-gold.webp";
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
            {/* The border stays on the envelope while it opens: behind the letter at the top, in front of it on the sides and bottom. */}
            <svg className="welcome-envelope__border" viewBox="0 0 330 213" fill="none">
              <EnvelopeBorder />
            </svg>
            <div className="welcome-envelope__flap" />
            <div className="welcome-envelope__paper">
              <span>ITogether / FIT-HPUni</span>
              <strong>Xin chào!</strong>
              <i /><i /><i />
            </div>
            <div className="welcome-envelope__front" />
            <svg className="welcome-envelope__border welcome-envelope__border--front" viewBox="0 0 330 213" fill="none">
              <EnvelopeBorder />
            </svg>
            <svg className="welcome-envelope__decoration" viewBox="0 0 330 213" fill="none">
              <EnvelopeBorder />
              <text x="22" y="191" fill="#876d59" fontSize="7" fontFamily="sans-serif" letterSpacing="1.2">GỬI ĐẾN BẠN</text>
              <text x="308" y="191" textAnchor="end" fill="#876d59" fontSize="7" fontFamily="sans-serif" letterSpacing="1">FIT · HPUNI</text>
            </svg>
            <img className="welcome-envelope__seal" src={waxSeal} alt="" />
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
              <svg className="welcome-tech" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <g stroke="#bba98f" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M45 27V16M60 27V11M75 27V16M45 93v11M60 93v16M75 93v11M27 45H16M27 60H11M27 75H16M93 45h11M93 60h16M93 75h11" />
                  <circle cx="60" cy="10" r="2" fill="#bba98f" stroke="none" />
                  <circle cx="60" cy="110" r="2" fill="#bba98f" stroke="none" />
                  <circle cx="10" cy="60" r="2" fill="#bba98f" stroke="none" />
                  <circle cx="110" cy="60" r="2" fill="#bba98f" stroke="none" />
                </g>
                <rect x="27" y="27" width="66" height="66" rx="11" fill="#f6f3ed" stroke="#71818a" strokeWidth="1.6" />
                <rect x="33" y="33" width="54" height="54" rx="7" stroke="#d6cbbd" />
                <path d="m51 50-9 10 9 10m18-20 9 10-9 10m-5-24-8 28" stroke="#526875" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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
