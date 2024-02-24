import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

// export interface Weight {
//   weight: number;
//   note: string;
// }


export  class Weight extends Model {
  static table = 'weights';

  @field('note') note!: string;
  @field('weight')weight!: number;
  @readonly @date('created_at') createdAt: any;
}
