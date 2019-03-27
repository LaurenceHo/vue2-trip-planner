import { knex } from './knex';

export const schema = () => {
  knex.schema.hasTable('user').then((exists: boolean) => {
    if (!exists) {
      knex.schema.createTable('user', (table: any) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      }).catch((err: any) => console.error(err));
    }
  });
  
  knex.schema.hasTable('category').then((exists: boolean) => {
    if (!exists) {
      knex.schema.createTable('category', (table: any) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      }).catch((err: any) => console.error(err));
    }
  });
  
  knex.schema.hasTable('trip').then((exists: boolean) => {
    if (!exists) {
      knex.schema.createTable('trip', (table: any) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').notNullable();
        table.string('name');
        table.string('destination').notNullable();
        table.boolean('archived').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('user_id').references('id').inTable('user');
      }).catch((err: any) => console.error(err));
    }
  });
  
  knex.schema.hasTable('trip_day').then((exists: boolean) => {
    if (!exists) {
      knex.schema.createTable('trip_day', (table: any) => {
        table.increments('id').primary();
        table.integer('trip_id').unsigned().notNullable();
        table.date('trip_date').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('trip_id').references('id').inTable('trip');
      }).catch((err: any) => console.error(err));
    }
  });
  
  knex.schema.hasTable('event').then((exists: boolean) => {
    if (!exists) {
      knex.schema.createTable('event', (table: any) => {
        table.increments('id').primary();
        table.integer('trip_day_id').unsigned();
        table.integer('category_id').unsigned().notNullable();
        table.time('start_time');
        table.time('end_time');
        table.string('title');
        table.string('start_location');
        table.string('end_location');
        table.text('note');
        table.text('tag');
        table.integer('cost');
        table.string('currency');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.foreign('trip_day_id').references('id').inTable('trip_day');
        table.foreign('category_id').references('id').inTable('category');
      }).catch((err: any) => console.error(err));
    }
  });
};