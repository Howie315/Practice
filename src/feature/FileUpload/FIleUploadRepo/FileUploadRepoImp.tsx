import axios from "axios";
import { FileUploadRepo } from "./FileUploadRepo";
import { mapToFileEntityToFile } from "../mapper/fileMapper";
import { FileDomain } from "../domain/FileDomain";
import { FileEntity } from "../entity/FileEntity";

export class FileUploadRepoImpl implements FileUploadRepo {
	baseUrl = "http://localhost:5001"; // Changed port to 50001

	async fetchFiles(): Promise<FileDomain[]> {
		try {
			console.log("Fetching files from:", `${this.baseUrl}/files`);
			const response = await axios.get(`${this.baseUrl}/files`);
			const fileEntities: FileEntity[] = response.data;
			console.log("Fetched files:", fileEntities);
			return fileEntities.map(mapToFileEntityToFile);
		} catch (error) {
			console.error("Error fetching files:", error);
			throw error;
		}
	}

	async uploadFile(file: File): Promise<FileDomain> {
		const formData = new FormData();
		formData.append("files", file);
		try {
			console.log("Uploading file to:", `${this.baseUrl}/upload`);
			const response = await axios.post(`${this.baseUrl}/upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			const fileEntity: FileEntity = response.data; // Assuming only one file is uploaded at a time
			console.log("Uploaded file entity:", fileEntity);
			return mapToFileEntityToFile(fileEntity);
		} catch (error) {
			console.error("Error uploading file:", error);
			throw error;
		}
	}
}
