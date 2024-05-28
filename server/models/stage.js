import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const stageSchema = new Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    timestamp: { type: Date, required: true },
    approved: { type: Boolean, required: true }
});

const stageModel = mongoose.model("stage", stageSchema);

export default stageModel;