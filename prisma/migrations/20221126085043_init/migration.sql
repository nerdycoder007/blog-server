-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "blogsId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_blogsId_fkey" FOREIGN KEY ("blogsId") REFERENCES "Blogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
