import { Button } from "@radix-ui/themes";
import { Link, useParams } from "@remix-run/react";

import { Paths } from "~/utils/paths";

export default function SuccessRoute() {
  const params = useParams();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Success!</h1>
        <p>Thanks for filling out the survey.</p>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`${Paths.SURVEYS}/${params.surveyId}`}>
              Back to survey
            </Link>
          </Button>
          <Button asChild>
            <Link to={Paths.DASHBOARD}>Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
