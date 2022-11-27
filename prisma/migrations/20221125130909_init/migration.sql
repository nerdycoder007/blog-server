-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "blogTitle" TEXT NOT NULL,
    "blogContent" TEXT NOT NULL,
    "blogImage" TEXT NOT NULL,
    "blogUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadtedAt" TEXT NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_blogUserId_fkey" FOREIGN KEY ("blogUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
