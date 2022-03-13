import type { NextPage } from 'next'
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import { PageHome } from '../components/PageHome';

const Home: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Loader />
      <Header />
      
      <PageHome />
    </div>
  )
}

export default Home
