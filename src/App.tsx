import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastProvider";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostList from "./pages/PostListPage";
import PostWritePage from "./pages/PostWritePage";

function App() {
  return (
    <BrowserRouter>
      {/* 추후 프로바이더가 복잡해 보일 경우 통합 프로바이더 컴포넌트 쓰기 */}
      <ToastProvider>
        <AuthProvider>
          {/* 메인 레이아웃으로 감싸기 */}
          <MainLayout>
            <Routes>
              {/* Routes 내에서 특정 URL 경로에 컴포넌트 매핑 */}
              <Route path="/" element={<HomePage />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/write" element={<PostWritePage />} />
              <Route path="/posts/:postId" element={<PostDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="*"
                element={<h1>404 - 페이지를 찾을 수 없습니다.</h1>}
              />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
