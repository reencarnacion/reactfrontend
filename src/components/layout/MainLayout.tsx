import {
  DarkThemeToggle,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  Footer,
  FooterCopyright,
  FooterIcon,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import React from "react";
import { FaEnvelope, FaInstagram } from "react-icons/fa";
import { FaBluesky, FaX } from "react-icons/fa6";
import { HiHome, HiUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { handleSuccess } from "../../utils/notifier";
import SearchInput from "../ui/SearchInput";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    handleSuccess("로그아웃되었습니다.", () => navigate("/login"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* 상단 헤더 */}
      <header className="fixed top-0 w-full z-10 bg-white shadow-md">
        <Navbar fluid rounded>
          <div className="flex items-center gap-4">
            {/* 제목/로고 영역 */}
            <Link to="/">
              <NavbarBrand as="div" className="gap-2">
                <HiHome className="h-6 w-6" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  SWLog
                </span>
              </NavbarBrand>
            </Link>
            {/* 다크모드 토글 */}
            <DarkThemeToggle />
            {/* 검색 */}
            <div className="hidden md:block">
              <SearchInput />
            </div>
          </div>

          <div className="flex items-center md:order-2 gap-8">
            {/* 메뉴 */}
            <NavbarCollapse>
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-4">
                <Link
                  to="/posts"
                  className="border-r border-gray-300 pr-4 dark:border-gray-600"
                >
                  <NavbarLink as="div">게시판</NavbarLink>
                </Link>
                <Link to="/about">
                  <NavbarLink as="div">소개</NavbarLink>
                </Link>
              </div>
            </NavbarCollapse>
            {/* 인증 드롭다운 */}
            <Dropdown
              label={<HiUserCircle className="w-6 h-6" />}
              arrowIcon={false}
              inline
            >
              {isAuthenticated ? (
                <>
                  <DropdownHeader>
                    <span className="block truncate text-sm font-medium">
                      로그인되었습니다
                    </span>
                  </DropdownHeader>
                  <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                </>
              ) : (
                <>
                  <DropdownHeader>
                    <span className="block text-sm">게스트</span>
                    <span className="block truncate text-sm font-medium">
                      로그인이 필요합니다
                    </span>
                  </DropdownHeader>
                  <DropdownItem>
                    <Link to="/login" className="block w-full text-left">
                      로그인
                    </Link>
                  </DropdownItem>
                </>
              )}
              <DropdownItem>
                <Link to="setting" className="block w-full text-left">
                  설정
                </Link>
              </DropdownItem>
            </Dropdown>
            {/* 모바일 메뉴 토글 */}
            <NavbarToggle />
          </div>
        </Navbar>
      </header>

      {/* 페이지 콘텐츠 영역 */}
      <main className="flex flex-grow overflow-hidden pt-16">
        <div className="flex-grow overflow-y-auto p-4 bg-white dark:bg-gray-900">
          {children}
        </div>
      </main>

      {/* 하단 푸터 */}
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="SW" year={2025} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon
                href="https://www.instagram.com/reincarnated90/"
                icon={FaInstagram}
              />
              <FooterIcon href="https://x.com/Reincarnate90" icon={FaX} />
              <FooterIcon
                href="https://bsky.app/profile/reencarnacion.bsky.social"
                icon={FaBluesky}
              />
              <FooterIcon href="mailto:thearch90@gmail.com" icon={FaEnvelope} />
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default MainLayout;
