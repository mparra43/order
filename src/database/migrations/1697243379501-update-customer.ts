import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCustomer1697243379501 implements MigrationInterface {
    name = 'UpdateCustomer1697243379501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "typeDocument" TO "documentType"`);
        await queryRunner.query(`ALTER TYPE "public"."customer_typedocument_enum" RENAME TO "customer_documenttype_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."customer_documenttype_enum" RENAME TO "customer_typedocument_enum"`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "documentType" TO "typeDocument"`);
    }

}
