import { createContext, useContext } from "react";
import type { ToastStatus } from "../types/ToastTypes";

export type ToastContextType = (message: string, status: ToastStatus) => void;

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast는 ToastProvider 내에서 사용되어야 합니다.");
  }

  return context;
};
