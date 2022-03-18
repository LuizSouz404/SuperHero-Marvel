import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { api } from "../../service/api";
import crypto from 'crypto-js';
import { ComicsProp, SeriesProp } from "../../types";
import { motion } from 'framer-motion';
import Link from "next/link";

type CreatorsProp = {
  id: number;
  firstName: string;
  role: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  fullName: string;
}

export function PageDetailCreators() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [widthSeries, setWidthSeries] = useState(0);  
  const [widthComics, setWidthComics] = useState(0);  
  const [widthEvents, setWidthEvents] = useState(0);   
  const [creators, setCreators] = useState<CreatorsProp>();
  const [comics, setComics] = useState<ComicsProp[]>([]);
  const [series, setSeries] = useState<SeriesProp[]>([]); 
  const [events, setEvents] = useState<SeriesProp[]>([]); 
  
  const router = useRouter()
  const { slug } = router.query;

  const carouselSeries = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carouselComics = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carouselEvents = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    async function fetchSingleCharacter(): Promise<void> {
      try {
        setIsLoading(true);
        const timestamp = Date.now();
        const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
        const Hash = crypto.MD5(formatHash)
        
        const { data: creatorData } = await api.get(`creators/${slug}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const { data: seriesData } = await api.get(`creators/${slug}/series?limit=20&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const { data: comicsData } = await api.get(`creators/${slug}/comics?limit=20&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const { data: eventsData } = await api.get(`creators/${slug}/events?limit=20&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);

        creatorData.data.results.forEach((characters: { thumbnail: { path: string; extension: string; }; }) => {
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

          console.log(eventsData)

        setCreators(creatorData.data.results[0]);
        setSeries(seriesData.data.results);
        setComics(comicsData.data.results);
        setEvents(eventsData.data.results);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
        carouselComics.current ? setWidthComics(carouselComics.current.scrollWidth - carouselComics.current.offsetWidth) :setWidthComics(0); 
        carouselSeries.current ? setWidthSeries(carouselSeries.current.scrollWidth - carouselSeries.current.offsetWidth) :setWidthSeries(0); 
        carouselEvents.current ? setWidthEvents(carouselEvents.current.scrollWidth - carouselEvents.current.offsetWidth) :setWidthEvents(0); 
      }
    }

    fetchSingleCharacter()
  }, [slug]);

  return (    
    <div className="flex flex-col w-full px-10 pl-72 py-4 gap-6 items-center">
      <div className="flex w-full">
        {!!isLoading ? (
          <>
            <div className="w-36 aspect-2/1 rounded-sm bg-slate-600 animate-pulse"></div>
            <div className="flex w-full justify-center flex-col py-4 px-5 gap-2">
              <div className="bg-slate-600 animate-pulse h-8 w-full"></div>
              <div className="flex flex-col gap-1">
                <div className="bg-slate-600 animate-pulse h-4 w-full"></div>
                <div className="bg-slate-600 animate-pulse h-4 w-full"></div>
                <div className="bg-slate-600 animate-pulse h-4 w-2/3"></div>
              </div>
            </div>
          </>
        ): (
          <>
            <img className="w-36 aspect-2/1 rounded-sm" src={`${creators?.thumbnail.path}.${creators?.thumbnail.extension}`} alt={creators?.firstName} />
            <div className="flex justify-center flex-col py-4 px-5 gap-2">
              <h1 className="text-white font-bold text-2xl">{creators?.firstName}</h1>
              <p className="text-gray-300 ">{creators?.fullName}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col w-full gap-4">
        {!!isLoading ? (
          <>
          <div className="flex flex-col w-full gap-4">
            <strong className="text-white font-semibold text-xl">Comics</strong>
            <motion.div ref={carouselComics} className="overflow-hidden">
              <motion.div drag="x" dragConstraints={{right: 0, left: -widthComics}} className="grid grid-cols-auto gap-2 grid-flow-col">
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <strong className="text-white font-semibold text-xl">Series</strong>
            <motion.div className="overflow-hidden">
              <motion.div drag="x" dragConstraints={{right: 0, left: -0}} className="grid grid-cols-auto gap-2 grid-flow-col">
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-2/1 rounded-md`}></div>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col w-full gap-4">
              <strong className="text-white font-semibold text-xl">Events</strong>
              <motion.div className="overflow-hidden">
                <motion.div drag="x" dragConstraints={{right: 0, left: -0}} className="grid grid-cols-auto gap-2 grid-flow-col">
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                <div className={`bg-slate-600 animate-pulse w-52 aspect-square rounded-md`}></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          </>
        ): (
          <>
          <div className="flex flex-col w-full gap-4">
            <strong className="text-white font-semibold text-xl">Comics</strong>
            <motion.div ref={carouselComics} className="overflow-hidden">
              <motion.div drag="x" dragConstraints={{right: 0, left: -widthComics}} className="grid grid-cols-auto gap-2 grid-flow-col">

                {comics.length > 0 && (
                  <>
                    {comics.map((comic, index) => (
                      <Link href={`/comics/${comic.id}`}>
                        <div className={`flex relative w-52 aspect-2/1 flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                          <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{comic.title}</span>
                          <img className="w-full h-full object-cover absolute z-0" src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}/>
                        </div>
                      </Link>
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <strong className="text-white font-semibold text-xl">Series</strong>
            <motion.div ref={carouselSeries} className="overflow-hidden">
              <motion.div drag="x" dragConstraints={{right: 0, left: -carouselSeries}} className="grid grid-cols-auto gap-2 grid-flow-col">
                {series.length > 0 && (
                  <>
                    {series.map((serie, index) => (
                      <Link href={`/series/${serie.id}`}>
                        <div className={`flex relative w-52 aspect-2/1 flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                          <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{serie.title}</span>
                          <img className="w-full h-full object-cover absolute z-0" src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}/>
                        </div>
                      </Link>
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
                <motion.div drag="x" dragConstraints={{right: 0, left: -0}} className="grid grid-cols-auto grid-cols-[13rem] gap-2 grid-flow-col">

                  {events.length > 0 && (
                    <>
                      {events.map((event, index) => (
                        <Link href={`/events/${event.id}`}>
                          <div className={`flex relative w-52 aspect-square flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                            <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{event.title}</span>
                            <img className="w-full h-full object-cover absolute z-0" src={`${event.thumbnail.path}.${event.thumbnail.extension}`}/>
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  )
}