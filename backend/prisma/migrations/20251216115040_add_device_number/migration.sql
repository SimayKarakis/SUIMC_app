/*
  Warnings:

  - A unique constraint covering the columns `[deviceNumber]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "deviceNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceNumber_key" ON "Device"("deviceNumber");
