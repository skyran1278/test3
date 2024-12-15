import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1729582334218 implements MigrationInterface {
  name = 'Schema1729582334218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."permission_action_enum" AS ENUM('manage', 'create', 'read', 'update', 'delete')`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "action" "public"."permission_action_enum" NOT NULL, "subject" character varying(50) NOT NULL, "conditions" jsonb, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "name" character varying(20) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")); COMMENT ON COLUMN "role"."name" IS '角色名稱'`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "email" character varying(255) NOT NULL, "hashedPassword" character varying(255) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain24" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain2401" integer, CONSTRAINT "PK_0dbef6a3fa0601bdf27cdd2a29c" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain24"."domain2401" IS 'domain2401'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain25" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain2501" integer, CONSTRAINT "PK_9a3b1cbbdbd37416e5f4782d796" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain25"."domain2501" IS 'domain2501'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain21" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain2101" integer, "parentId" uuid, "mpath" character varying DEFAULT '', CONSTRAINT "PK_80653543e4fa454aacc20f53467" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain21"."domain2101" IS 'domain2101'; COMMENT ON COLUMN "domain21"."parentId" IS 'parent ID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain15" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain1501" integer, CONSTRAINT "PK_dc02d7db6f4f91c1d9744bad417" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain15"."domain1501" IS 'domain1501'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain08" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0801" integer, CONSTRAINT "PK_e52a5bac3f8cd885e2496f980ec" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain08"."domain0801" IS 'domain0801'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain09" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain08Id" uuid NOT NULL, "domain0901" integer, CONSTRAINT "PK_e483c32c7c30e744636c5d407ea" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain09"."domain0901" IS 'domain0901'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain10" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain09Id" uuid NOT NULL, "domain1001" integer, CONSTRAINT "PK_633fe903a5b0e5e79d28130d825" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain10"."domain1001" IS 'domain1001'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."domain03_domain0306_enum" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain03" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0301" boolean, "domain0302" integer, "domain0303" character varying(10), "domain0304" date, "domain0305" numeric(32,6), "domain0306" "public"."domain03_domain0306_enum", "domain0307" jsonb, "domain0308" json, "domain0311" integer array, "domain0312" TIMESTAMP, "domain0313" TIMESTAMP WITH TIME ZONE, "domain0314" TIMESTAMP, CONSTRAINT "PK_2504b6403d98c82e3704c404639" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain03"."domain0301" IS 'boolean'; COMMENT ON COLUMN "domain03"."domain0302" IS 'int'; COMMENT ON COLUMN "domain03"."domain0303" IS 'varchar'; COMMENT ON COLUMN "domain03"."domain0304" IS 'date'; COMMENT ON COLUMN "domain03"."domain0305" IS 'decimal'; COMMENT ON COLUMN "domain03"."domain0306" IS 'enum'; COMMENT ON COLUMN "domain03"."domain0307" IS 'jsonb'; COMMENT ON COLUMN "domain03"."domain0308" IS 'json'; COMMENT ON COLUMN "domain03"."domain0311" IS 'Array<int>'; COMMENT ON COLUMN "domain03"."domain0312" IS 'timestamp'; COMMENT ON COLUMN "domain03"."domain0313" IS 'timestamp with time zone'; COMMENT ON COLUMN "domain03"."domain0314" IS 'timestamp without time zone (same as timestamp)'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain01" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain0101" integer, CONSTRAINT "PK_40ca50595fa1f689cf544953ee2" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain01"."domain0101" IS 'domain0101'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."audit_log_action_enum" AS ENUM('INSERT', 'UPDATE', 'REMOVE', 'SOFT_REMOVE', 'RECOVER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "requestId" character varying(36) NOT NULL, "userId" uuid NOT NULL, "input" text NOT NULL, "action" "public"."audit_log_action_enum" NOT NULL, "tableName" character varying(255) NOT NULL, "entityId" uuid NOT NULL, "previousEntity" json NOT NULL, "newEntity" json NOT NULL, CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions_permission" ("roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_b817d7eca3b85f22130861259dd" PRIMARY KEY ("roleId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b36cb2e04bc353ca4ede00d87b" ON "role_permissions_permission" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfbc9e263d4cea6d7a8c9eb3ad" ON "role_permissions_permission" ("permissionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "domain24_domain25s_domain25" ("domain24Id" uuid NOT NULL, "domain25Id" uuid NOT NULL, CONSTRAINT "PK_55eec2df182e6762cd15432db64" PRIMARY KEY ("domain24Id", "domain25Id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_734779f00ef4c0020b8864a212" ON "domain24_domain25s_domain25" ("domain24Id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9c345e943397192cf9bfab163a" ON "domain24_domain25s_domain25" ("domain25Id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_bb9d0bd17dba2b768af31e45d5c" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_5362a51b111b051fc37fe71b00e" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_a36c5f2253ec62af3c46e164074" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_22d12c9c6292d64f3b885ff1bc1" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_d4fc819f6c1f405e264ce71c7b8" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "FK_e47dcbee25161f311813ec2d389" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "domain24" ADD CONSTRAINT "FK_85160667d17e012f47f3bf05bf1" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24" ADD CONSTRAINT "FK_c90d61b8d3cd7a79fb79a492269" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24" ADD CONSTRAINT "FK_5197b3bc797ea37d4a7eadc396f" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain25" ADD CONSTRAINT "FK_b7a55aa69fc65396d3f86ebee59" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain25" ADD CONSTRAINT "FK_290e83ad65bd13a7ac1badb9fbd" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain25" ADD CONSTRAINT "FK_c69d5fdf5b7a0c7cdcf721efbb1" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" ADD CONSTRAINT "FK_e783852372fdf72b9ad6051cd88" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" ADD CONSTRAINT "FK_35d50864d9ea53e19e42cb544d0" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" ADD CONSTRAINT "FK_8519ab43048c200e8e1cd157167" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" ADD CONSTRAINT "FK_23587b34fe7e64b10f4684e6db8" FOREIGN KEY ("parentId") REFERENCES "domain21"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain15" ADD CONSTRAINT "FK_bd84052d9edc900387bb142bf99" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain15" ADD CONSTRAINT "FK_86252b6f09f7bad4e9b6911bc6c" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain15" ADD CONSTRAINT "FK_1eef8e4d45ad62eb832ccd8777d" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain08" ADD CONSTRAINT "FK_034339afe30374f2e009b5e485f" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain08" ADD CONSTRAINT "FK_95c1a239d8d659dfb8784831469" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain08" ADD CONSTRAINT "FK_b7580533f7b88e76c077e58579c" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" ADD CONSTRAINT "FK_416705702d6235c0779e3d66e03" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" ADD CONSTRAINT "FK_50023c9d8db5135c24dbd6a0ba1" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" ADD CONSTRAINT "FK_e2028d9ad31b3c5d1f1152f9de6" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" ADD CONSTRAINT "FK_d30935eb5f635295e399c3fb636" FOREIGN KEY ("domain08Id") REFERENCES "domain08"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" ADD CONSTRAINT "FK_bbb514803e8a4a9671887293e7e" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" ADD CONSTRAINT "FK_7c503eb93bfeec5225bf7bf8079" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" ADD CONSTRAINT "FK_1e1f74d412e896f97f07b33437a" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" ADD CONSTRAINT "FK_ec9f04cb2fe4d002cdb516db9f4" FOREIGN KEY ("domain09Id") REFERENCES "domain09"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain03" ADD CONSTRAINT "FK_b83ca791fee574cf1c4e8eee39d" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain03" ADD CONSTRAINT "FK_9dca2dd4b221f948f1d85974168" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain03" ADD CONSTRAINT "FK_44549ae1a031d0b0af615a0e076" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain01" ADD CONSTRAINT "FK_311bc4ca7bce20d08ba9f03a563" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain01" ADD CONSTRAINT "FK_7185d7adb727e4194adac95f318" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain01" ADD CONSTRAINT "FK_918ff60e49d3c0548afc61c9daf" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_log" ADD CONSTRAINT "FK_2621409ebc295c5da7ff3e41396" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permission" ADD CONSTRAINT "FK_b36cb2e04bc353ca4ede00d87b9" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permission" ADD CONSTRAINT "FK_bfbc9e263d4cea6d7a8c9eb3ad2" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24_domain25s_domain25" ADD CONSTRAINT "FK_734779f00ef4c0020b8864a2120" FOREIGN KEY ("domain24Id") REFERENCES "domain24"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24_domain25s_domain25" ADD CONSTRAINT "FK_9c345e943397192cf9bfab163a0" FOREIGN KEY ("domain25Id") REFERENCES "domain25"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "domain24_domain25s_domain25" DROP CONSTRAINT "FK_9c345e943397192cf9bfab163a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24_domain25s_domain25" DROP CONSTRAINT "FK_734779f00ef4c0020b8864a2120"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_bfbc9e263d4cea6d7a8c9eb3ad2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_b36cb2e04bc353ca4ede00d87b9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_log" DROP CONSTRAINT "FK_2621409ebc295c5da7ff3e41396"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain01" DROP CONSTRAINT "FK_918ff60e49d3c0548afc61c9daf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain01" DROP CONSTRAINT "FK_7185d7adb727e4194adac95f318"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain01" DROP CONSTRAINT "FK_311bc4ca7bce20d08ba9f03a563"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain03" DROP CONSTRAINT "FK_44549ae1a031d0b0af615a0e076"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain03" DROP CONSTRAINT "FK_9dca2dd4b221f948f1d85974168"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain03" DROP CONSTRAINT "FK_b83ca791fee574cf1c4e8eee39d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" DROP CONSTRAINT "FK_ec9f04cb2fe4d002cdb516db9f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" DROP CONSTRAINT "FK_1e1f74d412e896f97f07b33437a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" DROP CONSTRAINT "FK_7c503eb93bfeec5225bf7bf8079"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain10" DROP CONSTRAINT "FK_bbb514803e8a4a9671887293e7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" DROP CONSTRAINT "FK_d30935eb5f635295e399c3fb636"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" DROP CONSTRAINT "FK_e2028d9ad31b3c5d1f1152f9de6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" DROP CONSTRAINT "FK_50023c9d8db5135c24dbd6a0ba1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain09" DROP CONSTRAINT "FK_416705702d6235c0779e3d66e03"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain08" DROP CONSTRAINT "FK_b7580533f7b88e76c077e58579c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain08" DROP CONSTRAINT "FK_95c1a239d8d659dfb8784831469"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain08" DROP CONSTRAINT "FK_034339afe30374f2e009b5e485f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain15" DROP CONSTRAINT "FK_1eef8e4d45ad62eb832ccd8777d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain15" DROP CONSTRAINT "FK_86252b6f09f7bad4e9b6911bc6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain15" DROP CONSTRAINT "FK_bd84052d9edc900387bb142bf99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" DROP CONSTRAINT "FK_23587b34fe7e64b10f4684e6db8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" DROP CONSTRAINT "FK_8519ab43048c200e8e1cd157167"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" DROP CONSTRAINT "FK_35d50864d9ea53e19e42cb544d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain21" DROP CONSTRAINT "FK_e783852372fdf72b9ad6051cd88"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain25" DROP CONSTRAINT "FK_c69d5fdf5b7a0c7cdcf721efbb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain25" DROP CONSTRAINT "FK_290e83ad65bd13a7ac1badb9fbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain25" DROP CONSTRAINT "FK_b7a55aa69fc65396d3f86ebee59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24" DROP CONSTRAINT "FK_5197b3bc797ea37d4a7eadc396f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24" DROP CONSTRAINT "FK_c90d61b8d3cd7a79fb79a492269"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain24" DROP CONSTRAINT "FK_85160667d17e012f47f3bf05bf1"`,
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
      `ALTER TABLE "role" DROP CONSTRAINT "FK_e47dcbee25161f311813ec2d389"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_d4fc819f6c1f405e264ce71c7b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "FK_22d12c9c6292d64f3b885ff1bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_a36c5f2253ec62af3c46e164074"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_5362a51b111b051fc37fe71b00e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_bb9d0bd17dba2b768af31e45d5c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9c345e943397192cf9bfab163a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_734779f00ef4c0020b8864a212"`,
    );
    await queryRunner.query(`DROP TABLE "domain24_domain25s_domain25"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfbc9e263d4cea6d7a8c9eb3ad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b36cb2e04bc353ca4ede00d87b"`,
    );
    await queryRunner.query(`DROP TABLE "role_permissions_permission"`);
    await queryRunner.query(`DROP TABLE "audit_log"`);
    await queryRunner.query(`DROP TYPE "public"."audit_log_action_enum"`);
    await queryRunner.query(`DROP TABLE "domain01"`);
    await queryRunner.query(`DROP TABLE "domain03"`);
    await queryRunner.query(`DROP TYPE "public"."domain03_domain0306_enum"`);
    await queryRunner.query(`DROP TABLE "domain10"`);
    await queryRunner.query(`DROP TABLE "domain09"`);
    await queryRunner.query(`DROP TABLE "domain08"`);
    await queryRunner.query(`DROP TABLE "domain15"`);
    await queryRunner.query(`DROP TABLE "domain21"`);
    await queryRunner.query(`DROP TABLE "domain25"`);
    await queryRunner.query(`DROP TABLE "domain24"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TYPE "public"."permission_action_enum"`);
  }
}
