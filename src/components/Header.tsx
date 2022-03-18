import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPersonFill, BsBookFill,BsPencilFill, BsHouse } from 'react-icons/bs';
import { GiLightSabers, GiBookshelf } from 'react-icons/gi';
import { SearchInput } from './SearchInput';

export function Header() {
  const router = useRouter();
  const currentPath = router.pathname.replace("/", "");

  return (
    <header className="fixed min-h-screen bg-gray-800 shadow-md p-4">
      <div className=" flex flex-col gap-10 h-full w-56 px-4">
        <img className="w-full" src="/logo.png" alt="Marvel" />

        <SearchInput />

        <ul className='flex flex-col gap-1 text-white px-2'>
          <Link href="/" passHref>
            <li className={`${!currentPath ? 'bg-red-600 shadow-red-600/50 shadow-md': ''} p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal`}><BsHouse size={22}/>Home</li>
          </Link>
          <Link href="/characters" passHref>
            <li className={`${currentPath === 'characters' ? 'bg-red-600 shadow-red-600/50 shadow-md': ''} p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal`}><BsPersonFill size={22}/>Characters</li>
          </Link>
          <Link href="/comics" passHref>
            <li className={`${currentPath === 'comics' ? 'bg-red-600 shadow-red-600/50 shadow-md': ''} p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal`}><BsBookFill size={22}/>Comics</li>
          </Link>
          <Link href="/creators" passHref>
            <li className={`${currentPath === "creators" ? 'bg-red-600 shadow-red-600/50 shadow-md': ''} p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal`}><BsPencilFill size={22}/>Creators</li>
          </Link>
          <Link href="/events" passHref>
            <li className={`${currentPath === "events" ? 'bg-red-600 shadow-red-600/50 shadow-md': ''} p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal`}><GiLightSabers size={22}/>Events</li>
          </Link>
          <Link href="/series" passHref>
            <li className={`${currentPath === "series" ? 'bg-red-600 shadow-red-600/50 shadow-md': ''} p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal`}><GiBookshelf size={22}/>Series</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
