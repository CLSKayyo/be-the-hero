const connection = require('../db/connection');

module.exports = {

    async listCases(request, response){
        const ong_id = request.headers.authorization;
        const cases = await connection('cases').select('*').where('ong_id', ong_id);

        return response.json(cases);
    }
}