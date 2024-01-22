import '../styles/globals.css'
import "../styles/FinishFlag.scss"
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
