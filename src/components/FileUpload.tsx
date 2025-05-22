
import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  title: string;
  acceptedTypes: string;
  onFileSelect: (files: File[]) => void;
  multiple?: boolean;
}

const FileUpload = ({ title, acceptedTypes, onFileSelect, multiple = false }: FileUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    onFileSelect(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    onFileSelect(files);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFileSelect(newFiles);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? "border-eucalyptus-dark bg-eucalyptus-pale"
            : "border-gray-300 hover:border-eucalyptus-light"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor={`file-upload-${title}`} className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-eucalyptus-dark">
              Clique para enviar ou arraste arquivos aqui
            </span>
            <span className="mt-1 block text-xs text-gray-500">
              Formatos aceitos: {acceptedTypes}
            </span>
          </label>
          <input
            id={`file-upload-${title}`}
            type="file"
            className="hidden"
            multiple={multiple}
            accept={acceptedTypes}
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Arquivos selecionados:</p>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-eucalyptus-dark" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
