import { MigrationInterface, QueryRunner } from 'typeorm';

import { sql } from 'src/common/sql';
export class Domain61711819745289 implements MigrationInterface {
  name = 'Domain61711819745289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TYPE "public"."domain6_domain6006_enum" AS ENUM ('ACTIVE', 'INACTIVE')
    `);
    await queryRunner.query(sql`
      CREATE TABLE "domain6" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain6001" boolean,
        "domain6002" integer,
        "domain6003" character varying(10),
        "domain6004" date,
        "domain6005" numeric(32, 6),
        "domain6006" "public"."domain6_domain6006_enum",
        "domain6007" jsonb,
        "domain6008" json,
        "domain6011" integer array,
        CONSTRAINT "PK_7c94e2acc89e0eca007eca2b9c7" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain6"."domain6001" IS 'boolean';

      COMMENT ON COLUMN "domain6"."domain6002" IS 'int';

      COMMENT ON COLUMN "domain6"."domain6003" IS 'string';

      COMMENT ON COLUMN "domain6"."domain6004" IS 'date';

      COMMENT ON COLUMN "domain6"."domain6005" IS 'decimal';

      COMMENT ON COLUMN "domain6"."domain6006" IS 'enum';

      COMMENT ON COLUMN "domain6"."domain6007" IS 'jsonb';

      COMMENT ON COLUMN "domain6"."domain6008" IS 'json';

      COMMENT ON COLUMN "domain6"."domain6011" IS 'Array<int>'
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain6" ADD CONSTRAINT "FK_251b3195ebec824c1d68f218e4b" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain6" ADD CONSTRAINT "FK_27b309e15ccebe8a9c8198d6317" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain6" ADD CONSTRAINT "FK_b78dcbae2db27cab6d966c05b6a" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    // Insert data
    await queryRunner.query(sql`
      INSERT INTO
        public.domain6 (
          id,
          domain6001,
          domain6002,
          domain6003,
          domain6004,
          domain6005,
          domain6006,
          domain6007,
          domain6008,
          domain6011
        )
      VALUES
        (
          '1e3b75d6-e9d1-4379-861e-4dc44cfde1e5',
          true,
          1,
          'varchar',
          '2024-03-31',
          10.000000,
          'ACTIVE',
          '{"domain6007": "domain6007"}',
          '{"domain6008": "domain6008"}',
          '{1,2,3}'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "domain6"
      DROP CONSTRAINT "FK_b78dcbae2db27cab6d966c05b6a"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain6"
      DROP CONSTRAINT "FK_27b309e15ccebe8a9c8198d6317"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain6"
      DROP CONSTRAINT "FK_251b3195ebec824c1d68f218e4b"
    `);
    await queryRunner.query(sql`DROP TABLE "domain6"`);
    await queryRunner.query(sql`DROP TYPE "public"."domain6_domain6006_enum"`);
  }
}
