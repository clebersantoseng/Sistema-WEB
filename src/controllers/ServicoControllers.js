const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('servicos').count();

        const servicos = await connection('servicos')
        .orderBy('id', 'desc')
        .limit(10)
        .offset((page - 1) * 10)
        .select('*');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(servicos);
    },

    async show(request, response) {
        const { id } = request.params;
        const servicos = await connection('servicos').where('id', id).select('*');
        return response.json(servicos);

    },

    async create(request, response) {
        const { 
            brand,
            vehicle,
            plaque,
            servico,
            price,
            cliente_id
         } = request.body;
    
        await connection('servicos').insert({
            brand,
            vehicle,
            plaque,
            servico,
            price,
            cliente_id
        })
        return response.json({ brand, vehicle, plaque, servico, price, cliente_id }); 
    },

    async delete(request, response) {
        const { id } = request.params;
        
        await connection('servicos').where('id', id).delete();
        return response.status(204).send();

    }
};
