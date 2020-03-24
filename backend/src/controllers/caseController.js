const connection = require('../db/connection');

module.exports = {

    async listCases(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('cases').count();

        const cases = await connection('cases')
        .join('ongs', 'ongs.id', '=', 'cases.ong_id')
        .select(['cases.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'])
        .limit(5).offset((page-1) *5);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(cases);
    },

    async createCase(request, response){
        const{ title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('cases').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async deleteCase(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const caso = await connection('cases').select('ong_id').where('id', id).first();

        if(caso.ong_id !== ong_id){
            return response.status(401).json({error:'Operation not permitted.'});
        } 

        await connection('cases').delete().where('id', id);

        return response.status(204).send();
    }

}