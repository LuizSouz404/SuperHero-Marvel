import type { NextPage } from 'next'
import { Header } from '../components/Header';
import { PageCreators } from '../components/PageCreators';

const Creators: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Header />
      
      <PageCreators />
    </div>
  )
}

export default Creators
