// cấu hình và thiết lập việc upload tệp lên Cloudinary thông qua multer
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,

  params: (req) => { 
    return {
      folder: "Music", // Thay đổi tên thư mục tùy theo yêu cầu của bạn
      resource_type: "auto", // Tự động xác định loại tài nguyên tải lên
    };
  },
});

// cấu hình multer với cloudinary
const uploadCloud = multer({ storage }).fields([
  { name: "file", maxCount: 1 },
  { name: "mp3", maxCount: 1 },
]);

module.exports = uploadCloud;
// Cho phép upload các tệp có định dạng bất kỳ (auto-detect). Có hai trường tệp: file và mp3.