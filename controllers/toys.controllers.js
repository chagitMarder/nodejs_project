const { Toy } = require("../models/Toys.model");

exports.getToys = async (req, res, next) => {
    // const userId = res.locals.userId;
    const { page } = req.query;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const toys = await Toy.find().skip(skip).limit(perPage).populate(`userId`);
    res.send(toys);
};

exports.search = async (req, res, next) => {
    const { s , page} = req.query;
    const perPage = 10;
    const skip = (page - 1) * perPage; 
    const toys = await Toy.find({$or: [{name: s}, {descreption: s}]})
    .skip(skip).limit(perPage);
    res.send(toys);
};

exports.category = async (req, res, next) => {
    const { cat } = req.params;
    const { page } = req.query;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    const toys = await Toy.find({category: cat}).skip(skip).limit(perPage);
    res.send(toys);
};

exports.postToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const newToy = new Toy(body);
        newToy.userId = userId;
        newToy.id = newToy._id;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.updateToy = async (req, res, next) => {
    const { body, params } = req;
    const { id } = params;
    try {
        const updateToy = await Toy.findOneAndUpdate({ id: id, userId: res.locals.userId }, body);
        console.log(updateToy);
        if (!updateToy)
            throw new Error("not authorized to update toy");
        res.status(201).send(updateToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};



exports.deleteToy = async (req, res, next) => {
    const { id } = req.params;
    try {
        const toyDeleted = await Toy.findOneAndDelete({ id: id, userId: res.locals.userId });
        if (!toyDeleted)
            throw new Error("not authorized to delete toy");
        res.send(toyDeleted);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.getById = async (req, res, next) => {
    const { id } = req.params;
    const toy = await Toy.find({ id });
    res.send(toy);
};

