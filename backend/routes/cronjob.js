const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Cron Job Working successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
