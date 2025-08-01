import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Mic, Play, Pause, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioUploadProps {
  onAudioAnalyzed: (rizzLevel: number) => void;
}

export const AudioUpload = ({ onAudioAnalyzed }: AudioUploadProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
        setAudioFile(file);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak your best rizz line! 🎤",
      });
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Please allow microphone access to record audio.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "Ready to analyze your rizz! ✨",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      toast({
        title: "Audio uploaded",
        description: "Ready to measure that rizz level! 🔥",
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an audio file.",
        variant: "destructive",
      });
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const analyzeAudio = async () => {
    if (!audioFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate audio analysis with random rizz calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on file size and duration (for demo purposes)
    const rizzLevel = Math.floor(Math.random() * 100) + 1;
    
    onAudioAnalyzed(rizzLevel);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete!",
      description: "Your rizz level has been calculated! 📊",
    });
  };

  const clearAudio = () => {
    setAudioFile(null);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-8 bg-gradient-card backdrop-blur-sm border border-border/20 shadow-card">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Upload Your Rizz
          </h2>
          <p className="text-muted-foreground">
            Record or upload audio to measure your charisma level
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button
            variant="gradient"
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
            className="h-16"
          >
            <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>

          <Button
            variant="glass"
            size="lg"
            onClick={() => fileInputRef.current?.click()}
            className="h-16"
          >
            <Upload className="h-5 w-5" />
            Upload Audio
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {audioFile && (
          <div className="space-y-4 p-4 rounded-lg bg-muted/20 border border-border/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {audioFile.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAudio}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <audio
              ref={audioRef}
              src={audioFile ? URL.createObjectURL(audioFile) : undefined}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={togglePlayback}
                disabled={!audioFile}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>

              <Button
                variant="gradient"
                onClick={analyzeAudio}
                disabled={!audioFile || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? 'Analyzing Rizz...' : 'Analyze Rizz Level'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};