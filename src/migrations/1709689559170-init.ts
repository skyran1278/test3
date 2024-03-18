import { sql } from 'src/common/sql';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1709689559170 implements MigrationInterface {
  name = 'Init1709689559170';

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
