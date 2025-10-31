import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { login } from "../api/AuthApi";
import type { LoginRequest } from "../types/Auth";

const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const LoginPage: React.FC = () => {
  // 파라미터로 타입 정의
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 인증 절차
    const credentials: LoginRequest = { email, password };

    try {
      const data = await login(credentials);
      saveToken(data.accessToken);
      alert("로그인 성공! 토큰이 저장되었습니다.");
      // TODO: 페이지 이동 로직(홈페이지로)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("로그인 처리 중 알 수 없는 오류 발생");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md w-full p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          로그인
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">이메일</Label>
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">비밀번호</Label>
              <TextInput
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div
              className="flex items-center rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <svg
                className="mr-3 inline h-4 w-4 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Error</span>
              <div>
                <span className="font-medium">로그인 오류:</span> {error}
              </div>
            </div>
          )}

          <Button type="submit" className="mt-4" color="cyan">
            {isLoading ? "로그인 중.." : "로그인"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
