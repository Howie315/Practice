import React, { useEffect, useState } from "react";
import "./FileUpload.css";
import { FileDomain } from "../domain/FileDomain";
import { FileUploadRepoImpl } from "../FileUploadRepo/FileUploadRepoImp";
import FileUploadItem from "../FileUploadItem/FileUploadItem";
import "../FileUploadItem/FileUploadItem.css";
import FileIcon from "../../../imgs/fileIcon.png";
import { FileUploadRepo } from "../FileUploadRepo/FileUploadRepo";

const FileUpload: React.FC = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [uploadedFiles, setUploadedFiles] = useState<FileDomain[]>([]);
	const fileRepo: FileUploadRepo = new FileUploadRepoImpl();

	// Fetch the initial files when the component mounts
	useEffect(() => {
		const loadFiles = async () => {
			try {
				console.log("Loading initial files from server");
				const fetchedFiles = await fileRepo.fetchFiles();
				setUploadedFiles(fetchedFiles);
				console.log("Loaded initial files:", fetchedFiles);
			} catch (error) {
				console.error("Error fetching initial files:", error);
			}
		};

		loadFiles();
	}, []);
	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles.length > 0) {
			const newFiles = Array.from(droppedFiles);
			setFiles([...files, ...newFiles]);
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = Array.from(e.target.files || []);
		console.log("Selected files:", selectedFiles);
		setFiles([...files, ...selectedFiles]);
	};

	const handleUpload = async () => {
		try {
			console.log("Uploading files:", files);
			const uploaded = await Promise.all(
				files.map((file) => fileRepo.uploadFile(file)),
			);
			setFiles([]); // Clear files after upload

			// Fetch the uploaded files from the server
			const fetchedFiles = await fileRepo.fetchFiles();
			setUploadedFiles(fetchedFiles);
			console.log("Uploaded files:", uploaded);
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	return (
		<div>
			<div className="drag-box" onDragOver={handleDragOver} onDrop={handleDrop}>
				<p>Drag 'n' drop some files here</p>
				<div>
					<h3 className="header">Files to Upload</h3>
					<ul className="file-list">
						{files.map((file, index) => (
							<li key={index} className="file-item">
								<img src={FileIcon} className="img-size" />
								{file.name}{" "}
							</li>
						))}
					</ul>
					<button onClick={handleUpload}>Upload Files</button>
				</div>
			</div>

			<div className="file-input">
				<input type="file" multiple onChange={handleFileSelect} />
				<button onClick={handleUpload} className="handle-button">
					Upload Files
				</button>
			</div>

			<div>
				<h3 className="header">Uploaded Files</h3>
				<ul className="file-list">
					{uploadedFiles.map((file, index) => (
						<FileUploadItem key={index} file={file} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default FileUpload;
