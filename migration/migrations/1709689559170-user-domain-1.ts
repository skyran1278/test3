import { MigrationInterface, QueryRunner } from 'typeorm';

import { sql } from 'src/common/sql';

export class UserDomain11709689559170 implements MigrationInterface {
  name = 'UserDomain11709689559170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TABLE "domain1" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain1001" integer,
        CONSTRAINT "PK_fc0aa49f88c9f4ec4b79a5c11ba" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain1"."domain1001" IS 'domain1001'
    `);
    await queryRunner.query(sql`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "user001" integer NOT NULL,
        "user002" integer NOT NULL,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "user"."user001" IS 'user001';

      COMMENT ON COLUMN "user"."user002" IS 'user002'
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain1" ADD CONSTRAINT "FK_06e43f38c154f2fb12481bd81d0" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain1" ADD CONSTRAINT "FK_eed51416839377f38c988530cab" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain1" ADD CONSTRAINT "FK_96ca2ef35fe71016ae87158a0b8" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "user" ADD CONSTRAINT "FK_a4d1f438d79344a566cfbed0777" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "user" ADD CONSTRAINT "FK_9fc00fcd60b1466f08aa1b1d80d" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "user" ADD CONSTRAINT "FK_e5f3d1e13026597fc95060f6da0" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Insert data
    await queryRunner.query(sql`
      INSERT INTO
        public.user (id, user001, user002)
      VALUES
        ('94107a27-4c24-4912-be7b-6f4b0b462acb', 1, 1),
        ('f4e1b2a3-8c4a-4a1b-8c6e-3e3b0b1e2c1b', 2, 2);
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain1 (id, domain1001)
      VALUES
        ('0bc02b9c-585e-438f-ad6e-8bc0a16cb6fb', 1),
        ('1b2c3a4d-5e6f-7a8b-9c0d-1e2a3b4c5d6e', 2);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "user"
      DROP CONSTRAINT "FK_e5f3d1e13026597fc95060f6da0"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "user"
      DROP CONSTRAINT "FK_9fc00fcd60b1466f08aa1b1d80d"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "user"
      DROP CONSTRAINT "FK_a4d1f438d79344a566cfbed0777"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain1"
      DROP CONSTRAINT "FK_96ca2ef35fe71016ae87158a0b8"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain1"
      DROP CONSTRAINT "FK_eed51416839377f38c988530cab"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain1"
      DROP CONSTRAINT "FK_06e43f38c154f2fb12481bd81d0"
    `);
    await queryRunner.query(sql`DROP TABLE "user"`);
    await queryRunner.query(sql`DROP TABLE "domain1"`);
  }
}
