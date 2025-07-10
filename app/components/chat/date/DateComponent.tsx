import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
export default function DateComponent() {
  const [currentDate, setCurrentDate] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(dayjs().format('M/D/YYYY'));
  }, []);

  if (!currentDate) {
    return null;
  }
  return (
    <div className="flex justify-center pb-[17px]">
      <p className="font-body font-normal text-[10px] sm:text-[12px] text-text-gray">
        {currentDate}
      </p>
    </div>
  );
}
