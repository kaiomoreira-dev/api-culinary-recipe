import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAuthorByNameUseCase } from "./FindAuthorByNameUseCase";

export class FindAuthorByNameController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { author_name } = request.body;

        const findAuthorByName = container.resolve(FindAuthorByNameUseCase);

        const author = await findAuthorByName.execute(author_name);

        return response.status(200).json(author);
    }
}