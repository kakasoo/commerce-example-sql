import { uuid } from "uuidv4";
import { fa, faker } from "@faker-js/faker";
import * as fs from "fs";

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomDate = (min: Date | string, max: Date | string): string => {
  return faker.date.between({ from: min, to: max }).toISOString();
};

async function init() {
  const from = new Date("2020-01-01");
  const to = new Date("2022-12-31");
  const NUMBER_OF_ROWS = generateRandomNumber(1000, 2000);

  const guestCsvContents: any[] = [];
  const userCsvContents = new Array(NUMBER_OF_ROWS)
    .fill(0)
    .map((_, line) => {
      const userId = uuid();
      const email = faker.internet.email();
      const username = faker.person.fullName();
      const password_hash = faker.internet.password();
      const userCreatedAt = generateRandomDate(from, to);
      const userUpdatedAt = generateRandomDate(userCreatedAt, to);

      /**
       * 90% 확률로, 유저는 회원가입 전 이미 이 사이트를 방문했을 것이라고 가정한다.
       * 방문한 유저는 최소 1번에서 100번 사이의 방문을 하다가 회원가입한 것으로 간주한다.
       */
      if (generateRandomNumber(1, 100) <= 90) {
        const temp = new Array(generateRandomNumber(1, 100))
          .fill(0)
          .map((_, line) => {
            const guestId = uuid();
            /**
             * 유저가 생성되기 전까지만 비회원 활동한 것으로 간주한다.
             * 실제로는 유저가 로그아웃 상태로도 돌아다닐 수 있기 때문에 그 이후의 시간 값도 있다.
             * 단, 로그인할 때마다 게스트에서 유저의 uuid를 찾아 넣어주기 때문에 결국은 전부 찾아낼 수 있다.
             */
            const createdAt = generateRandomDate(from, userCreatedAt);
            return [guestId, userId, createdAt].join(",");
          });

        guestCsvContents.push(...temp);
      }

      return [
        userId,
        email,
        username,
        password_hash,
        userCreatedAt,
        userUpdatedAt,
        null,
      ].join(",");
    })
    .join("\n");

  fs.writeFileSync("./database/user.csv", userCsvContents);
  fs.writeFileSync("./database/guest.csv", guestCsvContents.join("\n"));
}

init();
