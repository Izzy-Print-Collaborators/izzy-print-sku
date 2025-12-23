import {
  pgTable,
  varchar,
  boolean,
  uuid,
  integer,
  pgSequence,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userCodeSeq = pgSequence("user_code_seq", {
  startWith: 1,
});

export const usersTable = pgTable("users", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),

  code: integer()
    .notNull()
    .unique()
    .default(sql`nextval('user_code_seq')`),

  name: varchar({ length: 255 }).notNull().unique(),

  password: varchar({ length: 255 }).notNull(),

  admin: boolean().notNull().default(false),
});

