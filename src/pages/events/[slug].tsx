import type { NextPage } from 'next'
import { Header } from '../../components/Header';
import { PageDetailEvents } from '../../components/PageDetailEvents';

const DetailEvents: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailEvents />
    </div>
  )
}

export default DetailEvents
