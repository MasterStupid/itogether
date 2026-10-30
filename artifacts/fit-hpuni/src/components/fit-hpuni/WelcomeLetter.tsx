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
              <svg className="welcome-plane" viewBox="-70 0 415 355" fill="none" aria-hidden="true">
                <path d="M104 147 314 8 182 174Z" fill="#fffefa" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M314 8 317 225 222 200Z" fill="#fffefa" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M314 8 222 200 196 248 182 174Z" fill="#e9edf0" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path d="M196 248 222 200 242 206Z" fill="#d2dce0" stroke="#52616a" strokeWidth="3" strokeLinejoin="round" />
                <path
                  d="M-65 307 C-54 330 -24 341 -3 333 C14 327 20 312 12 307 C8 304 3 307 5 312 C13 328 40 337 77 329 C54 317 40 306 42 292 C44 277 62 274 77 290 C92 275 112 282 113 296 C114 309 100 319 77 329 C121 335 153 306 171 284 C181 272 188 260 196 248"
                  stroke="#9a846e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
