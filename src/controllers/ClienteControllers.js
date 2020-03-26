const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('clientes').count();

        const clientes = await connection('clientes')
        .limit(10)
        .offset((page - 1) * 10)
        .orderBy('name', 'asc')
        .select('*');

        response.header('X-Total-Count', count['count(*)']);
    
        return response.json(clientes);
    },

    async show(request, response) {
        const { id } = request.params;

        const clientes = await connection.from('clientes')
        .where('clientes.id', id)
        .leftJoin('servicos' , 'servicos.cliente_id', '=' , 'clientes.id')
        .select([
            'clientes.*',
            'servicos.brand',
            'servicos.vehicle',
            'servicos.plaque',
            'servicos.servico',
            'servicos.price'
        ]);

        return response.json(clientes);
    },

    async create(request, response) {
        const { 
            name,
            cpf,
            phone,
            whatsapp,
            street,
            number,
            sector,
            city,
            uf,
            zipcode
         } = request.body;
    
        const type = 2;
        const active = "true";
    
        await connection('clientes').insert({ 
            name, cpf, phone, whatsapp, street, number, sector, city, uf, zipcode, type, active 
        });
        return response.json({ 
            name, cpf, phone, whatsapp, street, number, sector, city, uf, zipcode, type, active 
        });
    },

    async delete(request, response) {
        const { id } = request.params;
        
        await connection('clientes').where('id', id).delete();
        return response.status(204).send();
    }
};



