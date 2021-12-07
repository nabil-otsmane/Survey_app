
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

    router.post('/survey/:id/result', function (req, res) {
        try {
            const id = parseInt(req.params.id);
            let data = survey.get({ id })[0] || {};

            if (!("id" in data)) {
                res.status(404).send(`item ${id} not found.`);
            } else {

                if (!("results" in data)) {
                    data.results = [];
                }

                data.results.push(req.body);

                survey.alter(data);

                res.status(200).send("results added successfully");
            }
        } catch(e) {
            res.status(500).send(`couldn't get or set data for id ${req.params.id}: ${e.message}`)
        }
    })

    return router;
}


module.exports = routes;