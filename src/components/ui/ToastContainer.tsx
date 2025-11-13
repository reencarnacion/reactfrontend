import { Toast, ToastToggle } from "flowbite-react";
import { useEffect } from "react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import type { ToastMessage } from "../../types/ToastTypes";

interface ToastContainerProps {
  messages: ToastMessage[];
  onClose: (id: number) => void;
}

const statusIcon = {
  success: { icon: HiCheck, color: "green" },
  error: { icon: HiX, color: "red" },
  warning: { icon: HiExclamation, color: "yellow" },
  info: { icon: HiExclamation, color: "blue" },
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  messages,
  onClose,
}) => {
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        onClose(messages[0].id);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messages, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      {messages.map((toast) => {
        const { icon: Icon, color } = statusIcon[toast.status];

        return (
          <Toast key={toast.id} className="mb-2">
            <div
              className={`inline-flex h-8 w-8 shrink-0 
                items-center justify-center rounded-lg 
                bg-${color}-100 text-${color}-500 
                dark:bg-${color}-800 dark:text-${color}-200`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{toast.message}</div>
            <ToastToggle onClick={() => onClose(toast.id)} />
          </Toast>
        );
      })}
    </div>
  );
};

export default ToastContainer;
