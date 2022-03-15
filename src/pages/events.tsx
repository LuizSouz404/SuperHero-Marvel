import type { NextPage } from 'next'
import { Header } from '../components/Header';
import { PageEvents } from '../components/PageEvents';

const Comics: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Header />
      
      <PageEvents />
    </div>
  )
}

export default Comics
