import mongoose from "mongoose";
import mongooseFuzzySearching from "mongoose-fuzzy-searching";


const {Schema} = mongoose;

const certificateSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    description: {
        type: String,
    }, 
    type: {
        type: String,
        required: true
    },
    typename: {
        type: String,
    },
    workname: {
        type: String,
    },
    tome: {
        type: String,
    },
    folio: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    footer: {
        type: String,
        required: true
    }
});

certificateSchema.plugin(mongooseFuzzySearching, {fields: ["names", "role", "typename", "username", "workname"]});

const Certificate = mongoose.model('Certificate', certificateSchema);

export {Certificate};