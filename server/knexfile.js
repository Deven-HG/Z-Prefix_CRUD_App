// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "pg",
    connection: {
      host: "db",
      database: "inventory_management",
      user: "postgres",
      password: "docker"
    }
  },

  staging: {
  },

  production: {
  }

};