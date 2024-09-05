import { Response } from "@prisma/client";

import { prisma } from "~/db.server";

export function createResponses(responses: Response[]) {
  return prisma.response.createMany({
    data: responses.map((response) => ({
      choiceId: response.choiceId,
      questionId: response.questionId,
      surveyId: response.surveyId,
      userId: response.userId,
    })),
  });
}

export function deleteAllResponsesForSurvey(surveyId: string) {
  return prisma.response.deleteMany({
    where: {
      surveyId,
    },
  });
}
