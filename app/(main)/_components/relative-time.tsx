'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import 'dayjs/locale/zh-cn';

export interface RelativeTimeProps {
  dateTime: Date;
}

const RelativeTime = ({ dateTime }: RelativeTimeProps) => {
  return (
    <span className="text-[#686868] text-sm">
      <time dateTime={dateTime.toISOString()}>
        {dayjs().locale('zh-cn').to(dayjs(dateTime))}
      </time>
    </span>
  );
};

export default RelativeTime;
