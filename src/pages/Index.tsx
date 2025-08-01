import { useState } from "react";
import { AudioUpload } from "@/components/AudioUpload";
import { RizzMeter } from "@/components/RizzMeter";
import { RizzGuide } from "@/components/RizzGuide";

const Index = () => {
  const [rizzLevel, setRizzLevel] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAudioAnalyzed = (level: number) => {
    setIsAnalyzing(true);
    // Reset meter first
    setRizzLevel(0);
    
    // Then animate to new level
    setTimeout(() => {
      setRizzLevel(level);
      setIsAnalyzing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Rizz Meter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Measure your charisma level by analyzing your voice and speech patterns. 
            Upload audio or record yourself to discover your rizz score!
          </p>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-8">
              <AudioUpload onAudioAnalyzed={handleAudioAnalyzed} />
              <RizzGuide />
            </div>

            {/* Right Column */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <RizzMeter rizzLevel={rizzLevel} isAnimating={isAnalyzing} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-border/20">
          <p className="text-muted-foreground">
            Built with ✨ for measuring that unspoken rizz
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;