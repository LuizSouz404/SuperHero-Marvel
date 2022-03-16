import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { api } from "../service/api";
import crypto from 'crypto-js';
import { ComicsProp, SeriesProp } from "../types";
import { motion } from 'framer-motion';

interface IHeroes {
  name: string
  description: string
  id: number
  thumbnail: { path: string, extension: string}
}

export function PageDetailCharacters() {
  const [width, setWidth] = useState(0);   
  const [hero, setHero] = useState<IHeroes>();   
  const [comics, setComics] = useState<ComicsProp[]>([]);
  const [series, setSeries] = useState<SeriesProp[]>([]); 
  const [events, setEvents] = useState<SeriesProp[]>([]); 
  
  const router = useRouter()
  const { slug } = router.query;

  const carousel = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    async function fetchSingleCharacter(): Promise<void> {
      try {
        const timestamp = Date.now();
        const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
        const Hash = crypto.MD5(formatHash)
        
        const { data: characterData } = await api.get(`characters/${slug}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const { data: seriesData } = await api.get(`characters/${slug}/series?limit=20&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const { data: comicsData } = await api.get(`characters/${slug}/comics?limit=20&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const { data: eventsData } = await api.get(`characters/${slug}/events?limit=20&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
               
        characterData.data.results.forEach((characters: { thumbnail: { path: string; extension: string; }; }) => {
          const urlImage = characters.thumbnail.path.split("/");
          const nameImage = urlImage[urlImage.length - 1];
          return (
            nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
            );
          });
          
        seriesData.data.results.forEach((characters: { thumbnail: { path: string; extension: string; }; }) => {
          const urlImage = characters.thumbnail.path.split("/");
          const nameImage = urlImage[urlImage.length - 1];
          return (
            nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
          );
        });
        
        comicsData.data.results.forEach((characters: { thumbnail: { path: string; extension: string; }; }) => {
          const urlImage = characters.thumbnail.path.split("/");
          const nameImage = urlImage[urlImage.length - 1];
          return (
            nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
          );
        });

        eventsData.data.results.forEach((characters: { thumbnail: { path: string; extension: string; }; }) => {
          const urlImage = characters.thumbnail.path.split("/");
          const nameImage = urlImage[urlImage.length - 1];
          return (
            nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
            );
          });

        setHero(characterData.data.results[0]);
        setSeries(seriesData.data.results);
        setComics(comicsData.data.results);
        setEvents(eventsData.data.results);
      } catch (error) {
        console.log(error)
      } finally {      
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
      }
    }

    fetchSingleCharacter()
  }, []);

  return (    
    <div className="flex flex-col w-full px-10 pl-72 py-4 gap-6 items-center">
      <div className="flex w-full">
        <img className="w-36 h-36 rounded-sm" src={`${hero?.thumbnail.path}.${hero?.thumbnail.extension}`} alt={hero?.name} />
        <div className="flex justify-center flex-col py-4 px-5 gap-2">
          <h1 className="text-white font-bold text-2xl">{hero?.name}</h1>
          <p className="text-gray-300 ">{hero?.description}</p>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full gap-4">
          <strong className="text-white font-semibold text-xl">Comics</strong>
          <motion.div className="overflow-hidden">
            <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className="grid grid-cols-auto gap-2 grid-flow-col">

              {comics.length > 0 && (
                <>
                  {comics.map((comic, index) => (
                    <div className={`flex relative w-52 aspect-2/1 flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                      <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{comic.title}</span>
                      <img className="w-full h-full object-cover absolute z-0" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}/>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col w-full gap-4">
          <strong className="text-white font-semibold text-xl">Series</strong>
          <motion.div  className="overflow-hidden">
            <motion.div ref={carousel} drag="x" dragConstraints={{right: 0, left: -width}} className="grid grid-cols-auto gap-2 grid-flow-col">
              {series.length > 0 && (
                <>
                  {series.map((serie, index) => (
                    <div className={`flex relative w-52 aspect-2/1 flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                      <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{serie.title}</span>
                      <img className="w-full h-full object-cover absolute z-0" src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}/>
                    </div>
                  ))}            
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col w-full gap-4">
          <strong className="text-white font-semibold text-xl">Events</strong>
          <motion.div className="overflow-hidden">
            <motion.div drag="x" dragConstraints={{right: 0, left: -width}} className="grid grid-cols-auto gap-2 grid-flow-col">

              {events.length > 0 && (
                <>
                  {events.map((event, index) => (
                    <div className={`flex relative w-52 aspect-square flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                      <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{event.title}</span>
                      <img className="w-full h-full object-cover absolute z-0" src={`${event.thumbnail.path}.${event.thumbnail.extension}`}/>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  )
}