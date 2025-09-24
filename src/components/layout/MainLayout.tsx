import {
  DarkThemeToggle,
  Footer,
  FooterCopyright,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import SearchInput from "../ui/SearchInput";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 상단 헤더 */}
      <Navbar fluid rounded>
        <div className="flex items-center gap-4">
          <Link to="/">
            <NavbarBrand>
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                SW Blog
              </span>
            </NavbarBrand>
          </Link>
          <DarkThemeToggle />
        </div>

        <NavbarToggle />
        <NavbarCollapse className="flex flex-col items-center">
          <SearchInput />
          <Link to="/posts">
            <NavbarLink>게시글</NavbarLink>
          </Link>
          <Link to="#">
            {/* TODO: 태그마다 달려있는 className 정리방안 */}
            <NavbarLink>소개</NavbarLink>
          </Link>
        </NavbarCollapse>
      </Navbar>

      {/* 페이지 콘텐츠 영역 */}
      <main className="flex-grow container mx-auto p-4 max-w-7xl">
        {children}
      </main>

      {/* 하단 푸터 */}
      <Footer container>
        <FooterCopyright href="#" by="SW" year={2025} />
      </Footer>
    </div>
  );
};

export default MainLayout;
