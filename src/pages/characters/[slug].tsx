import type { NextPage } from 'next'
import { PageDetailCharacters } from '../../components/DetailPage/PageDetailCharacters';
import { Header } from '../../components/Header';

const DetailsCharacters: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-full max-w-screen flex relative">
      <Header />
      <PageDetailCharacters />
    </div>
  )
}

export default DetailsCharacters
