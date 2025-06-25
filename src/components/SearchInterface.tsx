import { useState, useMemo } from "react";
import { ArrowLeft, Search, Play, Clock, Star, Tag, Download, Volume2, Mic, VolumeX, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVideoStore } from "../store/videoStore";

interface SearchInterfaceProps {
  onBack: () => void;
}

const SearchInterface = ({ onBack }: SearchInterfaceProps) => {
  const { generateWorkoutPlan } = useVideoStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [smartQuery, setSmartQuery] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<SpeechSynthesisUtterance | null>(null);
  
  // Class Parameters filters
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // Sample video data with extended properties
  const sampleVideos = [
    {
      id: 1,
      title: "Beginner Dumbbell Workout",
      description: "Perfect introduction to dumbbell exercises for beginners",
      youtubeUrl: "https://www.youtube.com/watch?v=M0uO8X3_tEA",
      duration: 15,
      category: "strength",
      difficulty: "beginner",
      machineType: "dumbbells"
    },
    {
      id: 2,
      title: "Advanced Barbell Training",
      description: "Intensive barbell training for experienced lifters",
      youtubeUrl: "https://www.youtube.com/watch?v=4BOTvaRaDjI",
      duration: 30,
      category: "strength",
      difficulty: "advanced",
      machineType: "barbell"
    },
    {
      id: 3,
      title: "Treadmill HIIT Cardio",
      description: "High-intensity interval training on treadmill",
      youtubeUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      duration: 20,
      category: "cardio",
      difficulty: "intermediate",
      machineType: "treadmill"
    },
    {
      id: 4,
      title: "Cable Machine Full Body",
      description: "Complete body workout using cable machines",
      youtubeUrl: "https://www.youtube.com/watch?v=gC_L9qAHVJ8",
      duration: 45,
      category: "strength",
      difficulty: "intermediate",
      machineType: "cable"
    },
    {
      id: 5,
      title: "Bodyweight Beginner Routine",
      description: "No equipment needed - perfect for home workouts",
      youtubeUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      duration: 25,
      category: "bodyweight",
      difficulty: "beginner",
      machineType: "bodyweight"
    }
  ];

  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    
    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // If it's already an embed URL, extract the ID
    if (url.includes('youtube.com/embed/')) {
      const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
      if (embedMatch) return embedMatch[1];
    }
    
    return null;
  };

  const getEmbedUrl = (url: string) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  const speakText = (text: string) => {
    // Stop any currently playing speech
    if (currentAudio) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentAudio(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentAudio(null);
    };

    setCurrentAudio(utterance);
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentAudio(null);
  };

  const generateSmartWorkout = async () => {
    if (!smartQuery.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const workoutPlan = generateWorkoutPlan(smartQuery);
    setGeneratedPlan(workoutPlan);
    setIsGenerating(false);
    
    console.log("Generated Workout Plan:", workoutPlan);
  };

  const filterVideos = async () => {
    setIsFiltering(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = sampleVideos;
    
    if (selectedDuration) {
      const duration = parseInt(selectedDuration);
      filtered = filtered.filter(video => {
        if (duration === 15) return video.duration <= 15;
        if (duration === 30) return video.duration > 15 && video.duration <= 30;
        if (duration === 45) return video.duration > 30 && video.duration <= 45;
        return video.duration > 45;
      });
    }
    
    if (selectedMachine) {
      filtered = filtered.filter(video => video.machineType === selectedMachine);
    }
    
    if (selectedDifficulty) {
      filtered = filtered.filter(video => video.difficulty === selectedDifficulty);
    }
    
    setFilteredVideos(filtered);
    setIsFiltering(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetGeneration = () => {
    setGeneratedPlan(null);
    setSmartQuery("");
    stopSpeaking();
  };

  // If smart workout plan is generated, show the result
  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetGeneration}
                  className="hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  New Search
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Smart Workout Plan</h1>
                  <p className="text-sm text-gray-600">AI-generated training plan with voiceovers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isSpeaking && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={stopSpeaking}
                    className="bg-red-50 border-red-200 hover:bg-red-100"
                  >
                    <VolumeX className="w-4 h-4 mr-2" />
                    Stop Audio
                  </Button>
                )}
                <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Plan
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Plan Overview */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-green-700 text-2xl">
                    {generatedPlan.difficulty.charAt(0).toUpperCase() + generatedPlan.difficulty.slice(1)} {generatedPlan.goal.charAt(0).toUpperCase() + generatedPlan.goal.slice(1)} Plan
                  </CardTitle>
                  <p className="text-green-600 mt-2">
                    {generatedPlan.matchedVideos.length} videos • {generatedPlan.matchedVideos.reduce((sum: number, v: any) => sum + v.duration, 0)} minutes total
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Play className="w-5 h-5" />
                  <span className="font-semibold">Ready to Train</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-green-600" />
                  <span>AI voiceovers included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-green-600" />
                  <span>Perfectly matched difficulty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span>Category: {generatedPlan.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Training Session Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {generatedPlan.matchedVideos.map((video: any, index: number) => {
                  const embedUrl = getEmbedUrl(video.youtubeUrl);
                  
                  return (
                    <div key={video.id} className="border rounded-lg p-4 bg-gray-50">
                      {/* Audio Note Before */}
                      {generatedPlan.audioNotes[index] && (
                        <div className="mb-4 p-3 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Mic className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-800">AI Coach Voice</span>
                              <Badge variant="secondary" className="text-xs">
                                {index === 0 ? '00:00' : 'Transition'}
                              </Badge>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => speakText(generatedPlan.audioNotes[index])}
                              disabled={isSpeaking}
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              <Volume2 className="w-3 h-3 mr-1" />
                              Play
                            </Button>
                          </div>
                          <p className="text-blue-700 italic">"{generatedPlan.audioNotes[index]}"</p>
                        </div>
                      )}
                      
                      {/* Video Section */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                            {embedUrl ? (
                              <iframe
                                src={embedUrl}
                                title={video.title}
                                className="w-full h-full rounded"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : (
                              <Play className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{video.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{video.duration}min</span>
                              </span>
                              <Badge variant="secondary">{video.category}</Badge>
                              <Badge className={getDifficultyColor(video.difficulty)}>
                                {video.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        {/* Embedded YouTube Video */}
                        <div className="w-full">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            {embedUrl ? (
                              <iframe
                                src={embedUrl}
                                title={video.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <p>Video unavailable</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Final Audio Note */}
                      {index === generatedPlan.matchedVideos.length - 1 && generatedPlan.audioNotes[index + 1] && (
                        <div className="mt-4 p-3 bg-green-100 rounded-lg border-l-4 border-green-500">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Mic className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-800">Session Complete</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => speakText(generatedPlan.audioNotes[index + 1])}
                              disabled={isSpeaking}
                              className="text-green-600 border-green-300 hover:bg-green-50"
                            >
                              <Volume2 className="w-3 h-3 mr-1" />
                              Play
                            </Button>
                          </div>
                          <p className="text-green-700 italic">"{generatedPlan.audioNotes[index + 1]}"</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Workout Generator</h1>
                <p className="text-sm text-gray-600">AI-powered fitness training with voice guidance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Class Parameters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Class Parameters */}
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700">
                <Filter className="w-5 h-5" />
                <span>Class Parameters</span>
              </CardTitle>
              <p className="text-blue-600 text-sm mt-2">
                Filter videos by specific criteria to find the perfect workout
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Class Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes or less</SelectItem>
                      <SelectItem value="30">16-30 minutes</SelectItem>
                      <SelectItem value="45">31-45 minutes</SelectItem>
                      <SelectItem value="60">45+ minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Machine Type</label>
                  <Select value={selectedMachine} onValueChange={setSelectedMachine}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select machine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dumbbells">Dumbbells</SelectItem>
                      <SelectItem value="barbell">Barbell</SelectItem>
                      <SelectItem value="treadmill">Treadmill</SelectItem>
                      <SelectItem value="cable">Cable Machine</SelectItem>
                      <SelectItem value="bodyweight">Bodyweight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty Level</label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={filterVideos}
                  disabled={isFiltering || (!selectedDuration && !selectedMachine && !selectedDifficulty)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isFiltering ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Filtering...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      GENERATE CLASS
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Generated Class Preview */}
          <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
            <CardHeader>
              <CardTitle className="text-cyan-700">Generated Class Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredVideos.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-cyan-600 mb-4">
                    Found {filteredVideos.length} matching videos for your criteria
                  </div>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredVideos.map((video) => {
                      const embedUrl = getEmbedUrl(video.youtubeUrl);
                      return (
                        <div key={video.id} className="border rounded-lg p-3 bg-white">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                              {embedUrl ? (
                                <iframe
                                  src={embedUrl}
                                  title={video.title}
                                  className="w-full h-full"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Play className="w-4 h-4 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900 truncate">{video.title}</h4>
                              <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
                                <span>{video.duration}min</span>
                                <Badge variant="secondary" className="text-xs">{video.machineType}</Badge>
                                <Badge className={`text-xs ${getDifficultyColor(video.difficulty)}`}>
                                  {video.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-cyan-600" />
                  </div>
                  <p className="text-cyan-600 text-sm">
                    Generate a class to see the preview here. The system will select appropriate videos from the library and add AI-generated transitions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Smart Search Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Mic className="w-5 h-5" />
              <span>Smart Workout Generator</span>
            </CardTitle>
            <p className="text-blue-600 text-sm mt-2">
              Describe your workout goals and get a personalized training plan with embedded videos and voice guidance
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Describe your workout: 'I want advanced muscle building training' or 'beginner cardio for fat loss'"
                  value={smartQuery}
                  onChange={(e) => setSmartQuery(e.target.value)}
                  className="flex-1 text-base"
                />
                <Button 
                  onClick={generateSmartWorkout}
                  disabled={isGenerating || !smartQuery.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Generate Plan
                    </>
                  )}
                </Button>
              </div>
              <div className="space-y-3">
                <span className="text-gray-600 text-sm font-medium">Try these examples:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "I want deadlift beginner training",
                    "Advanced muscle building workout",
                    "Cutting workout for weight loss", 
                    "Cardio and flexibility for beginners",
                    "HIIT workout for fat burning",
                    "Intermediate weight lifting program"
                  ].map((example) => (
                    <Button
                      key={example}
                      variant="outline"
                      size="sm"
                      onClick={() => setSmartQuery(example)}
                      className="text-sm text-left justify-start h-auto py-2 px-3 hover:bg-blue-50 hover:border-blue-300"
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 mb-2">How it works</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-green-700">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter by parameters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Or describe your goal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Get personalized playlist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Follow AI guidance</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchInterface;
