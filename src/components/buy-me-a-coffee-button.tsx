'use client';

import Link from 'next/link';
import Image from 'next/image';

export const BuyMeACoffeeButton = () => {
  return (
    <Link
      href="https://www.buymeacoffee.com/martianrover"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        width={217}
        height={60}
      />
    </Link>
  );
};
