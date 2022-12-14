import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateIngredientUseCase {
  constructor(
    @inject("IngredientRepository")
    private ingredientRepository: IIngredientRepository,

    @inject("ProdutoRepository")
    private produtoRepository: IProdutoRepository
  ) {}

  async execute({
    id,
    produto_id,
    unity,
    weight,
  }: ICreateIngredientDTO): Promise<Ingredient> {
    const produtoValidator = await this.produtoRepository.findById(produto_id);

    if (!produtoValidator) {
      throw new AppError("Produto not found.", 401);
    }
    const ingredientValidator =
      await this.ingredientRepository.findByProdutoIdWeightUnity(
        produtoValidator.id,
        weight,
        unity
      );
    if (ingredientValidator) {
      throw new AppError("Ingredient already exists.", 401);
    }

    const ingredient = await this.ingredientRepository.create({
      id,
      produto_id,
      unity,
      weight,
    });

    return ingredient;
  }
}
