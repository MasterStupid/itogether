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
        <Dialog.Content className="welcome-letter">
          <Dialog.Close className="welcome-close" aria-label="Đóng thư chào mừng">
            <X size={20} aria-hidden="true" />
          </Dialog.Close>
          <div className="welcome-letter__top">
            <span>ITogether <span aria-hidden="true">/</span> FIT-HPUni</span>
            <span>THƯ NGỎ</span>
          </div>
          <div className="welcome-letter__body">
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
