import { Card, FooterIcon } from "flowbite-react";
import { FaDiscord, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ProfileIcon from "../assets/react.svg";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 px-4">
      <section className="text-center mb-10 max-w-2xl">
        <img
          src={ProfileIcon}
          alt="SW"
          className="rounded-full w-48 h-48 mx-auto mb-6 object-cover shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          김성웅 (SW)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          한국인. 새로운 걸 배우는걸 좋아하는 듯.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          프로필
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-6">
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-3">경력 사항</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>**위OOOO (2017 - 2025)** - SI/SM 개발</li>
              <li>TBD</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="text-2xl font-semibold mb-3">기술 스택</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Java - Spring(boot)</li>
              <li>HTML/Javascript/CSS</li>
              <li>DBMS: Oracle, MariaDB, Tibero, Altibase 등..</li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="w-fill max-w-5xl mb-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          프로젝트
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h5 className="text-xl font-bold">해군C4I 성능개량</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              응용프로그램 개발 및 평가지원
            </p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">경찰청 정보시스템 유지보수</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              소프트웨어 유지보수 및 고객지원
            </p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">TBD</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">TBD</p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">TBD</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">TBD</p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">TBD</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">TBD</p>
          </Card>
          <Card>
            <h5 className="text-xl font-bold">TBD</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">TBD</p>
          </Card>
        </div>
      </section>

      <section className="w-full max-w-2xl text-center py-8">
        <h2 className="text-2xl font-bold mb-4">연락처</h2>
        <div className="flex justify-center space-x-6">
          <FooterIcon href="#" icon={FaGithub} className="text-3xl" />
          <FooterIcon href="#" icon={FaLinkedin} className="text-3xl" />
          <FooterIcon
            href="mailto:thearch90@gmail.com"
            icon={FaEnvelope}
            className="text-3xl"
          />
          <FooterIcon href="#" icon={FaDiscord} className="text-3xl" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
