"use client"

import { useState, useCallback } from "react"
import { useDropzone, type FileWithPath } from "react-dropzone"
import { UploadCloud, File as FileIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export function FileUploader({ onFileSelect, className }: FileUploaderProps) {
  const [file, setFile] = useState<FileWithPath | null>(null)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "application/pdf": [],
      "image/vnd.dwg": [],
      "image/vnd.dxf": [],
    },
    maxFiles: 1,
  })

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center cursor-pointer transition-colors duration-300",
        isDragActive ? "bg-accent/50 border-primary" : "hover:bg-accent/20",
        className
      )}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative rounded-md bg-secondary p-4">
            <FileIcon className="h-16 w-16 text-primary" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-medium">{file.name}</p>
          <p className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
          <UploadCloud className="h-16 w-16" />
          <p className="font-bold text-lg text-foreground">
            اسحب وأفلت المخطط هنا، أو انقر للتصفح
          </p>
          <p className="text-sm">
            يدعم: PDF, DWG, DXF, JPG, PNG
          </p>
        </div>
      )}
    </div>
  )
}
