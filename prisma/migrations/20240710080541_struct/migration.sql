/*
  Warnings:

  - You are about to drop the column `playlistId` on the `Content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_playlistId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "playlistId";

-- AlterTable
ALTER TABLE "UserContent" ADD COLUMN     "playlistId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserContent" ADD CONSTRAINT "UserContent_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
