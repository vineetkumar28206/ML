import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X, Brain, Cpu, Database } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

const UploadSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size),
        type: getFileType(file.name),
        status: 'uploading',
        progress: 0,
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100);
            const isComplete = newProgress >= 100;
            
            return {
              ...file,
              progress: newProgress,
              status: isComplete ? 'success' : 'uploading'
            };
          }
          return file;
        })
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles(prev => 
        prev.map(file => 
          file.id === fileId ? { ...file, progress: 100, status: 'success' } : file
        )
      );
    }, 3000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const modelExtensions = ['pkl', 'h5', 'pb', 'onnx', 'pt', 'pth', 'joblib', 'model'];
    return modelExtensions.includes(extension || '') ? 'model' : 'unknown';
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const supportedFormats = [
    { name: 'TensorFlow', extensions: '.pb, .h5', icon: Brain },
    { name: 'PyTorch', extensions: '.pt, .pth', icon: Cpu },
    { name: 'Scikit-learn', extensions: '.pkl, .joblib', icon: Database },
    { name: 'ONNX', extensions: '.onnx', icon: Brain },
  ];

  return (
    <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Upload Your <span className="gradient-text">ML Models</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Drag and drop your machine learning models or click to browse. 
            We support all major ML frameworks and formats.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="space-y-6">
            <div
              className={`glass-effect border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? 'border-primary-400 bg-primary-500/10' 
                  : 'border-gray-600 hover:border-primary-500 hover:bg-primary-500/5'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drop your models here
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or <span className="text-primary-400 font-medium">click to browse</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 500MB
                  </p>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept=".pkl,.h5,.pb,.onnx,.pt,.pth,.joblib,.model"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>

            {/* Supported Formats */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Supported Formats</h3>
              <div className="grid grid-cols-2 gap-4">
                {supportedFormats.map((format, index) => {
                  const Icon = format.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Icon className="h-5 w-5 text-primary-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{format.name}</p>
                        <p className="text-xs text-gray-400">{format.extensions}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Upload Progress</h3>
            {uploadedFiles.length === 0 ? (
              <div className="glass-effect rounded-2xl p-8 text-center">
                <File className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No files uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="glass-effect rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-600/20 rounded-lg">
                          <File className="h-4 w-4 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white truncate max-w-48">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-400">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {file.status === 'success' && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {file.status === 'error' && (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    {file.status === 'uploading' && (
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;