import { MigrationInterface, QueryRunner } from "typeorm";

export class AuditLog1716285292951 implements MigrationInterface {
    name = 'AuditLog1716285292951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."audit_log_action_enum" AS ENUM('INSERT', 'UPDATE', 'REMOVE', 'SOFT_REMOVE', 'RECOVER')`);
        await queryRunner.query(`CREATE TABLE "audit_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "requestId" uuid NOT NULL, "userId" uuid NOT NULL, "input" text NOT NULL, "tableName" character varying(255) NOT NULL, "action" "public"."audit_log_action_enum" NOT NULL, "entityId" uuid NOT NULL, "entityDetail" json NOT NULL, CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "audit_log" ADD CONSTRAINT "FK_2621409ebc295c5da7ff3e41396" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audit_log" DROP CONSTRAINT "FK_2621409ebc295c5da7ff3e41396"`);
        await queryRunner.query(`DROP TABLE "audit_log"`);
        await queryRunner.query(`DROP TYPE "public"."audit_log_action_enum"`);
    }

}
