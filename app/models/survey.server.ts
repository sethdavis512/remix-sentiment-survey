import { prisma } from "~/db.server";
import getUniqueId from "~/utils/getUniqueId";

interface AnswerType {
  choiceId: string;
  questionId: string;
}

const getPasscode = () =>
  getUniqueId(undefined, 4, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

export const addResponseToSurvey = (
  surveyId: string,
  answers: AnswerType[],
  userId: string,
) => {
  return prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      responses: {
        create: answers.map((answer) => ({
          choiceId: answer.choiceId,
          questionId: answer.questionId,
          userId,
        })),
      },
    },
  });
};

export const getSurveyById = (surveyId: string) => {
  return prisma.survey.findUnique({
    where: {
      id: surveyId,
    },
    include: {
      questions: {
        include: {
          choices: true,
        },
      },
      responses: {
        include: {
          choice: true,
        },
      },
    },
  });
};

export const getSurveysByUserId = (userId: string) => {
  return prisma.survey.findMany({
    where: {
      createdById: userId,
    },
    include: {
      responses: {
        include: {
          choice: true,
        },
      },
    },
  });
};

export const createSurvey = (title: string, createdById: string) => {
  return prisma.survey.create({
    data: {
      title,
      passcode: getPasscode(),
      createdById,
    },
  });
};

export const deleteSurvey = (surveyId: string) => {
  return prisma.survey.delete({
    where: {
      id: surveyId,
    },
  });
};
