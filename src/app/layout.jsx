/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {NotificationContainer} from "react-notifications";
import "./globals.css";
import 'react-notifications/lib/notifications.css';
import {UserContextProvider} from "../userContext/UserContext";
import {DataContextProvider} from "../dataContext/DataContext";

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
      <body className="body">
        <Provider>
          <NotificationContainer />
          {children}
        </Provider>
      </body>
    </html>
  );
}
