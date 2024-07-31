import { pgView, text, integer, boolean } from 'drizzle-orm/pg-core';

// ประกาศ view 'blog_user'
export const blogUser = pgView('blog_user', {
  id: integer('id'),
  title: text('title'),
  description: text('description'),
  image: text('image'),
  published: boolean('published'),
  username: text('username'),
}).existing();
