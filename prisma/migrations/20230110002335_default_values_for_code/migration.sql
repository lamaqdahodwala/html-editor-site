-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "html" TEXT NOT NULL DEFAULT '',
    "css" TEXT NOT NULL DEFAULT '',
    "js" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Pen_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pen" ("css", "html", "id", "js", "ownerId", "title") SELECT "css", "html", "id", "js", "ownerId", "title" FROM "Pen";
DROP TABLE "Pen";
ALTER TABLE "new_Pen" RENAME TO "Pen";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
