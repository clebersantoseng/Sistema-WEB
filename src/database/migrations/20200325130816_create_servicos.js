
exports.up = function(knex) {
    return knex.schema.createTable('servicos', function (table) {
        table.increments();
        table.string('brand').notNullable();
        table.string('vehicle').notNullable();
        table.string('plaque').notNullable();
        table.string('servico').notNullable();
        table.decimal('price').notNullable();
        table.timestamps();

        table.integer('cliente_id')
            .unsigned()
            .references('id')
            .inTable('clientes');        
        
    });
}

exports.down = function(knex) {
    return knex.schema.dropTable('servicos');
};
