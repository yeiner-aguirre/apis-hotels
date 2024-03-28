const catchError = require('../utils/catchError');
const Hotel = require('../models/Hotel');
const City = require('../models/City');
const { Op } = require('sequelize');
const Image = require('../models/Image');
const Review = require('../models/Review');

const getAll = catchError(async(req, res) => {
    const { cityId, name } = req.query;
    const where = {}
    if(cityId) where.cityId = cityId
    if(name) where.name= {
        [Op.iLike]:`%${name}%`
    };
    const results = await Hotel.findAll({
        include: [City, Image, Review],
        where:where,
    });
    const hotelWithReview = results.map(hotel => {
        const hotelJson = hotel.toJSON();
        let suma = 0;
        let reviewCount = 0;
        
        if (hotelJson.reviews && hotelJson.reviews.length > 0) {
            hotelJson.reviews.forEach(review => {
                suma += review.rating;
                reviewCount++;
            });
            const promedio = (suma / reviewCount).toFixed(1);
            delete hotelJson.reviews
            return { ...hotelJson, rating: promedio };
        } else {
            return hotelJson;
        }
    });
    return res.json(hotelWithReview);
});

const create = catchError(async(req, res) => {
    const result = await Hotel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.findByPk(id, {include: [City, Image]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Hotel.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}