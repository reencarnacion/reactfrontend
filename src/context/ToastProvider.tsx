import { useCallback, useEffect, useState, type ReactNode } from "react";
import ToastContainer from "../components/ui/ToastContainer";
import { ToastContext } from "../hooks/useToast";
import { registerToastFunction } from "../services/ToastService";
import type { ToastMessage, ToastStatus } from "../types/ToastTypes";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (message: string, status: ToastStatus) => {
      const newToast: ToastMessage = {
        id: Date.now(),
        message,
        status,
      };

      setMessages((prev) => [...prev, newToast]);
    },
    [setMessages]
  );

  const removeToast = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  useEffect(() => {
    registerToastFunction(addToast);
  }, [addToast]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastContainer messages={messages} onClose={removeToast} />
    </ToastContext.Provider>
  );
};
