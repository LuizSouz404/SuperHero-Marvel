import type { NextPage } from 'next'
import { Header } from '../../components/Header';
import { PageDetailSeries } from '../../components/PageDetailSeries';

const DetailsSeries: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailSeries />
    </div>
  )
}

export default DetailsSeries
