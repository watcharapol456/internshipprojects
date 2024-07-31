import {
    boolean,
    pgTable,
    text,
    serial,
    varchar,
  } from "drizzle-orm/pg-core"

export const blog = pgTable("blogs",{
    id: serial('id').primaryKey(),
    title: varchar('title', {length:256}).notNull(),
    description: text('description').notNull(),
    image: text('image', ),
    published: boolean('published').default(false),
    name:varchar('name',{length:255}),
    userId : varchar('userid',{length:255}),
})