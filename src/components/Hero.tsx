import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Deploy models in seconds'
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Enterprise-grade security'
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      description: 'Smart model optimization'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-secondary-900/20"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary-400/30 rounded-full blur-lg animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-secondary-400/30 rounded-full blur-lg animate-bounce-gentle" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-20">
        {/* Main Content */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Sparkles className="h-4 w-4 text-primary-400 mr-2" />
            <span className="text-sm font-medium text-gray-300">Next-Gen ML Platform</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Upload & Deploy
            <br />
            <span className="gradient-text">ML Models</span>
            <br />
            Effortlessly
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            The most advanced platform for machine learning model deployment. 
            Upload, optimize, and scale your AI models with enterprise-grade infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary flex items-center space-x-2 text-lg px-8 py-4">
              <span>Start Uploading</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="glass-effect text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-white/20 text-lg">
              View Documentation
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-effect p-6 rounded-2xl card-hover"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl mb-4 mx-auto">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;