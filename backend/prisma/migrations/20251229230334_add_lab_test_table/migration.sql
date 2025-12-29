-- CreateTable
CREATE TABLE "LabTest" (
    "id" SERIAL NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "testGroup" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "testCost" DECIMAL(18,2),
    "testPrice" DECIMAL(18,2),
    "KKCode" TEXT,

    CONSTRAINT "LabTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "Laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
