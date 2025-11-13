export type ToastStatus = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: number;
  message: string;
  status: ToastStatus;
}
