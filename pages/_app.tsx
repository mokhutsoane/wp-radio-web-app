import { Inter } from 'next/font/google';
import { AppProps } from 'next/app';
import '/styles/globals.css'

const primaryFont = Inter({
  subsets: ['latin'],
  variable: '--primary-font',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${primaryFont.variable} font-sans`}>
    
        <Component {...pageProps} />
   
    </main>
  );
}
