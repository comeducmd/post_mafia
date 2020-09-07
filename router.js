const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.html");
});

router.get("/:rk", (req, res) => {
    const {
        params: { rk },
    } = req;
    console.log("roon key :", rk);
    res.render("wait.html", { room_key: rk });
});

router.get("/:rk/game", (req, res) => {
    const {
        params: { rk },
    } = req;
    res.render("game.html", { room_key: rk });
});

module.exports = router;