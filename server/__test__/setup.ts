import db from '../database/db';

const tables = ['customers', 'customer_versions', 'transactions', 'transaction_versions'];
beforeEach(async () => {
  try {
    jest.setTimeout(90000);
    jest.clearAllMocks();
    await db.migrate.latest();
    await db.raw(`SET session_replication_role = 'replica';`);
    await db.raw(`TRUNCATE TABLE ${tables.join(',')} RESTART IDENTITY CASCADE`);
    await db.seed.run();
    await db.raw(`SET session_replication_role = 'origin';`);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

afterAll(async () => {
  await db.raw(`SET session_replication_role = 'replica';`);
  await db.raw(`TRUNCATE TABLE ${tables.join(',')} RESTART IDENTITY CASCADE`);
  await db.raw(`SET session_replication_role = 'origin';`);
  db.destroy();
});
