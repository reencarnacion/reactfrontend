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
            <NavbarBrand className="gap-2">
              <HiHome className="h-6 w-6" />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                SWLog
              </span>
            </NavbarBrand>
          </Link>
          <DarkThemeToggle />
        </div>

        <NavbarToggle />
        <NavbarCollapse>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <SearchInput />
            <Link to="/posts">
              <NavbarLink>게시글</NavbarLink>
            </Link>
            <Link to="/about">
              {/* TODO: 태그마다 달려있는 className 정리방안 */}
              <NavbarLink>소개</NavbarLink>
            </Link>
          </div>
        </NavbarCollapse>

        <div>
          <Dropdown
            label={<HiUserCircle className="w-6 h-6" />}
            arrowIcon={false}
            inline
          >
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
            <DropdownItem>
              <Link to="setting" className="block w-full text-left">
                설정
              </Link>
            </DropdownItem>
          </Dropdown>

          {/* 모바일 메뉴 토글? */}
          <NavbarToggle />
        </div>
      </Navbar>

      {/* 페이지 콘텐츠 영역 */}
      <main className="flex flex-grow overflow-hidden">
        <div className="flex-grow overflow-y-auto p-6 bg-white dark:bg-gray-900">
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
