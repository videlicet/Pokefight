import mongoose from 'mongoose';
import db_URL from '../db_URL.js';
import Fights from '../models/fights.js';

mongoose.connect(db_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export const getAllFights = async (req, res, next) => {
    console.log('triggered')
    const fights = await Fights.find({}).exec();
    res.status(200).json(fights); 
    // try {

    // } catch (error) {
    //     next(error);
    // }
};


const insertedFight = new Fights({
    winner: 'Ivysaur',
    loser: 'Balbasaur',
    date: 'asöldföasds5'
  });

export const postFight = async (req, res, next) => {
    await insertedFight.save();
    return res.status(201).json(insertedFight);

    // try {

    // } catch (error) {
    //     next(error);
    // }
};


/*
app.get('/', async (req, res) => {
	const student = await Student.find({}).exec();
    res.status(200).json(student); 
    }
);
*/