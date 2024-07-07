/*
  Warnings:

  - You are about to drop the column `creator` on the `Playlist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Playlist` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "creator",
ALTER COLUMN "thumbnail" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_name_key" ON "Playlist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
