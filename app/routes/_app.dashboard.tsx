import { Badge, BadgeProps, Button, Card } from "@radix-ui/themes";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getSurveysByUserId } from "~/models/survey.server";
import { getUserId } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  invariant(userId, "User ID does not exist...");

  const surveys = await getSurveysByUserId(userId);

  return json({ surveys });
}

export default function DashboardRoute() {
  const { surveys } = useLoaderData<typeof loader>();

  const getLabelColor = (label: string): BadgeProps["color"] => {
    const lowerCaseLabel = label.toLowerCase();

    return lowerCaseLabel === "very negative"
      ? "red"
      : lowerCaseLabel === "negative"
        ? "orange"
        : lowerCaseLabel === "neutral"
          ? "yellow"
          : lowerCaseLabel === "positive"
            ? "blue"
            : "green";
  };

  return (
    <div className="">
      <ul className="space-y-4">
        {surveys.map((survey) => {
          // TODO: Refactor payload to come from loader, no logic on FE
          const answerEntries = Object.entries(
            survey.responses.reduce(
              (allResponses, currentResponse) => {
                if (allResponses[currentResponse.choice.label]) {
                  allResponses[currentResponse.choice.label] =
                    allResponses[currentResponse.choice.label] + 1;
                } else {
                  allResponses[currentResponse.choice.label] = 1;
                }

                return allResponses;
              },
              {} as Record<string, number>,
            ),
          );

          return (
            <li key={survey.id}>
              <Card>
                <div className="mb-4">
                  {survey.title} (Responses: {survey.responses.length})
                </div>
                <div className="mb-4 flex gap-4">
                  {answerEntries.map(([label, count]) => (
                    <Badge
                      variant="soft"
                      color={getLabelColor(label)}
                      key={`${label}${count}`}
                    >{`${label}: ${count}`}</Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button asChild variant="soft">
                    <Link to={`/surveys/${survey.id}`}>See survey stats</Link>
                  </Button>
                  <Button asChild variant="soft">
                    <Link to={`/public/${survey.id}`}>Add new submission</Link>
                  </Button>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
