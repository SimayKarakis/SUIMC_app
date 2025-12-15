/*
  Warnings:

  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailList` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `recycle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - Added the required column `email1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userLevel` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserLevel" AS ENUM ('LAB_SPECIALIST', 'LAB_COORDINATOR', 'LAB_LEADER', 'ADMIN', 'INTERNAL_CUSTOMER', 'EXTERNAL_CUSTOMER');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('INDIVIDUAL', 'PUBLIC_INSTITUTION', 'PRIVATE_INSTITUTION', 'UNIVERSITY', 'OTHER');

-- CreateEnum
CREATE TYPE "ReservationPriority" AS ENUM ('LOW', 'NORMAL', 'URGENT');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active",
DROP COLUMN "emailList",
DROP COLUMN "name",
DROP COLUMN "recycle",
DROP COLUMN "surname",
DROP COLUMN "type",
ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "email1" TEXT NOT NULL,
ADD COLUMN     "email2" TEXT,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastname" TEXT NOT NULL,
DROP COLUMN "userLevel",
ADD COLUMN     "userLevel" "UserLevel" NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "website" TEXT,
    "industry" TEXT,
    "companyType" "CompanyType" NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ProjectCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laboratory" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Laboratory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabPersonnel" (
    "id" SERIAL NOT NULL,
    "laboratoryId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LabPersonnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serialNo" TEXT,
    "certificateInfo" TEXT,
    "suCode" TEXT,
    "ktmmCode" TEXT,
    "laboratoryId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT,
    "title" TEXT,
    "code" TEXT,
    "requestNo" TEXT,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "total" DECIMAL(18,2),
    "orderIndex" INTEGER,
    "barcode" TEXT,
    "requestId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sampleId" INTEGER NOT NULL,

    CONSTRAINT "ServiceTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "projectCodeId" INTEGER,
    "requestId" INTEGER NOT NULL,
    "priority" "ReservationPriority" NOT NULL DEFAULT 'NORMAL',
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "serviceBarcode" TEXT,
    "offerNumber" TEXT,
    "serviceTestId" INTEGER NOT NULL,
    "deviceId" INTEGER,
    "personnelId" INTEGER,
    "notes" TEXT,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCode_code_key" ON "ProjectCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Laboratory_code_key" ON "Laboratory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LabPersonnel_laboratoryId_userId_key" ON "LabPersonnel"("laboratoryId", "userId");

-- CreateIndex
CREATE INDEX "Reservation_requestId_idx" ON "Reservation"("requestId");

-- CreateIndex
CREATE INDEX "Reservation_customerId_idx" ON "Reservation"("customerId");

-- CreateIndex
CREATE INDEX "Reservation_serviceTestId_idx" ON "Reservation"("serviceTestId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCode" ADD CONSTRAINT "ProjectCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabPersonnel" ADD CONSTRAINT "LabPersonnel_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "Laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabPersonnel" ADD CONSTRAINT "LabPersonnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "Laboratory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTest" ADD CONSTRAINT "ServiceTest_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_projectCodeId_fkey" FOREIGN KEY ("projectCodeId") REFERENCES "ProjectCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_serviceTestId_fkey" FOREIGN KEY ("serviceTestId") REFERENCES "ServiceTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
