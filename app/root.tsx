import { Theme } from "@radix-ui/themes";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";

import "~/tailwind.css";
import "@radix-ui/themes/styles.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </body>
      </Theme>
    </html>
  );
}
