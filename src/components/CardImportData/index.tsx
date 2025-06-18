import { MdDownload, MdFileUpload } from "react-icons/md";
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
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setSelectedFileName(file.name);
    onFileSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
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
        {!selectedFileName ? (
          <>
            <S.Icon>
              <MdFileUpload />
            </S.Icon>
            <S.DragText>
              Arraste o arquivo aqui
              <br />
              ou clique para selecionar
            </S.DragText>
            <label>
              <S.FileInput type="file"  ref={fileInputRef} onChange={handleFileChange} />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} >Selecionar Arquivo</Button>
            </label>
          </>
        ) : (
          <S.SelectedFileWrapper>
            <S.FileName> {selectedFileName}</S.FileName>
            <Button variant="outline" onClick={() => setSelectedFileName(null)}>
              Remover Arquivo
            </Button>
          </S.SelectedFileWrapper>
        )}
      </S.DropArea>
    </S.Container>
  );
}
