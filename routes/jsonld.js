var express = require('express');
const jsonld = require('jsonld');
var router = express.Router();

router.post('/', function (req, res) {
    jsonld.expand(req.body, function (expandErr, expanded) {
        if (expandErr == null) {
            jsonld.compact(expanded, {}, function (compactErr, compacted) {
                if (compactErr == null) {
                    res.send(compacted);
                }
                else{
                    res.status(400);
                    res.send("Was not able to compact JSON-LD", compactErr);
                }
            });
        }
        else{
            res.send({"error": "Was not able to expand JSON-LD", "detail": expandErr});
        }
    });
});

module.exports = router;
