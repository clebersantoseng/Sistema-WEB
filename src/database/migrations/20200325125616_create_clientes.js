
exports.up = function(knex) {
    return knex.schema.createTable('clientes', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('cpf').notNullable().unique();
        table.string('phone').notNullable();
        table.string('whatsapp').notNullable();
        table.string('street').notNullable();
        table.integer('number').notNullable();
        table.string('sector').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('zipcode').notNullable();
        table.boolean('active').notNullable();
        table.integer('type').notNullable();
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('clientes');
};
