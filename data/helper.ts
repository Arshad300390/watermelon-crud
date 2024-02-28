import {database} from './database';

export type Weight = {
  createdAt?: Date;
  weight: string | number;
  note: string | undefined;
};

export const weights = database.get('weights');
export const LastWeights = database.get('weights').query().fetch();

export const observeWeights = () => weights.query().observe();

export const deleteAll = async () => {
  try {
    await database.write(async () => {
      const recordsToDelete = await weights.query().fetch();
      if (recordsToDelete.length > 0) {
          // Start a database action
          for (const record of recordsToDelete) {
            await record.destroyPermanently(); // Call destroyPermanently inside the database action
          }
        console.log('Records deleted successfully');
      } else {
        console.log('No records found to delete');
      }
    });
  } catch (error) {
    console.error('Error deleting records:', error);
  }
};

export const saveWeight = async ({weight, note}: Weight) => {
  await database.write(async () => {
    await weights.create(entry => {
      entry.weight = Number(weight);
      entry.note = note;
    });
  });
};
