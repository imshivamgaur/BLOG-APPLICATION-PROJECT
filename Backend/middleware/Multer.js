import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Ensure this directory exists and has write permissions
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: timestamp + sanitized original name
    const uniqueSuffix = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });