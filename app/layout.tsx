import '/styles/globals.css';
import Footer from '#/ui/footer';
import { GlobalNav } from '#/ui/nav/global-nav';
import Player, { PlayerContextProvider } from '#/ui/radio/player';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://mohodifm.co.za/home'),

  title: {
    default: 'Mohodi FM',
    template: '%s | Mohodi FM',
  },
  appLinks: {
    android: {
      package: 'com.famcast.mohodi',
      app_name: 'Mohodi Community Radio',
    },
    web: {
      url: 'https://mohodifm.co.za/',
      should_fallback: true,
    },
  },
  themeColor: 'black',
  manifest: '/home/manifest.json',
  bookmarks: ['https://mohodifm.co.za/home'],
  category: 'Media',

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/home/logo.png',
    shortcut: '/apple-touch-icon-180x180',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-180x180.png',
    },
  },
  description:
    'Mohodi Community Radio – found in 1995 – broadcasts on the 98.8 MHz FM stereo frequency from the Mohodi township outside Polokwane to Tzaneen; Mokopane; Ngoako; Ramalepe; Sekakeng; Fatima; Madikana; Maponto; Broekman; Brussels; Lisa; Mogwadi; Makgado; Louis Trichardt; Potgietersrus; Duiwelskloof; Dendron; and Makgolong. Villages :Waterpoort, Burgersfort and Montcresto',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="[color-scheme:dark]">
      <body className="bg-gray-1100 overflow-y-scroll  pb-36">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PP5VPBP60N"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PP5VPBP60N');
  `,
          }}
        />

        <PlayerContextProvider>
          <GlobalNav />

          <div className="lg:pl-72">
            <div className="mx-auto max-w-5xl space-y-4 px-2 pt-20 lg:px-8 lg:py-8">
              <div className="">
                <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
              </div>

              {/* <Player className={'fixed sm:hidden '}/> */}
              <Player className={'fixed   sm:block'} />
            </div>

            <div className="mx-auto max-w-5xl space-y-4 px-2 pt-20 lg:px-8 lg:py-8">
              <Footer nextVersion={'13'} />
            </div>
          </div>
        </PlayerContextProvider>
      </body>
    </html>
  );
}
