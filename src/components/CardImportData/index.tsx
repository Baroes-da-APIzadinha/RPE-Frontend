import { MdDownload, MdFileUpload, MdRemove } from "react-icons/md";
import Button from "../Button";
import * as S from "./styles";
import { useRef, useState } from "react";

type Props = {
  title: string;
  subtitle: string;
  formatoEsperado: string;
  onDownloadTemplate: () => void;
  onFileSelect: (file: File) => void;
};

export function CardImportData({
  title,
  subtitle,
  formatoEsperado,
  onDownloadTemplate,
  onFileSelect,
}: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter(
      (file) => !selectedFiles.some((f) => f.name === file.name)
    );

    const updatedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(updatedFiles);
    newFiles.forEach((file) => onFileSelect(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFile(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      handleFile(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (name: string) => {
    const updated = selectedFiles.filter((file) => file.name !== name);
    setSelectedFiles(updated);
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <S.Container>
      <S.Header>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </S.Header>

      <S.Alert>
        <strong>Formato esperado:</strong> {formatoEsperado}
      </S.Alert>

      <S.TemplateRow>
        <Button variant="outline" onClick={onDownloadTemplate}>
          {" "}
          <MdDownload /> Baixar Template
        </Button>
        <span>Template com formato e exemplos para importação</span>
      </S.TemplateRow>

      <S.DropArea
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        dragover={dragOver}
      >
        <S.Icon>
          <MdFileUpload />
        </S.Icon>
        <S.DragText>
          Arraste o arquivo aqui
          <br />
          ou clique para selecionar
        </S.DragText>
        <label>
          <S.FileInput
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Selecionar Arquivo
          </Button>
        </label>
      </S.DropArea>
      {selectedFiles.length > 0 && (
        <S.FileList>
          {selectedFiles.map((file) => (
            <S.FileItem key={file.name}>
              <div>
                <S.FileName>{file.name}</S.FileName>
                <S.FileSize>{formatFileSize(file.size)}</S.FileSize>
              </div>
              <S.RemoveButton onClick={() => handleRemoveFile(file.name)}>
                <MdRemove />
              </S.RemoveButton>
            </S.FileItem>
          ))}
        </S.FileList>
      )}
    </S.Container>
  );
}
