import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1715016750139 implements MigrationInterface {
    name = 'Init1715016750139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
