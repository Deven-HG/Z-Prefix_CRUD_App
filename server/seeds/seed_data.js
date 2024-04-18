/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('inventory').del()
  await knex('inventory_users').del()
  await knex.raw('TRUNCATE TABLE inventory_users RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE inventory RESTART IDENTITY CASCADE');

  await knex('inventory_users').insert([
    {firstname: 'John',  lastname: 'Smith',    username: 'jonjon', password: 'password'},
    {firstname: 'Jane',  lastname: 'Doe',      username: 'janey',  password: 'password'},
    {firstname: 'Peter', lastname: 'Dinklage', username: 'petey',  password: 'password'}
  ]);

  await knex('inventory').insert([
    {user_id: 3, itemname: 'Stick', description: 'This is just a regular stick,.. made of wood. But if you turn away from it and close your eyes, you could imagine it as a neat dragon-slaying sword.', quantity: 217},
    {user_id: 1, itemname: 'Rock', description: "It's not a boulder,... it's a Rock!! The pioneers used to ride these babies for miles!!", quantity: 3},
    {user_id: 2, itemname: 'Dirt', description: 'dirt... dirty dirt,... dirty dirt that smells...dirty', quantity: 74},
    {user_id: 3, itemname: 'Diamond', description: 'Is diamond', quantity: 1},
    {user_id: 3, itemname: 'Car', description: '*SLAPS HOOD* This baby can hold so many [DATABASES]', quantity: 2},
    {user_id: 1, itemname: 'Dog', description: 'My dog can talk, when he looks at a tree, he says BARK and when he looks at the top of the house he sayd ROOF', quantity: 576},
    {user_id: 2, itemname: 'Cloud', description: 'Falling through one is a wetter experience than expected', quantity: 894367},
    {user_id: 2, itemname: 'TV', description: 'John,.. why do you have so many TVs?', quantity: 349},
    {user_id: 3, itemname: 'M&Ms', description: "You're definitely a few shy of a kids size bag", quantity: 5},
    {user_id: 1, itemname: 'Games', description: 'WhAt Am i GoInG tO dO WiTh AlL ThEsE GaEmZ -1337', quantity: 1337},
    {user_id: 1, itemname: 'Stolen Merchendise', description: 'Where the hell did you get this giant bag of dildos?', quantity: 87342},
    {user_id: 3, itemname: 'Bag of Shit', description: "Yupp, it's a bag of shit...", quantity: 894},
    {user_id: 2, itemname: 'Moons', description: 'CHEESE', quantity: 1969}
  ]);
};