const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { username, password, email } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('users').insert({
            id,
            username,
            password,
            email
        })
        return response.json({ id, username, password });
    },

    async delete(request, response) {
        const { id } = request.params;
        
        await connection('users').where('id', id).delete();
        return response.status(204).send();
    }
};