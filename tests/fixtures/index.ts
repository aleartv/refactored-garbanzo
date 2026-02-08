import { test as baseTest } from '@playwright/test';
import Database from 'better-sqlite3';

export const test = baseTest.extend<{
  db: Database.Database;
}>({
  db: async ({ }, use) => {
    const dbInstance = new Database('../backend/data/gorm.db', { verbose: console.log });
    await use(dbInstance)
    dbInstance.close()    
  },
});

export { expect } from '@playwright/test';