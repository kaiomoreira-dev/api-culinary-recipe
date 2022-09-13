import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create ingredient Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to create ingredient", async () => {
        const produto1 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });

        const { id: prodId1 } = produto1.body as Produto;

        const ingredient1 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId1,
                name: "Alho",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });

        expect(ingredient1.status).toBe(200);
    });
});
