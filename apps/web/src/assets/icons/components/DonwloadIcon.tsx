import { IconProps } from '@/assets/icons/types';
const DonwloadIcon = ({ width = 25, height = 24 }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 25 24"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m16.5 10.5-4 4-4-4M12.5 5v9"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.5 14v3a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-3"
      />
    </svg>
  );
};

export default DonwloadIcon;
