import {database} from './database';

export type Weight = {
  createdAt?: Date;
  weight: string | number;
  note: string | undefined;
};

export const weights = database.get('weights');

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

export const delById = async (id) => {
  try {
    await database.write(async () => {
      const recordToDelete = await weights.find(id);
      console.log(recordToDelete);
      if (recordToDelete) {
            await recordToDelete.destroyPermanently(); 
        console.log('single record deleted successfully');
      } else {
        console.log('No records found to delete');
      }
    });
  } catch (error) {
    console.error('Error deleting records:', error);
  }
};

export const update = async (id) => {
  try {
    await database.write(async () => {
      const recordToUpdate = await database.get('weights').find(id);
      console.log(recordToUpdate);
      await recordToUpdate.update(() => {
        recordToUpdate.note = 'note is changed';
      });
    });
  } catch (error) {
    console.error('Error in update:', error);
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
