const {Schema,model} = require('mongoose');

const PresupuestoSchema = Schema({

    pedido: {
        type: Array,
        required: true
    },

    total: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    // cliente : {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Cliente',
    //     required: true
    // },
    empresa:{
        type: Array,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

PresupuestoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Presupuesto', PresupuestoSchema);