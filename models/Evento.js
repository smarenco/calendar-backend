const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

//Modificamos el nombre de los campos cuando los consultamos extraigo __v y _id, luego cargo todos los otros campos con ...object y le seteo id
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();

    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema);
