import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth는 반드시 AuthProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
