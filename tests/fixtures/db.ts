import Database from "better-sqlite3";

export class DBFixture {
  path: string;
  instance: Database.Database;
  constructor() {
    this.path = '../backend/data/gorm.db'
    this.instance = new Database(this.path, { verbose: console.log })
  }

  deleteFrom(tableName: string) {
    try {
      this.instance.prepare(`DELETE FROM ${tableName}`).run();
      console.log(`Cleaned up: ${tableName}`);
    } catch (error) {
      console.warn(`Could not clean ${tableName}:`, (error as Error).message);
    }
  }
}