import { FileDomain } from "../domain/FileDomain";

export interface FileUploadRepo {
  fetchFiles(): Promise<FileDomain[]>;
  uploadFile(file: File): Promise<FileDomain>;
}
