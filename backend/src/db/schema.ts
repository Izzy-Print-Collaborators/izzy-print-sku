import {
  pgTable,
  varchar,
  boolean,
  uuid,
  integer,
  pgSequence,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";

export const userCodeSeq = pgSequence("user_code_seq", {
  startWith: 1,
});

export const userRoleEnum = pgEnum("user_role", [
"user",
"admin",
"moderator",
]);

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

  role: userRoleEnum("role")
    .notNull()
    .default("user"),
});

