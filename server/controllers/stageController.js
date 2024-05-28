import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import stageModel from "../models/stage";
import stageCharacterModel from "../models/stage_character";
import stageLeaderboardModel from "../models/stage_leaderboard";

const stages_all = expressAsyncHandler(async (req, res, next) => {
    const allStages = await stageModel.find({ approved: true }).sort({ timestamp: 1 })
        .exec();

    const responseObject = {
        responseStatus: 'validRequest',
        stages: allStages
    }
    return res.json(responseObject);
});

const stages_get_children = expressAsyncHandler(async (req, res, next) => {
    if(req.params.id.length < 24)
    {
        // No results
        const responseObject = {
            responseStatus: 'stageNotFound',
        }
        return res.json(responseObject);
    }
    
    const stageChildren = await stageCharacterModel.find({ stage: req.params.id })
        .exec();

    const responseObject = {
        responseStatus: 'validRequest',
        stageChildren: stageChildren
    }

    return res.json(responseObject);
});

const stage_post_winner = [
    // Validate and sanitize fields.
    body("name", "name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .isLength({ max: 32 })
        .escape(),
    expressAsyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(errors.isEmpty())
        {
            const findEntry = await stageLeaderboardModel.findOne({ name: req.body.name, stage: req.body.stage });

            if(!findEntry)
            {
                // add new leaderboard entry
                const newStage = new stageLeaderboardModel({
                    name: req.body.name,
                    stage: req.body.stage,
                    hour: req.body.time.hour,
                    minute: req.body.time.minute,
                    second: req.body.time.second,
                });

                (await newStage.save());
                const responseObject = {
                    responseStatus: 'validWinner'
                }
                res.json(responseObject);
            } else {
                let lessTime = false;
                if(req.body.time.hour < findEntry.hour)
                {
                    lessTime = true;
                } else if(req.body.time.hour === findEntry.hour)
                {
                    if(req.body.time.minute < findEntry.minute)
                    {
                        lessTime = true;
                    } else if(req.body.time.minute === findEntry.minute)
                    {
                        if(req.body.time.second < findEntry.second)
                        {
                            lessTime = true;
                        }
                    }
                }

                if(lessTime)
                {
                    // update new leaderboard entry
                    const updateEntry = new stageLeaderboardModel({
                        name: findEntry.name,
                        stage: findEntry.stage,
                        hour: req.body.time.hour,
                        minute: req.body.time.minute,
                        second: req.body.time.second,
                        _id: findEntry._id,
                    });

                    await stageLeaderboardModel.findByIdAndUpdate(findEntry._id, updateEntry, {});
                    const responseObject = {
                        responseStatus: 'validUpdateWinner'
                    }
                    res.json(responseObject);
                } else {
                    const responseObject = {
                        responseStatus: 'invalidUpdateWinner'
                    }
                    res.json(responseObject);
                }

            }
        }
    }),
]

const stages_get_leaderboard = expressAsyncHandler(async (req, res, next) => {
    if(req.params.id.length < 24)
    {
        // No results
        const responseObject = {
            responseStatus: 'stageNotFound',
        }
        return res.json(responseObject);
    }
    
    const stageLeaderboard = await stageLeaderboardModel.find({ stage: req.params.id })
        .sort({ hour: 1, minute: 1, second: 1})
        .exec();

    const responseObject = {
        responseStatus: 'validRequest',
        stageLeaderboard: stageLeaderboard
    }

    return res.json(responseObject);
});

const stage_post_add = [
    // Validate and sanitize fields.
    body("name", "Please input a valid stage name.")
        .trim()
        .isLength({ min: 1 })
        .isLength({ max: 128 })
        .escape(),
    body("imageUrl", "Please input a valid image.")
        .trim()
        .isLength({ min: 1 }),
    expressAsyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if(errors.isEmpty())
        {
            // add new leaderboard entry
            const newStage = new stageModel({
                name: req.body.name,
                image_url: req.body.imageUrl,
                timestamp: (new Date()),
                approved: false
            });

            const stageData = (await newStage.save());

            if(stageData)
            {

                const addCharacters = [];
                
                req.body.characters.forEach((character) => {

                    const formattedName = character.name.toLowerCase().trim();

                    const newCharacter = new stageCharacterModel({
                        name: character.name,
                        class_name: formattedName,
                        stage: stageData._id,
                        min_x: (character.position.relativeX - 2),
                        max_x: (character.position.relativeX + 2),
                        min_y: (character.position.y - 19),
                        max_y: (character.position.y + 19),
                    });

                    addCharacters.push(newCharacter.save());
                });

                (await Promise.all(addCharacters));

                const responseObject = {
                    responseStatus: 'stageAdded'
                }
                res.json(responseObject);

            } else {
                const responseObject = {
                    responseStatus: 'stageAddError',
                    errors: ['Could not create the stage (database error)']
                }
                res.json(responseObject);
            }
        } else {
            const responseObject = {
                responseStatus: 'stageAddError',
                errors: errors.array()
            }
            res.json(responseObject);
        }
    }),
]

export { stages_all, stages_get_children, stage_post_winner, stages_get_leaderboard, stage_post_add }