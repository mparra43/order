import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCustomer1697166309510 implements MigrationInterface {
    name = 'UpdateCustomer1697166309510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
