import { useEffect, useState } from 'react';
import {BsSearch} from 'react-icons/bs';
import { api } from '../service/api';
import crypto from 'crypto-js';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IHeroes {
  name?: string
  title?: string
  firstName?: string
  id: number
  thumbnail: { path: string, extension: string}
}

export function SearchInput() {
  const router = useRouter();
  const [, currentPath,] = router.pathname.split("/")
  const searchDynamicPath = currentPath === 'comics' || currentPath === 'series' ? 'titleStartsWith' : 'nameStartsWith';

  const [input, setInput] = useState("");
  const [heros, setHeros] = useState<IHeroes[] | null>();

  useEffect(() => {
    const getData = async () => {
      const timestamp = Date.now();
      const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
      const Hash = crypto.MD5(formatHash);

      if(input!=="") {
        api.get(`${currentPath  === "" ? 'characters' : currentPath }?${searchDynamicPath}=${input}&limit=10&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}
        `).then(response => {
          const heroes = response.data.data.results.filter((characters: { thumbnail: { path: string; extension: string; }; }) => {
            const urlImage = characters.thumbnail.path.split("/");
            const nameImage = urlImage[urlImage.length - 1];
            return (
              nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
            );
          });

          setHeros(heroes)
        });
      }

      if(input === "") {
        setHeros(null)
      }

    }

    let timer = setTimeout(() => {
      if(input)
        getData()
    }, 1500);

    return () => clearTimeout(timer)
  }, [input]);

  return (
    <div className='relative w-full'>
      <label className={`flex items-center px-4 py-3 gap-2 w-full ${input === "" ? 'border-2' : 'border-2 rounded-b-none'} border-white/75 focus-within:border-red-600 rounded-md`} htmlFor="search">
        <BsSearch className='w-4 h-4 text-white' size={20}/>
        <input className='flex bg-transparent border-none text-white w-full outline-none' value={input} onChange={(e) => setInput(e.target.value)} type="text" id="search"/>
      </label>
      {input !== "" && heros && (
        <ul className='flex flex-col w-full bg-slate-800 rounded-b-md border-red-600 border-t-0 border-2 absolute top-full left-0'>
          {heros?.map((hero, index) => (
            <Link href={`/${currentPath  === "" ? 'characters' : currentPath }/${hero.id}`} passHref key={index}>
              <li key={index} className={`flex items-center hover:bg-slate-900 cursor-pointer gap-2 px-4 text-ellipsis p-2 overflow-hidden ${heros.length !== index + 1 ? 'border-b-2 border-slate-400/10' : ''}`}>
                <img className='w-10 h-10 object-cover aspect-square rounded-full' src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={searchDynamicPath === 'titleStartsWith' ? hero.title : currentPath === "creators" ? hero.firstName : hero.name} />
                <span className='text-sm text-white text-ellipsis  whitespace-nowrap overflow-hidden w-auto'>{searchDynamicPath === 'titleStartsWith' || currentPath === 'events' ? hero.title : currentPath === "creators" ? hero.firstName : hero.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}
