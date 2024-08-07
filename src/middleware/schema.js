var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../public"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

var upload = multer({ storage: storage });

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null,uniqueSuffix);
  },
});

const upload2 = multer({ storage: fileStorage });

const MIME_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_SIZE = 1024 * 1024 * 5;
const upload3 = multer({
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.upload_error = true;
      cb(new Error("Only .png, .jpg, or .jpeg format allowed!"));
    }
  }, 
});

module.exports = { upload , upload2 , upload3 };