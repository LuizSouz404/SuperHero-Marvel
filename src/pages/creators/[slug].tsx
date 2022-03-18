import type { NextPage } from 'next'
import { PageDetailCreators } from '../../components/DetailPage/PageDetailCreators';
import { Header } from '../../components/Header';

const DetailCreators: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailCreators />
    </div>
  )
}

export default DetailCreators
