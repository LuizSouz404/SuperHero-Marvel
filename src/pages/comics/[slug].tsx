import type { NextPage } from 'next'
import { Header } from '../../components/Header';
import { PageDetailComics } from '../../components/PageDetailComics';

const DetailsComics: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailComics />
    </div>
  )
}

export default DetailsComics
