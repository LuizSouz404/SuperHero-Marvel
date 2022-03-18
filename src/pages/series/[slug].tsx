import type { NextPage } from 'next'
import { PageDetailSeries } from '../../components/DetailPage/PageDetailSeries';
import { Header } from '../../components/Header';

const DetailsSeries: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailSeries />
    </div>
  )
}

export default DetailsSeries
