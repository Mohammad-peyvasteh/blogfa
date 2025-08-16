
import Header from "@/components/homePage/Header";
import "./globals.css";

import vazirFont from "@/constants/localFont";
import Providers from "@/provider/Provider";
import { ContextProvider } from "@/context/ContextProvider";

export const metadata = {
  title: {
    template: "بلاگفا  |   %s",
    default: "بلاگفا ",
  },
  description: "بلاگفا",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body  className={`${vazirFont.variable} font-sans bg-gray-100`}>
        <Providers>
       <ContextProvider>
          <Header/>
          {children}
         </ContextProvider>
          </Providers>
      </body>
    </html>
  );
}
