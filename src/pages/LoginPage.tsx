import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const LoginPage: React.FC = () => {
  // 파라미터로 타입 정의
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 시도:", { email, password });
    // TODO: 여기 실제 인증 로직 구현
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
          <Button type="submit" className="mt-4" color="cyan">
            로그인
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
