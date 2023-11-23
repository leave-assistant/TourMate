import '@/styles/globals.css'
import { SearchProvider } from './SearchContext'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  )
  
}

export default App;