import type { NextPage } from 'next'
import { Header } from '../components/Header';
import { PageHome } from '../components/PageHome';

const Home: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Header />
      
      <PageHome />
    </div>
  )
}

export default Home
