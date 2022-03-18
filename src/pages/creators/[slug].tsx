import type { NextPage } from 'next'
import { Header } from '../../components/Header';
import { PageDetailCreators } from '../../components/PageDetailCreators';

const DetailCreators: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailCreators />
    </div>
  )
}

export default DetailCreators
