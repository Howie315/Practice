import { FileDomain } from "../domain/FileDomain";
import { FileEntity } from "../entity/FileEntity";

export const mapToFileEntityToFile = (fileEntity: FileEntity): FileDomain => {
	return {
		...fileEntity,
	};
};
