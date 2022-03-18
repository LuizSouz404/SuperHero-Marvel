import type { NextPage } from 'next'
import { PageDetailComics } from '../../components/DetailPage/PageDetailComics';
import { Header } from '../../components/Header';

const DetailsComics: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailComics />
    </div>
  )
}

export default DetailsComics
