import { Card, FooterIcon } from "flowbite-react";
import { FaDiscord, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ProfileIcon from "../assets/me.jpg";

const AboutPage: React.FC = () => {
  return (
    // 최상위
    <div
      className="grid lg:grid-cols-3 xl:grid-cols-4 
        gap-6 py-6 px-10 overflow-hidden"
    >
      {/* 좌측 영역 */}
      <div
        className="
          lg:col-span-1 xl:col-span-1 
          flex flex-col items-center justify-between
          h-full overflow-y-auto pr-2"
      >
        <div className="flex flex-col items-center w-full space-y-4">
          <section className="text-center w-full">
            <img
              src={ProfileIcon}
              alt="SW"
              className="rounded-full w-32 h-32 mx-auto mb-6 object-cover shadow-lg"
            />
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
              김성웅 (SW)
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              배우기 좋아함
            </p>
          </section>

          <section className="w-full space-y-3">
            <Card className="mb-3">
              <h3 className="text-xl font-semibold mb-2">경력 사항</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>위OOOO (2017 - 2025) - SI/SM 개발</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-xl font-semibold mb-2">기술 스택</h3>
              <ul className="list-disc list-inside space-y-q text-sm">
                <li>Java - Spring(boot)</li>
                <li>HTML/Javascript/CSS</li>
                <li>DBMS: Oracle, MariaDB, Tibero, Altibase 등..</li>
              </ul>
            </Card>
          </section>
        </div>

        <section className="w-full text-center py-4">
          <h2 className="text-xl font-bold mb-3">연락처</h2>
          <div className="flex justify-center space-x-4">
            <FooterIcon href="#" icon={FaGithub} className="text-2xl" />
            <FooterIcon href="#" icon={FaLinkedin} className="text-2xl" />
            <FooterIcon
              href="mailto:thearch90@gmail.com"
              icon={FaEnvelope}
              className="text-2xl"
            />
            <FooterIcon href="#" icon={FaDiscord} className="text-2xl" />
          </div>
        </section>
      </div>

      {/* 우측 영역 */}
      <div className="lg:col-span-2 xl:col-span-3 h-full overflow-y-auto pr-2">
        <section className="w-full">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            주요 프로젝트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card>
              <h5 className="text-xl font-bold">KN체계 성능개량 (2017~2019)</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                응용 개발 및 평가지원
              </p>
            </Card>
            <Card>
              <h5 className="text-xl font-bold">
                경찰청 정보시스템 유지보수 (2020)
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                응용 유지보수 및 고객지원
              </p>
            </Card>
            <Card>
              <h5 className="text-xl font-bold">J체계 성능개량 (2021~2023)</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                응용 개발 및 평가지원
              </p>
            </Card>
            <Card>
              <h5 className="text-xl font-bold">CY체계 탐색개발 (2024~2025)</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                응용 개발
              </p>
            </Card>
            <Card>
              <h5 className="text-xl font-bold">그 외 사내 개발 지원</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                사내제품 유지보수 및 개발 지원
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
