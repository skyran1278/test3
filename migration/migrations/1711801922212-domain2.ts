import { MigrationInterface, QueryRunner } from "typeorm";

export class Domain21711801922212 implements MigrationInterface {
    name = 'Domain21711801922212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2003" character varying(10)`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2003" IS 'string'`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2004" date`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2004" IS 'date'`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2005" numeric(32,6)`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2005" IS 'decimal'`);
        await queryRunner.query(`CREATE TYPE "public"."domain2_domain2006_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2006" "public"."domain2_domain2006_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2006" IS 'enum'`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2011" integer array`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2011" IS 'Array<int>'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2001"`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2001" boolean`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2001" IS 'boolean'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2002"`);
        await queryRunner.query(`DROP TYPE "public"."domain2_domain2002_enum"`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2002" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2002" IS 'int'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2002" IS 'int'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2002"`);
        await queryRunner.query(`CREATE TYPE "public"."domain2_domain2002_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2002" "public"."domain2_domain2002_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2001" IS 'boolean'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2001"`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD "domain2001" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2011" IS 'Array<int>'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2011"`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2006" IS 'enum'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2006"`);
        await queryRunner.query(`DROP TYPE "public"."domain2_domain2006_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2005" IS 'decimal'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2005"`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2004" IS 'date'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2004"`);
        await queryRunner.query(`COMMENT ON COLUMN "domain2"."domain2003" IS 'string'`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP COLUMN "domain2003"`);
    }

}
