import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Email } from "../entities/Email";

export class EmailRepository implements IEmailRepository {
    private repository: Repository<Email>;

    constructor() {
        this.repository = dataSource.getRepository(Email);
    }
    async findEmailByE_mail(e_mail: string): Promise<Email> {
        return this.repository.findOneBy({ e_mail });
    }
    async create({ id, e_mail }: ICreateEmailDTO): Promise<Email> {
        const email = this.repository.create({ id, e_mail });

        await this.repository.save(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.repository.find();
    }
}