import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const stageSchema = new Schema({
    name: { type: String, required: true },
    class_name: { type: String, required: true },
    stage: { type: Schema.Types.ObjectId, ref: "stage", required: true },
    min_x: { type: Number, required: true},
    max_x: { type: Number, required: true},
    min_y: { type: Number, required: true},
    max_y: { type: Number, required: true},
});

const stageCharacterModel = mongoose.model("stage_character", stageSchema);

export default stageCharacterModel;