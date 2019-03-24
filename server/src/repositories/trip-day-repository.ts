import { knex } from '../database/knex';
import { TripDay } from '../models/trip-day';
import { BaseRepository } from './base-repository';

export class TripDayRepository implements BaseRepository<TripDay> {
  retrieveDetail(id: number, callback: any): void {
    let tripDay: TripDay = null;
    knex('trip_day')
      .where({id})
      .then((results: TripDay[]) => {
        tripDay = results[ 0 ];
        knex('event')
          .where({trip_day_id: id})
          .then((results: Event[]) => {
            tripDay.events = results;
            callback(tripDay);
          })
          .catch((err: any) => callback(err));
      })
      .catch((err: any) => callback(err));
  }
  
  retrieve(columns: string[], whereClauses: object, callback: any): void {
    if (columns) {
      knex('trip_day')
        .columnInfo(columns)
        .where(whereClauses)
        .then((results: TripDay[]) => callback(results))
        .catch((err: any) => callback(err));
    } else {
      knex('trip_day')
        .where(whereClauses)
        .then((results: TripDay[]) => callback(results))
        .catch((err: any) => callback(err));
    }
  }
  
  create(item: TripDay, callback: any): void {
    knex('trip_day')
      .insert(item)
      .then((result: any) => callback(result))
      .catch((err: any) => callback(err));
  }
  
  update(item: TripDay, callback: any): void {
    item.updated_at = knex.fn.now();
    
    knex('trip_day')
      .where({id: item.id})
      .update(item)
      .then((result: any) => callback(result))
      .catch((err: any) => callback(err));
  }
  
  delete(id: number, callback: any): void {
    knex('trip_day')
      .where({id})
      .del()
      .then((result: any) => callback(result))
      .catch((err: any) => callback(err));
  }
}