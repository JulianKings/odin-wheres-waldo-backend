import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from 'express-validator';
import stageModel from "../models/stage";
import stageCharacterModel from "../models/stage_character";
import stageLeaderboardModel from "../models/stage_leaderboard";
import { appendTime, obtainTime, updateTime } from "../util/hashManager";

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

    const timeId = appendTime(req.app.settings.hash_dictionary, new Date());

    const responseObject = {
        responseStatus: 'validRequest',
        stageChildren: stageChildren,
        time_id: timeId
    }

    return res.json(responseObject);
});

const stages_update_time = expressAsyncHandler(async (req, res, next) => {
    if(req.params.id.length < 16)
    {
        // No results
        const responseObject = {
            responseStatus: 'timeNotFound',
        }
        return res.json(responseObject);
    }

    const currentTime = (new Date());    
    const stageTime = updateTime(req.app.settings.hash_dictionary, req.params.id, currentTime);

    if(stageTime)
    {
        const timeObject = obtainTime(req.app.settings.hash_dictionary, req.params.id);
        const responseObject = {
            responseStatus: 'validRequest',
            time_id: req.params.id,
            finished_date: timeObject.finished,
            started_date: timeObject.time
        }
        return res.json(responseObject);
    } else {
        const responseObject = {
            responseStatus: 'timeNotFound'
        }
        return res.json(responseObject);
    }
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

            // process time
            const timeObject = obtainTime(req.app.settings.hash_dictionary, req.body.time);

            if(timeObject && timeObject.finished)
            {
                const timeDiff = Math.ceil(Math.abs(Date.parse(timeObject.finished) - Date.parse(timeObject.time)) / 1000);

                const seconds = (timeDiff > 60) ? (timeDiff % 60) : timeDiff;
                let minutes = (timeDiff > 60) ? (Math.trunc(timeDiff / 60)) : 0;
                const finalMinutes = (minutes > 60) ? (minutes % 60) : minutes;
                const hours = (minutes > 60) ? (Math.trunc(minutes / 60)) : 0;

                const time = {
                    second: seconds,
                    minute: finalMinutes,
                    hour: hours
                }

                if(!findEntry)
                {
                    // add new leaderboard entry
    
                    const newStage = new stageLeaderboardModel({
                        name: req.body.name,
                        stage: req.body.stage,
                        hour: time.hour,
                        minute: time.minute,
                        second: time.second,
                    });
    
                    (await newStage.save());
                    const responseObject = {
                        responseStatus: 'validWinner'
                    }
                    res.json(responseObject);
                } else {
                    let lessTime = false;
                    if(time.hour < findEntry.hour)
                    {
                        lessTime = true;
                    } else if(time.hour === findEntry.hour)
                    {
                        if(time.minute < findEntry.minute)
                        {
                            lessTime = true;
                        } else if(time.minute === findEntry.minute)
                        {
                            if(time.second < findEntry.second)
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
                            hour: time.hour,
                            minute: time.minute,
                            second: time.second,
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

export { stages_all, stages_get_children, stages_update_time, stage_post_winner, stages_get_leaderboard, stage_post_add }