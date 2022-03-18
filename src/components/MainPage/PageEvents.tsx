import { useEffect, useState } from "react"
import { api } from '../../service/api'
import crypto from 'crypto-js';
import Link from "next/link";
import { EventProp } from "../../types";
import { isImageAvailable } from "../../utils/isImageAvailable";
import { MiniLoader } from "../miniLoader";

export function PageEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<EventProp[]>();

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setIsLoading(true);
        const timestamp = Date.now();
        const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
        const Hash = crypto.MD5(formatHash)

        const { data: eventsData } = await api.get(`events?limit=100&ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}`);

        isImageAvailable(eventsData);

        setEvents(eventsData.data.results);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, []);

  return (
    <div className="flex flex-col w-full px-10 pl-72 py-4 gap-6 items-center">
      <div className="flex w-full h-96 rounded-lg overflow-hidden bg-marvel-background bg-center bg-cover">
        <h1 className="w-full h-full bg-black/75 flex text-center items-center justify-center text-8xl font-black text-white">Acervo  MARVEL</h1>
      </div>

      <div className="flex flex-col w-full gap-4">
        <strong className="text-white text-center text-2xl">Events</strong>

        {!!isLoading ? (
          <div className="w-full flex items-center justify-center">
            <MiniLoader />
          </div>
        ) : (
          <div className="grid grid-cols-5 grid-rows-6 gap-2 w-full">
            {events?.map((event, index) => (
              <Link href={`/events/${event.id}`} passHref key={index}>
              <div className={`flex relative aspect-square w-full flex-col gap-2 rounded-md overflow-hidden`} key={index}>
                <span className="opacity-20 transition-opacity hover:opacity-100 z-10 w-full h-full bg-black/25 text-white text-bold text-2xl p-4 text-center flex items-center justify-center">{event.title}</span>
                <img className="w-full h-full object-cover absolute z-0" src={`${event.thumbnail.path}.${event.thumbnail.extension}`}/>
              </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
