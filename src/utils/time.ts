import { differenceInYears, formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

export const formatTimeAgo = (dateString: string): string => {
  if (!dateString) return "날짜 정보 없음";

  const date = new Date(dateString);
  const now = new Date();

  const yearsAgo = differenceInYears(now, date);
  if (yearsAgo >= 1) return "1년 이상 경과";

  return formatDistanceToNowStrict(date, { addSuffix: true, locale: ko });
};
