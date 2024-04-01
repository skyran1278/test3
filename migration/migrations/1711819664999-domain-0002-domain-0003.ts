import { MigrationInterface, QueryRunner } from 'typeorm';

import { sql } from 'src/common/sql';

export class Domain0002Domain00031711819664999 implements MigrationInterface {
  name = 'Domain0002Domain00031711819664999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      CREATE TABLE "domain0002" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain0002001" integer,
        CONSTRAINT "PK_62c76f3a9c016504bca07e761f6" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain0002"."domain0002001" IS 'domain0002001'
    `);
    await queryRunner.query(sql`
      CREATE TABLE "domain0003" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4 (),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now (),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now (),
        "deletedAt" TIMESTAMP,
        "createdUserId" uuid,
        "updatedUserId" uuid,
        "deletedUserId" uuid,
        "domain0003001" integer,
        "domain0002Id" uuid NOT NULL,
        CONSTRAINT "PK_6bf295d330c3f913852003de54f" PRIMARY KEY ("id")
      );

      COMMENT ON COLUMN "domain0003"."domain0003001" IS 'domain0003001'
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0002" ADD CONSTRAINT "FK_8624a4abbd235b6bf8a94315efb" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0002" ADD CONSTRAINT "FK_6539079050f1c4a7a762bd5a2cc" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0002" ADD CONSTRAINT "FK_4968d0ec4667b16612bd7da1cc7" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003" ADD CONSTRAINT "FK_0ab294f171749681426048a7885" FOREIGN KEY ("createdUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003" ADD CONSTRAINT "FK_e988d745f75146e99f3a4d648ae" FOREIGN KEY ("updatedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003" ADD CONSTRAINT "FK_27e69e7b62bb1ef6f7105f2de83" FOREIGN KEY ("deletedUserId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003" ADD CONSTRAINT "FK_5d756bbfcf3f2a4f9ec1af7803c" FOREIGN KEY ("domain0002Id") REFERENCES "domain0002" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);

    // Insert data
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0002 (id, domain0002001)
      VALUES
        ('0cbbc06c-95f5-4cc3-8646-5e4d27a69b33', 10),
        ('c4347881-40d0-42c2-8996-44f2827acab7', 20);
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0003 (id, domain0003001, "domain0002Id")
      VALUES
        (
          '281edeb4-449a-4774-be78-b49558f02634',
          11,
          '0cbbc06c-95f5-4cc3-8646-5e4d27a69b33'
        ),
        (
          '10c32da9-54d4-48ed-ad5e-fc2d06c0ba93',
          12,
          '0cbbc06c-95f5-4cc3-8646-5e4d27a69b33'
        ),
        (
          'b3f3b4d5-4e3b-4b0d-8a9b-4b4b6c1d7b9b',
          21,
          'c4347881-40d0-42c2-8996-44f2827acab7'
        ),
        (
          'd4b1b7f4-5f8c-4b0b-8b3b-4b4b6c1d7b9b',
          22,
          'c4347881-40d0-42c2-8996-44f2827acab7'
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      ALTER TABLE "domain0003"
      DROP CONSTRAINT "FK_5d756bbfcf3f2a4f9ec1af7803c"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003"
      DROP CONSTRAINT "FK_27e69e7b62bb1ef6f7105f2de83"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003"
      DROP CONSTRAINT "FK_e988d745f75146e99f3a4d648ae"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0003"
      DROP CONSTRAINT "FK_0ab294f171749681426048a7885"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0002"
      DROP CONSTRAINT "FK_4968d0ec4667b16612bd7da1cc7"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0002"
      DROP CONSTRAINT "FK_6539079050f1c4a7a762bd5a2cc"
    `);
    await queryRunner.query(sql`
      ALTER TABLE "domain0002"
      DROP CONSTRAINT "FK_8624a4abbd235b6bf8a94315efb"
    `);
    await queryRunner.query(sql`DROP TABLE "domain0003"`);
    await queryRunner.query(sql`DROP TABLE "domain0002"`);
  }
}
