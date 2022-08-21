import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIngredient1661028123973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // id?:string;
    // description:string;
    // name:string;
    // weight: number;
    // unity:number;
    // animal?:string;
    // color?:string;
    // created_at: string;
    // updated_at: string;

    await queryRunner.createTable(
      new Table({
        name: "ingredients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "weight",
            type: "numeric",
          },
          {
            name: "unity",
            type: "numeric",
          },
          {
            name: "animal",
            type: "varchar",
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ingredients");
  }
}
