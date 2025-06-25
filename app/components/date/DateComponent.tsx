import dayjs from 'dayjs';
export default function DateComponent() {
  return (
    <div className="flex justify-center pb-[20px]">
      <p className="font-body font-normal text-[10px] sm:text-[12px] text-text-gray">
        {dayjs().format('MM/DD/YYYY')}
      </p>
    </div>
  );
}
