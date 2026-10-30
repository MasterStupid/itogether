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
            <div className="welcome-envelope__seal">IT</div>
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
            <svg className="welcome-crane" viewBox="0 0 200 150" fill="none" aria-hidden="true">
              <path d="M18 47 78 91 108 81 89 55 18 47Z" fill="#d8e1e4" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M77 91 104 79 82 15 58 68 77 91Z" fill="#f8f6ef" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m77 91 27-12 31 17-23 14-35-19Z" fill="#c7d4d9" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m104 79 34-45-15 54 12 8-31-17Z" fill="#edf1ee" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m135 96 24-30 5-21 13-7-7 14-3 22-24 35-31 1 23-14Z" fill="#d6e0e1" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m177 38 15 3-22 11 7-14Z" fill="#c49b78" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m77 91 35 19-14 28-4-27-17-20Z" fill="#edf1ee" stroke="#738a96" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="m58 68 46 11M82 15l22 64m-27 12 35 19m23-14-31-17" stroke="#99aeb5" strokeWidth="1" />
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
