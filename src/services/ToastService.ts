import type { ToastStatus } from "../types/ToastTypes";

let addToastFunction: ((message: string, status: ToastStatus) => void) | null =
  null;

export const registerToastFunction = (
  func: (message: string, status: ToastStatus) => void
) => {
  addToastFunction = func;
};

export const showToast = (message: string, status: ToastStatus) => {
  if (addToastFunction) {
    addToastFunction(message, status);
  } else {
    console.warn(`ToastProvider가 등록되지 않았습니다.`);
  }
};
