import Image from 'next/image';

export const Logo = ({ size = 24 }) => {
  return <Image src="/logo.svg" width={size} height={size} alt="Logo" />;
};
