import { MigrationInterface, QueryRunner } from 'typeorm';

import { sql } from 'src/common/sql';

export class Domain4Domain51711863163892 implements MigrationInterface {
  name = 'Domain4Domain51711863163892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TABLE "domain4" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain4001" integer,
        CONSTRAINT "PK_ce105acccdd20ac3160a2cddd08" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain4"."domain4001" IS 'domain4001'
    `);
    await queryRunner.query(sql`
      CREATE TABLE "domain5" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain5001" integer,
        "domain4Id" uuid NOT NULL,
        CONSTRAINT "PK_3d504d52ba2c8618c02ecb689b1" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain5"."domain5001" IS 'domain5001';

      COMMENT ON COLUMN "domain5"."domain4Id" IS 'domain4Id'
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain4" ADD CONSTRAINT "FK_85aebfdad8aa3ca260e5c4801dd" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain4" ADD CONSTRAINT "FK_a989046685756477883d9581fba" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain4" ADD CONSTRAINT "FK_321d733493abda1e5e129a8055b" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5" ADD CONSTRAINT "FK_b6ce486dfdfa471b44a3159539e" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5" ADD CONSTRAINT "FK_647fcd0942434b0363951356129" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5" ADD CONSTRAINT "FK_94e1db4b9a3ca277d62aba7010e" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5" ADD CONSTRAINT "FK_f8e5c27b5893020c4ac03dba351" FOREIGN KEY ("domain4Id") REFERENCES "domain4" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    //
    // Insert data
    await queryRunner.query(sql`
      INSERT INTO
        public.domain4 (id, domain4001)
      VALUES
        ('2a5a45dc-812b-48e4-bb56-8f3ffd3cc997', 10),
        ('1f44609d-797b-4c0e-ba55-336a98c1cb6d', 20);
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain5 (id, domain5001, "domain4Id")
      VALUES
        (
          'aa7a24b7-f573-468d-afd6-a6ba416b2fc1',
          11,
          '2a5a45dc-812b-48e4-bb56-8f3ffd3cc997'
        ),
        (
          'ec8bcf40-f348-44f2-a32f-555657d8ea95',
          12,
          '2a5a45dc-812b-48e4-bb56-8f3ffd3cc997'
        ),
        (
          'bbe8ab43-6efd-435c-9a14-f1006d4b910d',
          21,
          '1f44609d-797b-4c0e-ba55-336a98c1cb6d'
        ),
        (
          '71c7f77d-5cef-48c7-8ee6-47b805477e77',
          22,
          '1f44609d-797b-4c0e-ba55-336a98c1cb6d'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "domain5"
      DROP CONSTRAINT "FK_f8e5c27b5893020c4ac03dba351"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5"
      DROP CONSTRAINT "FK_94e1db4b9a3ca277d62aba7010e"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5"
      DROP CONSTRAINT "FK_647fcd0942434b0363951356129"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain5"
      DROP CONSTRAINT "FK_b6ce486dfdfa471b44a3159539e"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain4"
      DROP CONSTRAINT "FK_321d733493abda1e5e129a8055b"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain4"
      DROP CONSTRAINT "FK_a989046685756477883d9581fba"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain4"
      DROP CONSTRAINT "FK_85aebfdad8aa3ca260e5c4801dd"
    `);
    await queryRunner.query(sql`DROP TABLE "domain5"`);
    await queryRunner.query(sql`DROP TABLE "domain4"`);
  }
}
