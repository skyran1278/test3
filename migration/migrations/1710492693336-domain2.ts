import { MigrationInterface, QueryRunner } from "typeorm";

export class Domain21710492693336 implements MigrationInterface {
    name = 'Domain21710492693336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "domain3" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain3001" integer, "domain2Id" uuid NOT NULL, CONSTRAINT "PK_6bf295d330c3f913852003de54f" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain3"."domain3001" IS 'domain3001'`);
        await queryRunner.query(`CREATE TYPE "public"."domain2_domain2002_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "domain2" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain2001" integer, "domain2002" "public"."domain2_domain2002_enum", CONSTRAINT "PK_62c76f3a9c016504bca07e761f6" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain2"."domain2001" IS 'domain2001'; COMMENT ON COLUMN "domain2"."domain2002" IS 'status'`);
        await queryRunner.query(`ALTER TABLE "domain3" ADD CONSTRAINT "FK_0ab294f171749681426048a7885" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domain3" ADD CONSTRAINT "FK_e988d745f75146e99f3a4d648ae" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domain3" ADD CONSTRAINT "FK_27e69e7b62bb1ef6f7105f2de83" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domain3" ADD CONSTRAINT "FK_5d756bbfcf3f2a4f9ec1af7803c" FOREIGN KEY ("domain2Id") REFERENCES "domain2"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD CONSTRAINT "FK_8624a4abbd235b6bf8a94315efb" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD CONSTRAINT "FK_6539079050f1c4a7a762bd5a2cc" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "domain2" ADD CONSTRAINT "FK_4968d0ec4667b16612bd7da1cc7" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domain2" DROP CONSTRAINT "FK_4968d0ec4667b16612bd7da1cc7"`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP CONSTRAINT "FK_6539079050f1c4a7a762bd5a2cc"`);
        await queryRunner.query(`ALTER TABLE "domain2" DROP CONSTRAINT "FK_8624a4abbd235b6bf8a94315efb"`);
        await queryRunner.query(`ALTER TABLE "domain3" DROP CONSTRAINT "FK_5d756bbfcf3f2a4f9ec1af7803c"`);
        await queryRunner.query(`ALTER TABLE "domain3" DROP CONSTRAINT "FK_27e69e7b62bb1ef6f7105f2de83"`);
        await queryRunner.query(`ALTER TABLE "domain3" DROP CONSTRAINT "FK_e988d745f75146e99f3a4d648ae"`);
        await queryRunner.query(`ALTER TABLE "domain3" DROP CONSTRAINT "FK_0ab294f171749681426048a7885"`);
        await queryRunner.query(`DROP TABLE "domain2"`);
        await queryRunner.query(`DROP TYPE "public"."domain2_domain2002_enum"`);
        await queryRunner.query(`DROP TABLE "domain3"`);
    }

}
