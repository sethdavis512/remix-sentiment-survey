import { Response } from "@prisma/client";

import { prisma } from "~/db.server";

export const createResponses = (responses: Response[]) => {
  return prisma.response.createMany({
    data: responses.map((response) => ({
      choiceId: response.choiceId,
      questionId: response.questionId,
      surveyId: response.surveyId,
      userId: response.userId,
    })),
  });
};
