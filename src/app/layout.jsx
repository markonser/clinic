/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {NotificationContainer} from "react-notifications";
import "./globals.css";
import "../../node_modules/xbs-enjoyhint/enjoyhint.css";
import 'react-notifications/lib/notifications.css';
import {UserContextProvider} from "../userContext/UserContext";
import {DataContextProvider} from "../dataContext/DataContext";
import Head from "next/head";
import Script from "next/script";

export default function RootLayout({children}) {
  const compose = (providers) =>
    providers.reduce((Prev, Curr) => ({children}) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ));

  const Provider = compose([
    UserContextProvider,
    DataContextProvider,
  ]);

  return (
    <html lang="en">
      <Head>
      </Head>
      <body className="body">
        <Provider>
          <NotificationContainer />
          {children}
        </Provider>
        <Script src="../../node_modules/xbs-enjoyhint/enjoyhint.min.js"></Script>
        <Script src="https://code.jquery.com/jquery-3.5.1.min.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/kineticjs/5.2.0/kinetic.js"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.2/jquery.scrollTo.min.js"></Script>
      </body>
    </html>
  );
}
