import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Trash2, Calendar, User, Cpu, Database } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  description: string;
  framework: string;
  size: string;
  accuracy: string;
  uploadDate: string;
  author: string;
  downloads: number;
  status: 'active' | 'training' | 'error';
}

const ModelsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('all');

  const models: Model[] = [
    {
      id: '1',
      name: 'Image Classification CNN',
      description: 'Convolutional Neural Network for image classification with 95% accuracy on CIFAR-10 dataset.',
      framework: 'TensorFlow',
      size: '45.2 MB',
      accuracy: '95.3%',
      uploadDate: '2024-01-15',
      author: 'John Doe',
      downloads: 1247,
      status: 'active'
    },
    {
      id: '2',
      name: 'Sentiment Analysis BERT',
      description: 'Fine-tuned BERT model for sentiment analysis on social media text data.',
      framework: 'PyTorch',
      size: '438 MB',
      accuracy: '92.1%',
      uploadDate: '2024-01-12',
      author: 'Jane Smith',
      downloads: 856,
      status: 'active'
    },
    {
      id: '3',
      name: 'Stock Price Predictor',
      description: 'LSTM model for predicting stock prices based on historical data and market indicators.',
      framework: 'Scikit-learn',
      size: '12.8 MB',
      accuracy: '87.5%',
      uploadDate: '2024-01-10',
      author: 'Mike Johnson',
      downloads: 432,
      status: 'training'
    },
    {
      id: '4',
      name: 'Object Detection YOLO',
      description: 'YOLOv5 model trained for real-time object detection in autonomous driving scenarios.',
      framework: 'ONNX',
      size: '89.3 MB',
      accuracy: '91.7%',
      uploadDate: '2024-01-08',
      author: 'Sarah Wilson',
      downloads: 2103,
      status: 'active'
    }
  ];

  const frameworks = ['all', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'ONNX'];

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = selectedFramework === 'all' || model.framework === selectedFramework;
    return matchesSearch && matchesFramework;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'training': return 'text-yellow-400 bg-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'TensorFlow': return Cpu;
      case 'PyTorch': return Cpu;
      case 'Scikit-learn': return Database;
      case 'ONNX': return Cpu;
      default: return Database;
    }
  };

  return (
    <section id="models" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Your <span className="gradient-text">Model Repository</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Manage, deploy, and share your machine learning models with advanced version control and monitoring.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="pl-10 pr-8 py-3 glass-effect rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
            >
              {frameworks.map(framework => (
                <option key={framework} value={framework} className="bg-dark-800">
                  {framework === 'all' ? 'All Frameworks' : framework}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredModels.map((model) => {
            const FrameworkIcon = getFrameworkIcon(model.framework);
            return (
              <div key={model.id} className="glass-effect rounded-2xl p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg">
                      <FrameworkIcon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Eye className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Download className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{model.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Framework</p>
                    <p className="text-sm font-medium text-white">{model.framework}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Size</p>
                    <p className="text-sm font-medium text-white">{model.size}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                    <p className="text-sm font-medium text-green-400">{model.accuracy}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Downloads</p>
                    <p className="text-sm font-medium text-white">{model.downloads.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{model.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(model.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <Database className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No models found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModelsSection;