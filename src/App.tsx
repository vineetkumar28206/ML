import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import ModelsSection from './components/ModelsSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main>
        <Hero />
        <UploadSection />
        <ModelsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;