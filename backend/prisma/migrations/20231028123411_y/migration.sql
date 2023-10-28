-- DropIndex
DROP INDEX "User_intra_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "intra_id" SET DEFAULT 'default_value_here';
