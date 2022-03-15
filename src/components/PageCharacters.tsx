import { useEffect, useState } from "react"
import { api } from '../service/api'
import crypto from 'crypto-js';

export function PageCharacters() {
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState<[]>();  
  
  useEffect(() => {    
    const timestamp = Date.now();
    const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
    const Hash = crypto.MD5(formatHash)
    api.get(`characters?limit=100&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}
    `).then(response => {
      const heroes = response.data.data.results.filter((characters: { thumbnail: { path: string; extension: string; }; }) => {
        const urlImage = characters.thumbnail.path.split("/");
        const nameImage = urlImage[urlImage.length - 1];
        return (
          nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
        );
      });

      setHero(heroes)
    })  
    
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col w-full ml-60 px-10 py-4 gap-6 items-center">
      <div className="flex w-full h-96 rounded-lg overflow-hidden bg-marvel-background bg-center bg-cover">
        <h1 className="w-full h-full bg-black/75 flex text-center items-center justify-center text-8xl font-black text-white">Acervo  MARVEL</h1>
      </div>

      <div className="flex flex-col w-full gap-4">
        <strong className="text-white text-center text-2xl">Characters</strong>
        <div className="grid grid-cols-5 grid-rows-6 gap-2 w-full">
        
        {!!isLoading ? (
          <span>Loading</span>
        ) : (
          <>
            {hero?.map((hero, index) => (
              <div className={`flex relative aspect-square w-full flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                <span className="opacity-50 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{hero.name}</span>
                <img className="w-full h-full object-cover absolute z-0" src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}/>
              </div>
            ))}
          </>
        )}
          
        </div>
      </div>
    </div>
  )
}