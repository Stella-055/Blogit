-- CreateTable
CREATE TABLE "blog" (
    "id" TEXT NOT NULL,
    "blog_title" TEXT NOT NULL,
    "blog_synopsis" TEXT NOT NULL,
    "blog_content" TEXT NOT NULL,
    "ownerid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_ownerid_fkey" FOREIGN KEY ("ownerid") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
