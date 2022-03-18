import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react";
import { api } from "../../service/api";
import crypto from 'crypto-js';
import { ComicsProp } from "../../types";
import { motion } from 'framer-motion';
import Link from "next/link";
import { SkeletonSlider } from "../SkeletonSlider";
import { isImageAvailable } from "../../utils/isImageAvailable";

export function PageDetailComics() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [widthComics, setWidthComics] = useState(0);
  const [widthOtherComics, setWidthOtherComics] = useState(0);
  const [comics, setComics] = useState<ComicsProp>();
  const [otherComics, setOtherComics] = useState<ComicsProp[]>([]);

  const router = useRouter()
  const { slug } = router.query;

  const carouselComics = useRef() as React.MutableRefObject<HTMLDivElement>;
  const carouselOtherComics = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    async function fetchSingleCharacter(): Promise<void> {
      try {
        setIsLoading(true);
        const timestamp = Date.now();
        const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
        const Hash = crypto.MD5(formatHash)

        const { data: comicsData } = await api.get(`comics/${slug}?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);
        const [titleWithoutSeparator,] = comicsData.data.results[0].title.split("(")
        const [titleWithoutDoubleDots,] = titleWithoutSeparator.split(":")
        const [title,] = titleWithoutDoubleDots.split("VOL.")
        const { data: othersComicsData } = await api.get(`comics?titleStartsWith=${title}&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);

        comicsData.data.results.forEach((characters:any) => {
          const urlImage = characters.thumbnail.path.split("/");
          const nameImage = urlImage[urlImage.length - 1];
          characters.creators.items.forEach((id: { resourceURI: string; }) => {
            const newID = id.resourceURI.split("/");
            id.resourceURI = newID.pop() as string;
          });
          return (
            nameImage === "image_not_available" ? characters.thumbnail.path = "/withoutpic" : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
          );
        });

        isImageAvailable(othersComicsData)

        setComics(comicsData.data.results[0]);
        setOtherComics(othersComicsData.data.results);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
        carouselComics.current ? setWidthComics(carouselComics.current.scrollWidth - carouselComics.current.offsetWidth) :setWidthComics(0);
        carouselOtherComics.current ? setWidthOtherComics(carouselOtherComics.current.scrollWidth - carouselOtherComics.current.offsetWidth) :setWidthOtherComics(0);
        console.log(otherComics.length);
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
            <img className="w-36 aspect-2/1 rounded-sm" src={`${comics?.thumbnail.path}.${comics?.thumbnail.extension}`} alt={comics?.title} />
            <div className="flex justify-center flex-col py-4 px-5 gap-2">
              <h1 className="text-white font-bold text-2xl">{comics?.title}</h1>
              <div>

                <span className="text-gray-200"><strong className="text-white">Nº Pages: </strong>{comics?.pageCount}</span>
              </div>
              <p className="text-gray-300 ">{comics?.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col w-full">
        <strong className="text-white font-semibold text-xl">Creators</strong>
        <div className="grid grid-cols-4 gap-5 w-full p-4">
          {comics?.creators.items.map(creator => (
            <>
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold text-lg">
                {creator.role}
              </span>
              <Link href={`/creators/${creator.resourceURI}`}>
                <span className="text-gray-300">
                  {creator.name}
                </span>
              </Link>
            </div>
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        {!!isLoading ? (
          <>
            <SkeletonSlider title="Series"/>
          </>
        ): (
          <>
            <div className="flex flex-col w-full gap-4">
              <strong className="text-white font-semibold text-xl">Series</strong>
              <motion.div ref={carouselComics} className="overflow-hidden">
                <motion.div drag="x" dragConstraints={{right: 0, left: -widthComics}} className="flex flex-col gap-2">

                  <div className={`flex relative flex-col gap-2 rounded-md overflow-hidden`}>
                    <span className="opacity-50 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 flex items-start ">{comics?.series.name}</span>
                  </div>

                </motion.div>
              </motion.div>
            </div>

            {otherComics.length > 0 && (
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col w-full gap-4">
                  <strong className="text-white font-semibold text-xl">Other Comics</strong>
                  <motion.div ref={carouselOtherComics} className="overflow-hidden">
                    <motion.div drag="x" dragConstraints={{right: 0, left: -widthOtherComics}} className="grid grid-cols-auto grid-cols-[13rem] gap-2 grid-flow-col">
                      {otherComics?.map((OComics, index) => (
                        <Link href={`/comics/${OComics.id}`} passHref key={index}>
                          <div className={`flex relative w-52 aspect-2/1 flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                            <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{OComics.title}</span>
                            <img className="w-full h-full object-cover absolute z-0" src={`${OComics.thumbnail.path}.${OComics.thumbnail.extension}`}/>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
