-- DropForeignKey
ALTER TABLE "menus" DROP CONSTRAINT "menus_diningLocationId_fkey";

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_diningLocationId_fkey" FOREIGN KEY ("diningLocationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
