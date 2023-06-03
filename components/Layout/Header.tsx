import { FC } from 'react';
import Link from 'next/link';

const Header:FC = () => {
  return (
    <header className="py-4 px-5 bg-gray-800">
      <Link href="/" className="text-xl font-medium text-white">
        Movie App
      </Link>
    </header>
  );
};

export default Header;
