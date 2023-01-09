/*
  Warnings:

  - Added the required column `css` to the `Pen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `html` to the `Pen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `js` to the `Pen` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "js" TEXT NOT NULL,
    CONSTRAINT "Pen_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pen" ("id", "ownerId") SELECT "id", "ownerId" FROM "Pen";
DROP TABLE "Pen";
ALTER TABLE "new_Pen" RENAME TO "Pen";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
