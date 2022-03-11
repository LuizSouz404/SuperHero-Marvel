import { useEffect, useState } from "react"
import { api } from '../service/api'
import crypto from 'crypto-js';
import { RequestHeroes } from "../utils/request";

export function PageHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [hero, setHero] = useState<[]>();
  
  
  useEffect(() => {
    const heroes = [1009664, 1009610, 1009187, 1009368, 1009220, 1009697, 1009562, 1009407, 1009282, 1010363]
    
    const timestamp = Date.now();
    const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
    const Hash = crypto.MD5(formatHash)
    api.get(`events/321/characters?limit=40&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}
    `).then(response => {
      const heroes = response.data.data.results

      setHero(heroes)
      console.log(heroes)
    })

    // const heroesInfo = heroes.map(async hero => {
    //   const heroResult = await RequestHeroes(hero);
    //   console.log(heroResult)
    //   setHero(oldArray => [...oldArray, heroResult]);
    //   return heroResult
    // })  

    // setHero(heroesInfo)
    setIsLoading(false);
    // console.log(heroesInfo)
  }, []);

  return (
    <div className="flex flex-col w-full px-10 py-4 items-center">
      <div className="flex w-full h-96 rounded-lg overflow-hidden bg-marvel-background bg-center bg-cover">
        <h1 className="w-full h-full bg-black/75 flex items-center justify-center text-8xl font-black text-white">MARVEL Acervo</h1>
      </div>

      <div className="flex flex-col w-full">
        <strong>Principal Characters</strong>
        <div className="grid grid-cols-10 gap-2 w-full">
        
        {!!isLoading ? (
          <span>Loading</span>
        ) : (
          <>
            {hero.map((hero, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <span>{hero.name}</span>
                <img className="w-20 h-20" src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}/>
              </div>
            ))}
          </>
        )}
          
        </div>
      </div>
    </div>
  )
}