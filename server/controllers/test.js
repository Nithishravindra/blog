const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new AppError("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

(exports.uploadFormm = (Model) => upload.single("profileImg")),
  catchAsync(async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const user = new Model({
      // _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      profileImg: url + "/public/" + req.file.filename,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
            _id: result._id,
            profileImg: result.profileImg,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  });
