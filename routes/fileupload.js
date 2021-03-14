const fileupload = require("express-fileupload");
const express = require("express");

let router = express.Router();
router.use(fileupload());

const Receipt = require("../models/SQLReceipts");

router.post("/fileupload", async (req, res) => {
  try {
    const file = req.files.documentFile;
    const fileExtension = file.name.split(".")[-1]; // last token after dot
    const fileName = `TABLE_${Date.now()}_id.${fileExtension}`;
    console.log(req.body);
    file.mv("./files/" + fileName, async (err) => {
      if (err) {
        console.log(err);
        return res.status(401).send(err.message);
      }
      const newRecord = new Receipt({
        fileName,
        ...req.body,
      });
      newRecord
        .save()
        .then(() => {
          return res.send("it worked");
        })
        .catch((err) => {
          return res.send(err.message);
          // return res.status("401").send(err.message);
        });
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});
module.exports = router;
