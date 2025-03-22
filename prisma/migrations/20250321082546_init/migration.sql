/*
  Warnings:

  - The values [A_POSITIVE,A_NEGATIVE,B_POSITIVE,B_NEGATIVE,AB_POSITIVE,AB_NEGATIVE,O_POSITIVE,O_NEGATIVE] on the enum `BloodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodType_new" AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
ALTER TABLE "Student" ALTER COLUMN "bloodType" TYPE "BloodType_new" USING ("bloodType"::text::"BloodType_new");
ALTER TABLE "Teacher" ALTER COLUMN "bloodType" TYPE "BloodType_new" USING ("bloodType"::text::"BloodType_new");
ALTER TYPE "BloodType" RENAME TO "BloodType_old";
ALTER TYPE "BloodType_new" RENAME TO "BloodType";
DROP TYPE "BloodType_old";
COMMIT;
