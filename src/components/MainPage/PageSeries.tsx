import { useEffect, useState } from "react"
import { api } from '../../service/api'
import crypto from 'crypto-js';
import Link from "next/link";
import { isImageAvailable } from "../../utils/isImageAvailable";
import { MiniLoader } from "../miniLoader";

interface IHeroes {
  title: string
  id: number
  thumbnail: { path: string, extension: string}
}

export function PageSeries() {
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState<IHeroes[]>();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setIsLoading(true);
        const timestamp = Date.now();
        const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
        const Hash = crypto.MD5(formatHash)

        const { data: seriesData } = await api.get(`series?limit=100&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);

        isImageAvailable(seriesData);

        setSeries(seriesData.data.results);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, []);

  return (
    <>
        <div className="flex flex-col w-full px-10 pl-72 py-4 gap-6 items-center">
          <div className="flex w-full h-96 rounded-lg overflow-hidden bg-marvel-background bg-center bg-cover">
            <h1 className="w-full h-full bg-black/75 flex text-center items-center justify-center text-8xl font-black text-white">Acervo  MARVEL</h1>
          </div>

          <div className="flex flex-col w-full gap-4">
            <strong className="text-white text-center text-2xl">Series</strong>

              {!!isLoading ? (
                <div className="w-full flex items-center justify-center">
                  <MiniLoader />
                </div>
              ) : (
                <div className="grid grid-cols-5 grid-rows-6 gap-2 w-full">
                  {series?.map((serie, index) => (
                    <Link href={`/series/${serie.id}`} passHref key={index}>
                      <div className={`flex relative w-full aspect-square flex-col gap-2 rounded-md overflow-hidden`}>
                        <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl text-center p-4 flex items-center justify-center">{serie.title}</span>
                        <img className="w-full h-full object-cover absolute z-0" src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}/>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

          </div>
        </div>
    </>
  )
}
