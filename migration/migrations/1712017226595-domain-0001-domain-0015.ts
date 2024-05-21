import { sql } from 'src/common/sql';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Domain0001Domain00151712017226595 implements MigrationInterface {
  name = 'Domain0001Domain00151712017226595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "domain0015" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0015001" integer, CONSTRAINT "PK_dc02d7db6f4f91c1d9744bad417" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0015"."domain0015001" IS 'domain0015001'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0009" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0009001" integer, CONSTRAINT "PK_e483c32c7c30e744636c5d407ea" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0009"."domain0009001" IS 'domain0009001'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0010" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0010001" integer, "domain0009Id" uuid NOT NULL, CONSTRAINT "PK_633fe903a5b0e5e79d28130d825" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0010"."domain0010001" IS 'domain0010001'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0005" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0005001" integer, CONSTRAINT "PK_4bc922c2a18f2452a6f7f480215" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0005"."domain0005001" IS 'domain0005001'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0006" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0006001" integer, "domain0005Id" uuid NOT NULL, CONSTRAINT "PK_11aa6524b5d868b3151309e4a85" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0006"."domain0006001" IS 'domain0006001'; COMMENT ON COLUMN "domain0006"."domain0005Id" IS 'domain0005Id'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0007" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0007001" integer, "domain0006Id" uuid NOT NULL, CONSTRAINT "PK_34985b7a1eb08f069f9439cd505" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0007"."domain0007001" IS 'domain0007001'; COMMENT ON COLUMN "domain0007"."domain0006Id" IS 'domain0006Id'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0001" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0001001" integer, CONSTRAINT "PK_40ca50595fa1f689cf544953ee2" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0001"."domain0001001" IS 'domain0001001'`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "user001" integer NOT NULL, "user002" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "user"."user001" IS 'user001'; COMMENT ON COLUMN "user"."user002" IS 'user002'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."domain0003_domain0003006_enum" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain0003" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0003001" boolean, "domain0003002" integer, "domain0003003" character varying(10), "domain0003004" date, "domain0003005" numeric(32,6), "domain0003006" "public"."domain0003_domain0003006_enum", "domain0003007" jsonb, "domain0003008" json, "domain0003011" integer array, CONSTRAINT "PK_2504b6403d98c82e3704c404639" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain0003"."domain0003001" IS 'boolean'; COMMENT ON COLUMN "domain0003"."domain0003002" IS 'int'; COMMENT ON COLUMN "domain0003"."domain0003003" IS 'varchar'; COMMENT ON COLUMN "domain0003"."domain0003004" IS 'date'; COMMENT ON COLUMN "domain0003"."domain0003005" IS 'decimal'; COMMENT ON COLUMN "domain0003"."domain0003006" IS 'enum'; COMMENT ON COLUMN "domain0003"."domain0003007" IS 'jsonb'; COMMENT ON COLUMN "domain0003"."domain0003008" IS 'json'; COMMENT ON COLUMN "domain0003"."domain0003011" IS 'Array<int>'`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0015" ADD CONSTRAINT "FK_bd84052d9edc900387bb142bf99" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0015" ADD CONSTRAINT "FK_86252b6f09f7bad4e9b6911bc6c" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0015" ADD CONSTRAINT "FK_1eef8e4d45ad62eb832ccd8777d" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0009" ADD CONSTRAINT "FK_416705702d6235c0779e3d66e03" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0009" ADD CONSTRAINT "FK_50023c9d8db5135c24dbd6a0ba1" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0009" ADD CONSTRAINT "FK_e2028d9ad31b3c5d1f1152f9de6" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" ADD CONSTRAINT "FK_bbb514803e8a4a9671887293e7e" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" ADD CONSTRAINT "FK_7c503eb93bfeec5225bf7bf8079" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" ADD CONSTRAINT "FK_1e1f74d412e896f97f07b33437a" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" ADD CONSTRAINT "FK_ec9f04cb2fe4d002cdb516db9f4" FOREIGN KEY ("domain0009Id") REFERENCES "domain0009"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0005" ADD CONSTRAINT "FK_c9ddd5b1a4798fc2fed78245430" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0005" ADD CONSTRAINT "FK_6b10819c9d11f334fe6d2cee02d" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0005" ADD CONSTRAINT "FK_0e6fc70653b2fbe507f65a707a7" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" ADD CONSTRAINT "FK_d68c4ff85d859fa1cbaf2af5891" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" ADD CONSTRAINT "FK_ff6fbf505b7e50f6b2440d25056" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" ADD CONSTRAINT "FK_9ccdae0aeed8a907cf4d513f2ea" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" ADD CONSTRAINT "FK_ca58a3bedba7ae56686665973b6" FOREIGN KEY ("domain0005Id") REFERENCES "domain0005"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" ADD CONSTRAINT "FK_d3b8590937060765b7a0afa0ddc" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" ADD CONSTRAINT "FK_6b67120b7d7d452ff8a489448ce" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" ADD CONSTRAINT "FK_8350a7db83f7617580ff1dc0266" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" ADD CONSTRAINT "FK_147b44a46093f074ab7face5204" FOREIGN KEY ("domain0006Id") REFERENCES "domain0006"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0001" ADD CONSTRAINT "FK_311bc4ca7bce20d08ba9f03a563" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0001" ADD CONSTRAINT "FK_7185d7adb727e4194adac95f318" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0001" ADD CONSTRAINT "FK_918ff60e49d3c0548afc61c9daf" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_a4d1f438d79344a566cfbed0777" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_9fc00fcd60b1466f08aa1b1d80d" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e5f3d1e13026597fc95060f6da0" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0003" ADD CONSTRAINT "FK_b83ca791fee574cf1c4e8eee39d" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0003" ADD CONSTRAINT "FK_9dca2dd4b221f948f1d85974168" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0003" ADD CONSTRAINT "FK_44549ae1a031d0b0af615a0e076" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

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
        public.domain0001 (id, domain0001001)
      VALUES
        ('0bc02b9c-585e-438f-ad6e-8bc0a16cb6fb', 1),
        ('1b2c3a4d-5e6f-7a8b-9c0d-1e2a3b4c5d6e', 2);
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.domain0003 (
          id,
          domain0003001,
          domain0003002,
          domain0003003,
          domain0003004,
          domain0003005,
          domain0003006,
          domain0003007,
          domain0003008,
          domain0003011
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
          '{"domain0003007": "domain0003007"}',
          '{"domain0003008": "domain0003008"}',
          '{1,2,3}'
        );
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.domain0005 (id, domain0005001)
      VALUES
        ('2a5a45dc-812b-48e4-bb56-8f3ffd3cc997', 100), -- include domain0006
        ('1f44609d-797b-4c0e-ba55-336a98c1cb6d', 200), -- include domain0006, domain0007
        ('b61421e4-52fd-445a-81b0-a5330dea38db', 300), -- for remove
        ('5d3f9c6c-5c5d-4f5e-8c5f-5d5e6f7c8d9e', 400), -- for soft remove
        ('c5c5d5e6-5f7c-4d5e-8b5a-5f7c8d9e0a1b', 500);
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0006 (id, domain0006001, "domain0005Id")
      VALUES
        (
          'aa7a24b7-f573-468d-afd6-a6ba416b2fc1',
          110,
          '2a5a45dc-812b-48e4-bb56-8f3ffd3cc997'
        ),
        (
          'ec8bcf40-f348-44f2-a32f-555657d8ea95',
          120,
          '2a5a45dc-812b-48e4-bb56-8f3ffd3cc997'
        ),
        (
          'bbe8ab43-6efd-435c-9a14-f1006d4b910d',
          210,
          '1f44609d-797b-4c0e-ba55-336a98c1cb6d'
        ),
        (
          '71c7f77d-5cef-48c7-8ee6-47b805477e77',
          220,
          '1f44609d-797b-4c0e-ba55-336a98c1cb6d'
        ),
        (
          'b4f6e6d7-7f8c-4d8e-8c9f-6d7e8f9c0d1e',
          310,
          'b61421e4-52fd-445a-81b0-a5330dea38db'
        ),
        (
          '87404530-ba10-42b3-8989-562b4a11a814',
          320,
          'b61421e4-52fd-445a-81b0-a5330dea38db'
        ),
        (
          'b7c8d9e0-a1b2-43c4-8d5e-9e0a1b2c3d4e',
          410,
          '5d3f9c6c-5c5d-4f5e-8c5f-5d5e6f7c8d9e'
        ),
        (
          '2a3b4c5d-6e7f-41a2-8b3c-4d5e6f7a8b9c',
          420,
          '5d3f9c6c-5c5d-4f5e-8c5f-5d5e6f7c8d9e'
        ),
        (
          '5e6f7c8d-9e0a-42b3-8c4d-5e6f7c8d9e0a',
          510,
          'c5c5d5e6-5f7c-4d5e-8b5a-5f7c8d9e0a1b'
        ),
        (
          '1a2b3c4d-5e6f-43a4-8b5c-6d7e8f9a0b1a',
          520,
          'c5c5d5e6-5f7c-4d5e-8b5a-5f7c8d9e0a1b'
        );
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0007 (id, domain0007001, "domain0006Id")
      VALUES
        (
          '5f1aa3b7-1e26-41bf-8606-2498c4e3ec62',
          211,
          'bbe8ab43-6efd-435c-9a14-f1006d4b910d'
        ),
        (
          '71a051bf-548d-44b8-8b6b-a7d3b5a2d8c8',
          212,
          'bbe8ab43-6efd-435c-9a14-f1006d4b910d'
        ),
        (
          '98988b0b-4306-4047-b90b-3224d628df14',
          221,
          '71c7f77d-5cef-48c7-8ee6-47b805477e77'
        ),
        (
          'a9d51155-db0c-4efe-8e67-fea2ae5017d4',
          222,
          '71c7f77d-5cef-48c7-8ee6-47b805477e77'
        );
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.domain0009 (id, domain0009001)
      VALUES
        ('0cbbc06c-95f5-4cc3-8646-5e4d27a69b33', 10),
        ('c4347881-40d0-42c2-8996-44f2827acab7', 20);
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0010 (id, domain0010001, "domain0009Id")
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
    await queryRunner.query(
      `ALTER TABLE "domain0003" DROP CONSTRAINT "FK_44549ae1a031d0b0af615a0e076"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0003" DROP CONSTRAINT "FK_9dca2dd4b221f948f1d85974168"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0003" DROP CONSTRAINT "FK_b83ca791fee574cf1c4e8eee39d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e5f3d1e13026597fc95060f6da0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_9fc00fcd60b1466f08aa1b1d80d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_a4d1f438d79344a566cfbed0777"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0001" DROP CONSTRAINT "FK_918ff60e49d3c0548afc61c9daf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0001" DROP CONSTRAINT "FK_7185d7adb727e4194adac95f318"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0001" DROP CONSTRAINT "FK_311bc4ca7bce20d08ba9f03a563"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" DROP CONSTRAINT "FK_147b44a46093f074ab7face5204"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" DROP CONSTRAINT "FK_8350a7db83f7617580ff1dc0266"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" DROP CONSTRAINT "FK_6b67120b7d7d452ff8a489448ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0007" DROP CONSTRAINT "FK_d3b8590937060765b7a0afa0ddc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" DROP CONSTRAINT "FK_ca58a3bedba7ae56686665973b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" DROP CONSTRAINT "FK_9ccdae0aeed8a907cf4d513f2ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" DROP CONSTRAINT "FK_ff6fbf505b7e50f6b2440d25056"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0006" DROP CONSTRAINT "FK_d68c4ff85d859fa1cbaf2af5891"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0005" DROP CONSTRAINT "FK_0e6fc70653b2fbe507f65a707a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0005" DROP CONSTRAINT "FK_6b10819c9d11f334fe6d2cee02d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0005" DROP CONSTRAINT "FK_c9ddd5b1a4798fc2fed78245430"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" DROP CONSTRAINT "FK_ec9f04cb2fe4d002cdb516db9f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" DROP CONSTRAINT "FK_1e1f74d412e896f97f07b33437a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" DROP CONSTRAINT "FK_7c503eb93bfeec5225bf7bf8079"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0010" DROP CONSTRAINT "FK_bbb514803e8a4a9671887293e7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0009" DROP CONSTRAINT "FK_e2028d9ad31b3c5d1f1152f9de6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0009" DROP CONSTRAINT "FK_50023c9d8db5135c24dbd6a0ba1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0009" DROP CONSTRAINT "FK_416705702d6235c0779e3d66e03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0015" DROP CONSTRAINT "FK_1eef8e4d45ad62eb832ccd8777d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0015" DROP CONSTRAINT "FK_86252b6f09f7bad4e9b6911bc6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain0015" DROP CONSTRAINT "FK_bd84052d9edc900387bb142bf99"`,
    );
    await queryRunner.query(`DROP TABLE "domain0003"`);
    await queryRunner.query(
      `DROP TYPE "public"."domain0003_domain0003006_enum"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "domain0001"`);
    await queryRunner.query(`DROP TABLE "domain0007"`);
    await queryRunner.query(`DROP TABLE "domain0006"`);
    await queryRunner.query(`DROP TABLE "domain0005"`);
    await queryRunner.query(`DROP TABLE "domain0010"`);
    await queryRunner.query(`DROP TABLE "domain0009"`);
    await queryRunner.query(`DROP TABLE "domain0015"`);
  }
}
