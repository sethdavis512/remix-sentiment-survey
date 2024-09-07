import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { Paths } from "~/utils/paths";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request);

  return null;
}

export default function AppRoute() {
  return (
    <div className="grid h-screen w-screen grid-cols-12 grid-rows-[auto_1fr_auto]">
      <nav className="col-span-full border-b border-b-zinc-800 p-4">
        <div className="text-2xl font-bold">
          SurveyShark<span className="ml-2">📋🦈</span>
        </div>
      </nav>
      <aside className="col-span-2 overflow-y-auto border-r border-r-zinc-800 p-4">
        <ul>
          <li>
            <Link
              to={Paths.DASHBOARD}
              className="block rounded-lg p-4 hover:bg-gray-800"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={Paths.CREATE_SURVEY}
              className="block rounded-lg p-4 hover:bg-gray-800"
            >
              Create survey
            </Link>
          </li>
        </ul>
      </aside>
      <main className="col-span-10 overflow-y-auto break-all">
        <div className="p-4">
          <Outlet />
        </div>
        <footer className="col-span-full px-4 py-12">
          SurveyShark is not real. Its a prototype by Seth Davis.
        </footer>
      </main>
    </div>
  );
}
