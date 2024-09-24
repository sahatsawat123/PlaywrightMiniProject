const UserSchema = {
    type: 'object',
    properties: {
    data: {
        type: 'object',
        properties: {
        id: {type: 'integer'},
        email: {type: 'string'},
        first_name: {type: 'string'},
        last_name: {type: 'string'},
        avatar: {type: 'string'}
        }
    },
    support: {
        type: 'object',
        properties: {
        url: {type: 'string'},
        text: {type: 'string'}
        }
    }
    },required : ["data","support"]
}

module.exports = {
    UserSchema
}