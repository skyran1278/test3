BEGIN;

INSERT INTO
  public.user (id, user001, user002)
VALUES
  ('94107a27-4c24-4912-be7b-6f4b0b462acb', 1, 1);

INSERT INTO
  public.domain1 (id, domain1001)
VALUES
  ('0bc02b9c-585e-438f-ad6e-8bc0a16cb6fb', 1);

COMMIT;
