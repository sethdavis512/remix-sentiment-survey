import { Button } from "@radix-ui/themes";
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
    <div className="grid grid-cols-12">
      <div className="col-span-2 p-4">
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
      </div>
      <div className="col-span-10">
        <Outlet />
      </div>
    </div>
  );
}
