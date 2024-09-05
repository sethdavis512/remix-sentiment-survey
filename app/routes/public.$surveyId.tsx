import { Button } from "@radix-ui/themes";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import ChoicesGroup from "~/components/ChoicesGroup";
import { addResponseToSurvey, getSurveyById } from "~/models/survey.server";
import { getUserId } from "~/session.server";
import { Paths } from "~/utils/paths";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const userId = await getUserId(request);
  const surveyId = String(form.get("surveyId"));

  const answersRaw = form.entries();
  const answers = [...answersRaw]
    .filter((pair) => pair[0] !== "surveyId")
    .map((pair) => ({
      questionId: String(pair[0]),
      choiceId: String(pair[1]),
    }));
  await addResponseToSurvey(surveyId, answers, userId!);

  return redirect(Paths.SUCCESS);
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { surveyId } = params;
  invariant(surveyId, "Survey ID does not exist...");
  const survey = await getSurveyById(surveyId);

  return json({ survey });
}

export default function SurveyRoute() {
  const { survey } = useLoaderData<typeof loader>();

  return (
    <Form method="POST">
      <input name="surveyId" value={survey?.id} type="hidden" />
      <h1 className="my-4 text-4xl font-bold">{survey?.title}</h1>
      <div className="mb-4 space-y-4">
        {survey?.questions.map((question) => {
          return (
            <div key={question.id}>
              <div className="mb-4">{question.text}</div>
              <ChoicesGroup
                ariaLabel={question.text}
                name={question.id}
                choices={question.choices.map((choice) => ({
                  id: choice.id,
                  label: choice.label,
                  value: choice.value,
                }))}
                //   defaultValue={question.choices[2].id}
              />
            </div>
          );
        })}
      </div>
      <div className="mb-12">
        <Button type="submit" size="4">
          Submit the form
        </Button>
      </div>
    </Form>
  );
}
