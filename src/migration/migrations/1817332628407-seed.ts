import { MigrationInterface, QueryRunner } from 'typeorm';

import { sql } from '../../common/sql';

export class Seed1817332628407 implements MigrationInterface {
  name = 'Seed1817332628407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql`
      INSERT INTO
        public.user (id, email, "hashedPassword")
      VALUES
        ('94107a27-4c24-4912-be7b-6f4b0b462acb', 'nai@u-ran.com', '1'),
        ('f4e1b2a3-8c4a-4a1b-8c6e-3e3b0b1e2c1b', 'auth@u-ran.com', '1');
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.role (id, name)
      VALUES
        ('1b5e723d-c451-4493-8376-ac527f2f020c', 'CEO'),
        ('ed8707b6-ddf2-40d2-8b0a-5436ae46e164', 'RD');
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.permission (id, action, subject, conditions)
      VALUES
        ('bc9684a2-2cbf-48ff-8335-90f01a96b86e', 'manage', 'all', NULL),
        ('655c4f9f-3167-432c-bc43-45bd50f9621b', 'manage', 'Domain0001', '{ "createdUserId": "\${user.id}" }'),
        ('396ed16c-5827-4efe-b4b4-29c50330d72f', 'read', 'Domain0001', NULL),
        ('89548454-54ce-4c64-85ae-081bdd720adf', 'manage', 'Domain0003', '{ "createdUserId": "\${user.id}" }'),
        ('7ba74da2-105f-4c90-b66d-27af338165bd', 'read', 'Domain0003', NULL),
        ('f5c8b3d9-0f5d-4e1b-8c4a-1b8c6e3e3b0b', 'manage', 'Domain0005', '{ "createdUserId": "\${user.id}" }'),
        ('6f1ef58c-b8d2-431f-bf2a-ac1d13741b26', 'read', 'Domain0005', NULL),
        ('52357e5f-6127-41a2-8c11-3555d64353f6', 'manage', 'Domain0006', '{ "createdUserId": "\${user.id}" }'),
        ('0e98cf27-a8f5-455b-bd25-ffc359f3d046', 'read', 'Domain0006', NULL),
        ('33933832-689b-4f8f-959c-3d76c5418705', 'manage', 'Domain0007', '{ "createdUserId": "\${user.id}" }'),
        ('8d054732-09df-4300-9b33-d2769292dbd6', 'read', 'Domain0007', NULL),
        ('5057d6c4-2d40-4c3c-974d-a83873337536', 'manage', 'Domain0008', '{ "createdUserId": "\${user.id}" }'),
        ('db864487-59fb-41ab-b194-0c99e4857ff5', 'read', 'Domain0008', NULL),
        ('8908c785-bf02-4a90-bcd0-3388968e2a83', 'manage', 'Domain0009', '{ "createdUserId": "\${user.id}" }'),
        ('79d0c6ef-6421-4ae5-9622-3b1ef427f3a1', 'read', 'Domain0009', NULL),
        ('ac2067c7-c03d-4572-a401-18fa7f64282d', 'manage', 'Domain0010', '{ "createdUserId": "\${user.id}" }'),
        ('e177a0c1-968f-4c6b-afe4-de9257e05c61', 'read', 'Domain0010', NULL),
        ('ce224726-bdcf-4447-b170-5381f9ca596b', 'manage', 'Domain0011', '{ "createdUserId": "\${user.id}" }'),
        ('dd0961d5-2090-4a3f-ab73-0c2f41608c26', 'read', 'Domain0011', NULL);
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.user_roles_role ("userId", "roleId")
      VALUES
        ('94107a27-4c24-4912-be7b-6f4b0b462acb', '1b5e723d-c451-4493-8376-ac527f2f020c'),
        ('f4e1b2a3-8c4a-4a1b-8c6e-3e3b0b1e2c1b', 'ed8707b6-ddf2-40d2-8b0a-5436ae46e164');
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.role_permissions_permission ("roleId", "permissionId")
      VALUES
        ('1b5e723d-c451-4493-8376-ac527f2f020c', 'bc9684a2-2cbf-48ff-8335-90f01a96b86e'),
        ('ed8707b6-ddf2-40d2-8b0a-5436ae46e164', '655c4f9f-3167-432c-bc43-45bd50f9621b'),
        ('ed8707b6-ddf2-40d2-8b0a-5436ae46e164', '89548454-54ce-4c64-85ae-081bdd720adf'),
        ('ed8707b6-ddf2-40d2-8b0a-5436ae46e164', 'f5c8b3d9-0f5d-4e1b-8c4a-1b8c6e3e3b0b');
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
        public.domain0003 (id, domain0003001, domain0003002, domain0003003, domain0003004, domain0003005, domain0003006, domain0003007, domain0003008, domain0003011)
      VALUES
        ('1e3b75d6-e9d1-4379-861e-4dc44cfde1e5', TRUE, 1, 'varchar', '2024-03-31', 10.000000, 'ACTIVE', '{"domain0003007": "domain0003007"}', '{"domain0003008": "domain0003008"}', '{1,2,3}');
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.domain0008 (id, domain0008001)
      VALUES
        ('447d9055-317b-40e7-972a-53b8adc0c5c3', 100),
        ('3d9ba46f-8247-4982-930f-cda360c00de3', 200);
    `);

    await queryRunner.query(sql`
      INSERT INTO
        public.domain0009 (id, domain0009001, "domain0008Id")
      VALUES
        ('0cbbc06c-95f5-4cc3-8646-5e4d27a69b33', 110, '447d9055-317b-40e7-972a-53b8adc0c5c3'),
        ('c4347881-40d0-42c2-8996-44f2827acab7', 120, '447d9055-317b-40e7-972a-53b8adc0c5c3'),
        ('f1f4e4d4-4d9b-4b8a-9f0c-cda3e0c0d3e3', 210, '3d9ba46f-8247-4982-930f-cda360c00de3'),
        ('22509176-56cf-4f7c-a7b0-fe6bc4f08a9c', 220, '3d9ba46f-8247-4982-930f-cda360c00de3');
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0010 (id, domain0010001, "domain0009Id")
      VALUES
        ('281edeb4-449a-4774-be78-b49558f02634', 111, '0cbbc06c-95f5-4cc3-8646-5e4d27a69b33'),
        ('10c32da9-54d4-48ed-ad5e-fc2d06c0ba93', 112, '0cbbc06c-95f5-4cc3-8646-5e4d27a69b33'),
        ('b3f3b4d5-4e3b-4b0d-8a9b-4b4b6c1d7b9b', 121, 'c4347881-40d0-42c2-8996-44f2827acab7'),
        ('d4b1b7f4-5f8c-4b0b-8b3b-4b4b6c1d7b9b', 122, 'c4347881-40d0-42c2-8996-44f2827acab7'),
        ('dab1bb04-d764-4716-84a3-30d015388802', 211, 'f1f4e4d4-4d9b-4b8a-9f0c-cda3e0c0d3e3'),
        ('0b41d4cc-db4b-4497-9a70-d546e80f5c85', 212, 'f1f4e4d4-4d9b-4b8a-9f0c-cda3e0c0d3e3'),
        ('c4b4b6c1-d7b9-4b4b-8c1d-7b9b4b6c1d7b', 221, '22509176-56cf-4f7c-a7b0-fe6bc4f08a9c'),
        ('b7354cb6-b555-47e0-974e-df651f7f0776', 222, '22509176-56cf-4f7c-a7b0-fe6bc4f08a9c');
    `);
    await queryRunner.query(sql`
      INSERT INTO
        public.domain0021 (id, domain0021001, "parentId", mpath)
      VALUES
        ('b48bff7f-3b3f-4bdd-8236-a7c06685ed44', 10, NULL, 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.'),
        ('221a19d5-bb02-42c8-8539-24446325e958', 11, NULL, '221a19d5-bb02-42c8-8539-24446325e958.'),
        ('cf9a9657-b85f-4a25-ae0b-526a0443a23d', 12, NULL, 'cf9a9657-b85f-4a25-ae0b-526a0443a23d.'),
        ('993422bd-039a-4276-bedc-0b4a9051b35e', 20, 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.993422bd-039a-4276-bedc-0b4a9051b35e.'),
        ('46621bee-bd35-45fa-be2b-722065047ee5', 21, 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.46621bee-bd35-45fa-be2b-722065047ee5.'),
        ('181f4ac5-fcb2-4976-a25f-4e398cc0ed33', 22, 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.181f4ac5-fcb2-4976-a25f-4e398cc0ed33.'),
        ('a0898ce1-e7ea-4de3-8853-2269468bc251', 30, '993422bd-039a-4276-bedc-0b4a9051b35e', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.993422bd-039a-4276-bedc-0b4a9051b35e.a0898ce1-e7ea-4de3-8853-2269468bc251.'),
        ('3cfe69a8-bcca-4b74-b3d9-9e75b41da641', 31, '993422bd-039a-4276-bedc-0b4a9051b35e', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.993422bd-039a-4276-bedc-0b4a9051b35e.3cfe69a8-bcca-4b74-b3d9-9e75b41da641.'),
        ('b83d41e0-0a5d-4466-9db6-22b5392b4354', 32, '993422bd-039a-4276-bedc-0b4a9051b35e', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.993422bd-039a-4276-bedc-0b4a9051b35e.b83d41e0-0a5d-4466-9db6-22b5392b4354.'),
        ('aab1cae2-a27e-426e-8f31-6124698e98bd', 40, 'a0898ce1-e7ea-4de3-8853-2269468bc251', 'b48bff7f-3b3f-4bdd-8236-a7c06685ed44.993422bd-039a-4276-bedc-0b4a9051b35e.a0898ce1-e7ea-4de3-8853-2269468bc251.aab1cae2-a27e-426e-8f31-6124698e98bd.');
    `);
  }

  public async down(): Promise<void> {}
}
