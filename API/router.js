
const router = require('express').Router();

function routes(db) {

    const survey = db.entity('survey');

    router.get('/survey', function (req, res){
        try {
            let data = survey.get();

            res.status(200).send(data);
        } catch (e) {
            res.status(500).send("Couldn't get data: " + e.message);
        }
    })

    router.get('/survey/:id', function (req, res) {
        try {
            let data = survey.get({ id: req.params.id })[0] || {};

            res.status(200).send(data)
        } catch (e) {
            res.status(500).send(`couldn't get data of id ${req.params.id}: ${e.message}`)
        }
    })

    router.post('/survey', function (req, res) {
        try {
            let id = survey.add(req.body);

            res.status(200).send({ id });
        } catch (e) {
            res.status(500).send("Couldn't add entry: " + e.message);
        }
    })

    router.post('/survey/:id/results', function (req, res) {

    })

    return router;
}


module.exports = routes;