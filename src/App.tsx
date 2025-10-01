import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PostList from "./pages/PostList";
import PostWritePage from "./pages/PostWritePage";

function App() {
  return (
    <BrowserRouter>
      {/* 메인 레이아웃으로 감싸기 */}
      <MainLayout>
        <Routes>
          {/* Routes 내에서 특정 URL 경로에 컴포넌트 매핑 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/write" element={<PostWritePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<h1>404 - 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
