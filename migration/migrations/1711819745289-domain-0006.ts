import { MigrationInterface, QueryRunner } from 'typeorm';

import { sql } from 'src/common/sql';
export class Domain00061711819745289 implements MigrationInterface {
  name = 'Domain00061711819745289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TYPE "public"."domain0006_domain0006006_enum" AS ENUM ('ACTIVE', 'INACTIVE')
    `);
    await queryRunner.query(sql`
      CREATE TABLE "domain0006" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain0006001" boolean,
        "domain0006002" integer,
        "domain0006003" character varying(10),
        "domain0006004" date,
        "domain0006005" numeric(32, 6),
        "domain0006006" "public"."domain0006_domain0006006_enum",
        "domain0006007" jsonb,
        "domain0006008" json,
        "domain0006011" integer array,
        CONSTRAINT "PK_7c94e2acc89e0eca007eca2b9c7" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain0006"."domain0006001" IS 'boolean';

      COMMENT ON COLUMN "domain0006"."domain0006002" IS 'int';

      COMMENT ON COLUMN "domain0006"."domain0006003" IS 'string';

      COMMENT ON COLUMN "domain0006"."domain0006004" IS 'date';

      COMMENT ON COLUMN "domain0006"."domain0006005" IS 'decimal';

      COMMENT ON COLUMN "domain0006"."domain0006006" IS 'enum';

      COMMENT ON COLUMN "domain0006"."domain0006007" IS 'jsonb';

      COMMENT ON COLUMN "domain0006"."domain0006008" IS 'json';

      COMMENT ON COLUMN "domain0006"."domain0006011" IS 'Array<int>'
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0006" ADD CONSTRAINT "FK_251b3195ebec824c1d68f218e4b" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0006" ADD CONSTRAINT "FK_27b309e15ccebe8a9c8198d6317" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0006" ADD CONSTRAINT "FK_b78dcbae2db27cab6d966c05b6a" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    // Insert data
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0006 (
          id,
          domain0006001,
          domain0006002,
          domain0006003,
          domain0006004,
          domain0006005,
          domain0006006,
          domain0006007,
          domain0006008,
          domain0006011
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
          '{"domain0006007": "domain0006007"}',
          '{"domain0006008": "domain0006008"}',
          '{1,2,3}'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "domain0006"
      DROP CONSTRAINT "FK_b78dcbae2db27cab6d966c05b6a"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0006"
      DROP CONSTRAINT "FK_27b309e15ccebe8a9c8198d6317"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0006"
      DROP CONSTRAINT "FK_251b3195ebec824c1d68f218e4b"
    `);
    await queryRunner.query(sql`DROP TABLE "domain0006"`);
    await queryRunner.query(sql`DROP TYPE "public"."domain0006_domain0006006_enum"`);
  }
}
