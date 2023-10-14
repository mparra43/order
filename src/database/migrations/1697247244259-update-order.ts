import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrder1697247244259 implements MigrationInterface {
    name = 'UpdateOrder1697247244259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "estimated_delivery-date" TO "estimatedDeliveryDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "estimatedDeliveryDate" TO "estimated_delivery-date"`);
    }

}
