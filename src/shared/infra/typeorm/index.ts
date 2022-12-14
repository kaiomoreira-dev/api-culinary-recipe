import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { DataSource } from "typeorm";

import { CreateIngredient1661028123973 } from "./migrations/1661028123973-CreateIngredient";
import { CreateEmail1661287166449 } from "./migrations/1661287166449-CreateEmail";
import { CreateAuthor1661395822193 } from "./migrations/1661395822193-CreateAuthor";
import { CreateProduto1661479247977 } from "./migrations/1661479247977-CreateProduto";
import { CreateRecipe1661569145708 } from "./migrations/1661569145708-CreateRecipe";
import { AlterIngredientAddFkRecipe1661737240869 } from "./migrations/1661737240869-AlterIngredientAddFkRecipe";
import { CreateRecipesIngredients1661737605277 } from "./migrations/1661737605277-CreateRecipesIngredients";
import { AlterEmailAddFkAuthor1661737772608 } from "./migrations/1661737772608-AlterEmailAddFkAuthor";

const dataSource = new DataSource({
  type: "postgres",
  port: 1954,
  username: "docker",
  password: "UMONME68xjZdfzv6ZyoTPWDORjx3P8JLd+GnFNRKbDQ=",
  database:
    process.env.NODE_ENV === "test"
      ? "culinary_recipes_test"
      : "culinary_recipes",

  // importar entidades ex: [Recipes]
  entities: [Produto, Ingredient, Email, Author, Recipe],
  // importar migrations ex: [CreateRecipes102348998]
  migrations: [
    CreateProduto1661479247977,
    CreateAuthor1661395822193,
    CreateEmail1661287166449,
    CreateRecipe1661569145708,
    CreateIngredient1661028123973,
    AlterIngredientAddFkRecipe1661737240869,
    CreateRecipesIngredients1661737605277,
    AlterEmailAddFkAuthor1661737772608,
  ],
});

export function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
