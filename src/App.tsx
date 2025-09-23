import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";

const Home = () => <h1>블로그 홈 페이지</h1>;

function App() {
  return (
    <BrowserRouter>
      <div className="text-3xl font-bold mb-4">
        <Routes>
          {/* Routes 내에서 특정 URL 경로에 컴포넌트 매핑 */}
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="*" element={<h1>404 - 페이지를 찾을 수 없습니다.</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
