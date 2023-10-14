import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1697169739095 implements MigrationInterface {
    name = 'UpdateProduct1697169739095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "reference"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "reference" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "reference"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "reference" integer`);
    }

}
