import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { readdir } from "fs/promises";

const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors());

// Set up storage engine
const storage = multer.diskStorage({
	destination: "./uploads/",
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// Init upload
const upload = multer({
	storage: storage,
}).array("files");

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Upload endpoint
app.post("/upload", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		const files = req.files.map((file) => ({
			name: file.originalname,
			downloadedURL: `http://localhost:${PORT}/uploads/${file.originalname}`,
		}));
		res.status(200).json({ files });
	});
});

// Fetch files endpoint
app.get("/files", async (req, res) => {
	try {
		const files = await readdir("./uploads/");
		const fileInfos = files.map((file) => ({
			name: file,
			downloadedURL: `http://localhost:${PORT}/uploads/${file}`,
		}));
		res.status(200).json(fileInfos);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
