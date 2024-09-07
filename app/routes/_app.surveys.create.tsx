import { Button, TextField } from "@radix-ui/themes";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";

import { createSurvey } from "~/models/survey.server";
import { getUserId } from "~/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const createdById = await getUserId(request);
  const form = await request.formData();
  const title = String(form.get("title"));

  const survey = await createSurvey(title, createdById!);

  return redirect(`/surveys/${survey.id}`);
}

export default function CreateSurveyRoute() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  return (
    <Form method="POST" className="max-w-2xl">
      <div className="mb-4 space-y-4">
        <TextField.Root placeholder="Survey title" name="title" />
        <TextField.Root placeholder="Survey title" name="title" />
        <TextField.Root placeholder="Survey title" name="title" />
        <TextField.Root placeholder="Survey title" name="title" />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => setNumberOfQuestions(numberOfQuestions + 1)}
        >
          Add question
        </Button>
        <Button type="submit">Submit the form</Button>
      </div>
    </Form>
  );
}
