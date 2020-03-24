const connection = require('../db/connection');

module.exports = {

    async login(request, response){
        const {id} = request.body;

        const ong = await connection('ongs').select('name').where('id', id).first();

        if(!ong){
            return response.status(400).json({error: 'ONG do not exist.'});
        }

        return response.json(ong);
    }
}