import type { NextPage } from 'next'
import { useEffect } from 'react'
import { api } from '../service/api'
import crypto from 'crypto-js';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  useEffect(() => {/*
    const timestamp = Date.now();
    const formatHash = `${timestamp}2a4b85951d73a572e94a755d4262a654df6ea9b605805841a2d5bf33286642e479718a54`
    const Hash = crypto.MD5(formatHash)
    const data = api.get(`characters?ts=${timestamp}&apikey=05805841a2d5bf33286642e479718a54&hash=${Hash}
    `).then(response => console.log(response.data.data.results))
    */
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Header />
      
    </div>
  )
}

export default Home
