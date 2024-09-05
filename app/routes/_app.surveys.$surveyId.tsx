import { Badge, BadgeProps, Button, DataList } from "@radix-ui/themes";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import invariant from "tiny-invariant";

import { deleteSurvey, getSurveyById } from "~/models/survey.server";
import { Paths } from "~/utils/paths";

export async function action({ request, params }: ActionFunctionArgs) {
  const form = await request.formData();
  const { surveyId } = params;
  invariant(surveyId, "Survey ID does not exist");
  const intent = form.get("intent");

  if (intent === "delete") {
    await deleteSurvey(surveyId);
  }

  return redirect(Paths.DASHBOARD);
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { surveyId } = params;
  invariant(surveyId, "Survey ID does not exist...");
  const survey = await getSurveyById(surveyId);

  return json({ survey });
}

export default function SurveyRoute() {
  const { survey } = useLoaderData<typeof loader>();

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
    <>
      <h1 className="my-4 text-4xl font-bold">{survey?.title}</h1>
      <div className="my-4 flex gap-2">
        <Button asChild>
          <Link to={`/public/${survey?.id}`}>Add new submission</Link>
        </Button>
        <Form method="POST">
          <Button name="intent" value="delete" color="red">
            Delete
          </Button>
        </Form>
      </div>
      <div className="mb-4 space-y-4">
        {survey?.questions.map((question) => {
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
            <div key={question.id}>
              <div className="mb-4">{question.text}</div>
              <div className="flex gap-2">
                {answerEntries.map(([label, count]) => (
                  <Badge
                    variant="soft"
                    color={getLabelColor(label)}
                    key={`${label}${count}`}
                  >{`${label}: ${count}`}</Badge>
                ))}
              </div>
              <details className="my-4 rounded-lg border border-zinc-500 p-4">
                <summary>See response data</summary>
                <DataList.Root className="my-4">
                  {survey.responses.map((response) => (
                    <DataList.Item key={response.id}>
                      <DataList.Label>
                        {response.user.firstName} {response.user.lastName}
                      </DataList.Label>
                      <DataList.Value>
                        {response.choice.label} (
                        {format(response.createdAt, "yyyy/mm/dd p")})
                      </DataList.Value>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              </details>
            </div>
          );
        })}
      </div>
    </>
  );
}
