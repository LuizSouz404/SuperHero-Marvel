import Link from 'next/link';
import { BsPersonFill, BsBookFill,BsPencilFill, BsHouse } from 'react-icons/bs';
import { GiLightSabers, GiBookshelf, GiPickOfDestiny } from 'react-icons/gi';

export function Header() {
  return (
    <header className="static w-60 min-h-screen bg-gray-800 shadow-md p-4">
      <div className="flex flex-col gap-10 h-full w-full px-4">
        <img className="w-full" src="/logo.png" alt="Marvel" />

        <ul className='flex flex-col gap-1 text-white px-2'>
          <Link href="#" passHref>
            <li className='bg-red-600 p-2 rounded-md shadow-md shadow-red-600/50 cursor-pointer flex items-center gap-4 text-lg font-normal'><BsHouse size={22}/>Home</li>
          </Link>
          <Link href="#" passHref>
            <li className='p-2 cursor-pointer flex items-center gap-4 text-lg font-normal'><BsPersonFill size={22}/>Characters</li>
          </Link> 
          <Link href="#" passHref>
            <li className='p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal'><BsBookFill size={22}/>Comics</li>
          </Link>
          <Link href="#" passHref>
            <li className='p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal'><BsPencilFill size={22}/>Creators</li>
          </Link>
          <Link href="#" passHref>
            <li className='p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal'><GiLightSabers size={22}/>Events</li>
          </Link>
          <Link href="#" passHref>
            <li className='p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal'><GiBookshelf size={22}/>Series</li>
          </Link>
          <Link href="#" passHref>
            <li className='p-2 rounded-md cursor-pointer flex items-center gap-4 text-lg font-normal'><GiPickOfDestiny size={22}/>Stories</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}