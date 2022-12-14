/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IInfoAUthor {
    id: string;
    name: string;
    whatsapp: string;
    emails: [];
    recipes: [];
    created_at: Date;
    updated_at: Date;
}

@injectable()
export class CreateAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute({
        id,
        name,
        whatsapp,
    }: ICreateAuthorDTO): Promise<IInfoAUthor> {
        // buscando name de autor
        const authorValidator = await this.authorRepository.findByName(name);

        // validando se author existe
        if (authorValidator) {
            throw new AppError("Author is already exists.", 401);
        }

        const whatsappValidator = await this.authorRepository.findByWhatsapp(
            whatsapp
        );

        if (whatsappValidator) {
            throw new AppError("Whatsapp is already exists.", 401);
        }

        // criando author sem emails e recipes
        const author = await this.authorRepository.create({
            id,
            name,
            whatsapp,
        });

        const authorInfo: IInfoAUthor = {
            id: author.id,
            name,
            whatsapp,
            emails: [],
            recipes: [],
            created_at: author.created_at,
            updated_at: author.updated_at,
        };

        return authorInfo;
    }
}
