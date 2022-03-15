import type { NextPage } from 'next'
import { Header } from '../components/Header';
import { PageCharacters } from '../components/PageCharacters';

const Comics: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Header />
      
      <PageCharacters />
    </div>
  )
}

export default Comics
