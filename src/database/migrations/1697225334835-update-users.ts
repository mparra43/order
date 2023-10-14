import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1697225334835 implements MigrationInterface {
    name = 'UpdateUsers1697225334835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "REL_cd7812c96209c5bdd48a6b858b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_cd7812c96209c5bdd48a6b858b0" UNIQUE ("customer_id")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "REL_cd7812c96209c5bdd48a6b858b" UNIQUE ("customer_id")`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
