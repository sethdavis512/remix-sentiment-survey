import { Theme } from "@radix-ui/themes";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "~/tailwind.css";
import "@radix-ui/themes/styles.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Theme appearance="dark">
        <body className="h-full">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </Theme>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
