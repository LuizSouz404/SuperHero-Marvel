import type { NextPage } from 'next'
import { Header } from '../../components/Header';
import { PageComics } from '../../components/MainPage/PageComics';

const Comics: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Header />
      
      <PageComics />
    </div>
  )
}

export default Comics
