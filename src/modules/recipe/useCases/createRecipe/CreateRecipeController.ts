import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRecipeUseCase } from "./CreateRecipeUseCase";

export class CreateRecipeController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            ingredients,
            difficulty,
            dish_type,
            additional_features,
            time,
            total_guests,
            author_id,
        } = request.body;

        const createRecipeUseCase = container.resolve(CreateRecipeUseCase);

        const recipe = await createRecipeUseCase.execute(
            {
                name,
                description,
                difficulty,
                dish_type,
                additional_features,
                time,
                total_guests,
                author_id,
            },
            ingredients
        );

        return response.status(201).json(recipe);
    }
}
