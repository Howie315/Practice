import { FileDomain } from "../domain/FileDomain";
import "./FileUploadItem.css";
import FileIcon from "../../../imgs/fileIcon.png";

interface FileProps {
	file: FileDomain;
}

const FileUploadItem: React.FC<FileProps> = ({ file }) => {
	return (
		<div className="file-item">
			<img src={FileIcon} className="img-size" />
			<a
				href={file.downloadedURL}
				target="_blank"
				rel="noopener noreferrer"
				download={file.name}
				className="file-link"
			>
				{file.name}
			</a>
		</div>
	);
};

export default FileUploadItem;
