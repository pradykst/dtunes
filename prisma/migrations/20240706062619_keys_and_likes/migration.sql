-- DropIndex
DROP INDEX "User_username_password_key";

-- CreateTable
CREATE TABLE "UserContent" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN,
    "userId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "UserContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserContent" ADD CONSTRAINT "UserContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContent" ADD CONSTRAINT "UserContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
