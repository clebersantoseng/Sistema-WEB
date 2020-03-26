const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { username, password } = request.body;

        const user = await connection('users')
            .where(function() { this.where('username', username).orWhere('password', password)})
            .select('username')
            .first();
        
        if (!user) {
            return response.status(400).json({error: 'No USER found with this ID' });
        }

        return response.json(user);
    }
}