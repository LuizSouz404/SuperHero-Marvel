import type { NextPage } from 'next'
import { Header } from '../components/Header';
import { PageSeries } from '../components/PageSeries';

const Series: NextPage = () => {

  return (
    <div className="min-h-screen h-full w-full flex">
      <Header />
      
      <PageSeries />
    </div>
  )
}

export default Series
