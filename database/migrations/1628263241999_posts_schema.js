'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('title').notNullable()
      table.text('post_body').notNullable()
      table.string('image').nullable()
      table.timestamps()
      table.foreign('user_id').references('users.id')
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
