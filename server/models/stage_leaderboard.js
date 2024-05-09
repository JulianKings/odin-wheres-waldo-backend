import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const stageSchema = new Schema({
    name: { type: String, required: true },
    stage: { type: Schema.Types.ObjectId, ref: "stage", required: true },
    hour: { type: Number, required: true},
    minute: { type: Number, required: true},
    second: { type: Number, required: true},
});

const stageLeaderboardModel = mongoose.model("stage_leaderboard", stageSchema);

export default stageLeaderboardModel;