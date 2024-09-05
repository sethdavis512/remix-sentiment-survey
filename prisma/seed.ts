import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
// import { hideBin } from "yargs/helpers";
// import yargs from "yargs/yargs";

// const argv = yargs(hideBin(process.argv))
//   .options({
//     dropOnly: { type: "boolean", default: false },
//   })
//   .parseSync();

const prisma = new PrismaClient();

const getRandomSurveyTitle = () =>
  faker.helpers.arrayElement([
    "Your Opinion Matters: Share Your Experience",
    "Help Us Improve: Your Feedback Counts",
    "Tell Us What You Think: Customer Satisfaction Survey",
    "Rate Your Experience: We Value Your Input",
    "We’re Listening: How Was Your Visit?",
    "Help Us Serve You Better: Share Your Feedback",
    "Your Thoughts, Our Future: Customer Feedback Survey",
    "Shape Our Service: Tell Us What You Think",
    "We Value Your Opinion: Survey & Feedback Form",
    "How Did We Do? Share Your Experience",
    "Spill the Beans: What Did You Think?",
    "High Five or Thumbs Down? Let Us Know!",
    "Tell Us Like It Is: Quick Feedback Survey",
    "Give Us the Scoop: How Was It?",
    "Speak Your Mind: Your Voice, Our Improvement!",
    "Quick Check-In: Did We Nail It or Fail It?",
    "Hit Us with Your Thoughts: Feedback Survey",
    "Survey Says: What’s Your Verdict?",
    "We’re All Ears: Share Your Experience!",
    "Shout Out or Call Out: What’s Your Take?",
  ]);

const getRandomSurveyQuestions = () =>
  faker.helpers.arrayElement([
    "How was your overall experience with the service?",
    "How would you rate the ease of use of the software?",
    "How do you feel about the software meeting your expectations?",
    "What is your sentiment towards the quality of customer support?",
    "How do you feel about recommending our service to others?",
    "How satisfied are you with the most valuable features of the software?",
    "How would you rate the software’s user interface and design?",
    "What is your sentiment regarding the software’s performance and speed?",
    "How do you feel about the reliability of the software?",
    "How satisfied are you with the updates and new features released?",
  ]);

const defaultCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const getRandomChar = (chars: string) =>
  chars.charAt(Math.floor(Math.random() * chars.length));

function getUniqueId(length = 8, characters = defaultCharacters) {
  return [...Array(length)].map(() => getRandomChar(characters)).join("");
}

async function seed() {
  const noop = () => {
    return undefined;
  };
  await prisma.response.deleteMany({}).catch(noop);
  await prisma.question.deleteMany({}).catch(noop);
  await prisma.survey.deleteMany({}).catch(noop);
  await prisma.choice.deleteMany({}).catch(noop);

  const getRandomChoice = async () => {
    const choices = await prisma.choice.findMany();
    return faker.helpers.arrayElement(choices);
  };

  await prisma.choice.createMany({
    data: [
      {
        label: "Very positive",
        value: "VERY_POSITIVE",
      },
      {
        label: "Positive",
        value: "POSITIVE",
      },
      {
        label: "Neutral",
        value: "NEUTRAL",
      },
      {
        label: "Negative",
        value: "NEGATIVE",
      },
      {
        label: "Very negative",
        value: "VERY_NEGATIVE",
      },
    ],
  });

  const email = "seth@mail.com";
  const hashedPassword = await bcrypt.hash("asdfasdf", 10);

  //   if (argv.dropOnly) {
  //     console.log(`Dropped ⬇️`);
  //     return;
  //   }

  const userCount = await prisma.user.count();

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const getPasscode = () => getUniqueId(4, defaultCharacters);

  if (!user) {
    user = await prisma.user.create({
      data: {
        firstName: "Seth",
        lastName: "Davis",
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
      },
    });
  }

  if (userCount < 5) {
    for (
      let index = 0;
      index < faker.number.int({ min: 1, max: 10 });
      index++
    ) {
      await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.firstName(),
          email: faker.internet.email(),
          password: {
            create: {
              hash: await bcrypt.hash(getUniqueId(), 10),
            },
          },
        },
      });
    }
  }

  const allChoices = await prisma.choice.findMany({});
  const choicesIds = allChoices.map((choice) => ({
    id: choice.id,
  }));

  for (
    let parentIndex = 0;
    parentIndex < faker.number.int({ min: 20, max: 50 });
    parentIndex++
  ) {
    const title = getRandomSurveyTitle();

    const survey = await prisma.survey.create({
      data: {
        title,
        passcode: getPasscode(),
        createdById: user.id,
      },
    });

    const responseCount = faker.number.int({ min: 1, max: 10 });

    for (
      let index = 0;
      index < faker.number.int({ min: 1, max: 10 });
      index++
    ) {
      const text = getRandomSurveyQuestions();
      const question = await prisma.question.create({
        data: {
          text,
          createdById: user.id,
          surveyId: survey.id,
          choices: {
            connect: choicesIds,
          },
        },
      });

      for (let index = 0; index < responseCount; index++) {
        const randomChoice = await getRandomChoice();

        await prisma.response.create({
          data: {
            choiceId: randomChoice.id,
            userId: (user as User).id,
            questionId: question.id,
            surveyId: survey.id,
          },
        });
      }
    }
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
