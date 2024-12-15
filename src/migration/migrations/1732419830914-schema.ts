import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schema1732419830914 implements MigrationInterface {
  name = 'Schema1732419830914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "domain22" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "createdUserId" uuid, "updatedUserId" uuid, "deletedUserId" uuid, "domain2201" integer, "parentId" uuid, CONSTRAINT "PK_68128114327922d0f8eb204f4f4" PRIMARY KEY ("id")); COMMENT ON COLUMN "domain22"."domain2201" IS 'domain2201'; COMMENT ON COLUMN "domain22"."parentId" IS 'parent ID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "domain22_closure" ("id_ancestor" uuid NOT NULL, "id_descendant" uuid NOT NULL, CONSTRAINT "PK_edfbfc77bd89a99889311a1682d" PRIMARY KEY ("id_ancestor", "id_descendant"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8781d031713cc622b82933cbb7" ON "domain22_closure" ("id_ancestor") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8d67fc559dffa91a7b7ea561e7" ON "domain22_closure" ("id_descendant") `,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" ADD CONSTRAINT "FK_a951119f6388b1727c6e76f5329" FOREIGN KEY ("createdUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" ADD CONSTRAINT "FK_fd183893aa739c2451664a8c784" FOREIGN KEY ("updatedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" ADD CONSTRAINT "FK_1003d003152b22c0cfd20231715" FOREIGN KEY ("deletedUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" ADD CONSTRAINT "FK_f1c1384fe7a6ecb3e9c5a5f70aa" FOREIGN KEY ("parentId") REFERENCES "domain22"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22_closure" ADD CONSTRAINT "FK_8781d031713cc622b82933cbb73" FOREIGN KEY ("id_ancestor") REFERENCES "domain22"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22_closure" ADD CONSTRAINT "FK_8d67fc559dffa91a7b7ea561e72" FOREIGN KEY ("id_descendant") REFERENCES "domain22"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "domain22_closure" DROP CONSTRAINT "FK_8d67fc559dffa91a7b7ea561e72"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22_closure" DROP CONSTRAINT "FK_8781d031713cc622b82933cbb73"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" DROP CONSTRAINT "FK_f1c1384fe7a6ecb3e9c5a5f70aa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" DROP CONSTRAINT "FK_1003d003152b22c0cfd20231715"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" DROP CONSTRAINT "FK_fd183893aa739c2451664a8c784"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain22" DROP CONSTRAINT "FK_a951119f6388b1727c6e76f5329"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8d67fc559dffa91a7b7ea561e7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8781d031713cc622b82933cbb7"`,
    );
    await queryRunner.query(`DROP TABLE "domain22_closure"`);
    await queryRunner.query(`DROP TABLE "domain22"`);
  }
}
