import { uuid } from "uuidv4";
import { fakerEN_GB } from "@faker-js/faker";
import * as fs from "fs";

async function createGuestDummyData() {
    const NUMBER_OF_ROWS = 10000;

    const csvContent = new Array(NUMBER_OF_ROWS)
        .fill(0)
        .map((_, line) => {
            const id = uuid();
            const email = fakerEN_GB.internet.email();
            const username = fakerEN_GB.person.fullName();
            const password_hash = fakerEN_GB.internet.password();
            const createdAt = fakerEN_GB.date.between({
                from: new Date("2020-01-01"),
                to: new Date("2022-12-31"),
            });
            return [
                id,
                email,
                username,
                username,
                password_hash,
                createdAt,
                createdAt,
                null,
            ].join(",");
        })
        .join("\n");

    fs.writeFileSync("./database/guest.csv", csvContent);
}

function createCsv() {
    createGuestDummyData().then(() => {});
}

createCsv();
