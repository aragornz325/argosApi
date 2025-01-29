import { MigrationInterface, QueryRunner } from "typeorm";

export class Santi1738181947655 implements MigrationInterface {
    name = 'Santi1738181947655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "traffic_tickets" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "traffic_tickets" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "date_of_birth" SET DEFAULT 'Fri Jan 01 1971'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "date_of_birth" SET DEFAULT '1971-01-01 00:00:00'`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "traffic_tickets" DROP COLUMN "is_verified"`);
        await queryRunner.query(`ALTER TABLE "traffic_tickets" DROP COLUMN "delete_at"`);
    }

}
