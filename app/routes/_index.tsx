import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import { Paths } from "~/utils/paths";

export const meta: MetaFunction = () => [{ title: "SurveyShark" }];

export default function Index() {
  const user = useOptionalUser();

  return (
    <main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
      {user ? (
        <Link
          to={Paths.DASHBOARD}
          className="flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
        >
          View surveys for {user.email}
        </Link>
      ) : (
        <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <Link
            to={Paths.JOIN}
            className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
          >
            Sign up
          </Link>
          <Link
            to={Paths.LOGIN}
            className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
          >
            Log In
          </Link>
        </div>
      )}
    </main>
  );
}
