import {BsSearch} from 'react-icons/bs';

export function SearchInput() {
  return (
    <label className='flex items-center px-4 py-3 gap-2 w-full border-2 border-white/75 focus-within:border-red-600 rounded-md' htmlFor="search">
      <BsSearch className='w-4 h-4 text-white' size={20}/>
      <input className='flex bg-transparent border-none text-white w-full outline-none' type="text" id="search"/>
    </label>
  )
}