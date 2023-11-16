import '@/styles/globals.css'
import { SearchProvider } from './SearchContext'
import type { AppProps } from 'next/app'
// import WriteMapPage from './WriteMapPage'
// import Search from '../../public/src/Search'

function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
      {/* <WriteMapPage/>
      <Search/> */}
    </SearchProvider>
  )
  
}

export default App;