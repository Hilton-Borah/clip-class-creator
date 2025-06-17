import { useState, useMemo } from "react";
import { ArrowLeft, Search, Filter, Play, Clock, Star, Tag, Download, Volume2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVideoStore } from "../store/videoStore";

interface SearchInterfaceProps {
  onBack: () => void;
}

interface GeneratedClass {
  id: string;
  title: string;
  totalDuration: number;
  videoClips: Array<{
    video: any;
    startTime: number;
    endTime: number;
    voiceoverBefore?: string;
    voiceoverAfter?: string;
  }>;
  finalVideoUrl?: string;
}

const SearchInterface = ({ onBack }: SearchInterfaceProps) => {
  const { videos, generateWorkoutPlan } = useVideoStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [smartQuery, setSmartQuery] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const categories = useMemo(() => {
    const unique = new Set(videos.map(v => v.category));
    return Array.from(unique);
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || video.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [videos, searchTerm, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const toggleVideoSelection = (videoId: string) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const totalSelectedDuration = useMemo(() => {
    return selectedVideos.reduce((total, videoId) => {
      const video = videos.find(v => v.id === videoId);
      return total + (video?.duration || 0);
    }, 0);
  }, [selectedVideos, videos]);

  // AI-powered class generation simulation - removed setGeneratedClass reference
  const generateClassWithAI = async () => {
    if (selectedVideos.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedVideoData = videos.filter(v => selectedVideos.includes(v.id));
    
    // Generate voiceover transitions (hardcoded for now)
    const voiceoverTemplates = [
      "Welcome to your training session! Let's start with our first exercise.",
      "Great work! Now let's move on to the next movement.",
      "You're doing amazing! Time for a different challenge.",
      "Keep up the excellent form! Here's our next exercise.",
      "Fantastic effort! Let's transition to something new.",
      "Well done! Ready for the next part of your workout?",
      "Perfect! Now we're going to focus on a different muscle group.",
      "Excellent! Time to switch things up with our next exercise.",
      "Amazing work so far! Let's continue with this next movement.",
      "That was great! Now we're moving to our final exercise. Give it your all!"
    ];
    
    // Simulate AI video assembly with voiceovers
    const assembledClips = selectedVideoData.map((video, index) => {
      const startTime = index === 0 ? 0 : selectedVideoData.slice(0, index).reduce((sum, v) => sum + v.duration, 0);
      const endTime = startTime + video.duration;
      
      return {
        video,
        startTime,
        endTime,
        voiceoverBefore: index === 0 
          ? voiceoverTemplates[0] 
          : voiceoverTemplates[Math.min(index, voiceoverTemplates.length - 1)],
        voiceoverAfter: index === selectedVideoData.length - 1 
          ? "Congratulations! You've completed your training session. Great job and keep up the excellent work!"
          : undefined
      };
    });
    
    const newClass: GeneratedClass = {
      id: Date.now().toString(),
      title: `Custom ${selectedCategory !== 'all' ? selectedCategory : 'Mixed'} Class - ${totalSelectedDuration} min`,
      totalDuration: totalSelectedDuration,
      videoClips: assembledClips,
      finalVideoUrl: `https://generated-class-${Date.now()}.mp4` // Simulated URL
    };
    
    setIsGenerating(false);
    
    console.log("AI Generated Class:", newClass);
  };

  const resetGeneration = () => {
    setGeneratedPlan(null);
    setSelectedVideos([]);
    setSmartQuery("");
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
              <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Plan
              </Button>
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
                {generatedPlan.matchedVideos.map((video: any, index: number) => (
                  <div key={video.id} className="border rounded-lg p-4 bg-gray-50">
                    {/* Audio Note Before */}
                    {generatedPlan.audioNotes[index] && (
                      <div className="mb-4 p-3 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center space-x-2 mb-2">
                          <Mic className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-semibold text-blue-800">AI Coach Voice</span>
                          <Badge variant="secondary" className="text-xs">
                            {index === 0 ? '00:00' : 'Transition'}
                          </Badge>
                        </div>
                        <p className="text-blue-700 italic">"{generatedPlan.audioNotes[index]}"</p>
                      </div>
                    )}
                    
                    {/* Video Section */}
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <img 
                          src={video.thumbnailUrl} 
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
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
                      <div className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="w-3 h-3 mr-1" />
                            Watch
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Final Audio Note */}
                    {index === generatedPlan.matchedVideos.length - 1 && generatedPlan.audioNotes[index + 1] && (
                      <div className="mt-4 p-3 bg-green-100 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center space-x-2 mb-2">
                          <Mic className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-800">Session Complete</span>
                        </div>
                        <p className="text-green-700 italic">"{generatedPlan.audioNotes[index + 1]}"</p>
                      </div>
                    )}
                  </div>
                ))}
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
                <h1 className="text-2xl font-bold text-gray-900">Search Videos</h1>
                <p className="text-sm text-gray-600">Find and create custom training classes</p>
              </div>
            </div>
            {selectedVideos.length > 0 && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {selectedVideos.length} videos selected ({totalSelectedDuration} min)
                </div>
                <Button 
                  onClick={generateClassWithAI}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Generate AI Class
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Smart Search */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Mic className="w-5 h-5" />
              <span>Smart Workout Generator</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Describe your workout: 'I want advanced muscle building training' or 'beginner cardio for fat loss'"
                  value={smartQuery}
                  onChange={(e) => setSmartQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={generateSmartWorkout}
                  disabled={isGenerating || !smartQuery.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="text-gray-600">Try:</span>
                {[
                  "I want deadlift beginner training",
                  "Advanced muscle building workout",
                  "Cutting workout for weight loss",
                  "Cardio and flexibility for beginners"
                ].map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setSmartQuery(example)}
                    className="text-xs"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traditional Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Browse All Videos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle>
              Browse Results ({filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div 
                    key={video.id} 
                    className={`bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                      selectedVideos.includes(video.id) 
                        ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => toggleVideoSelection(video.id)}
                  >
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={video.thumbnailUrl} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}min</span>
                      </div>
                      {selectedVideos.includes(video.id) && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{video.category}</span>
                        </Badge>
                        <Badge className={getDifficultyColor(video.difficulty)}>
                          <Star className="w-3 h-3 mr-1" />
                          {video.difficulty}
                        </Badge>
                      </div>
                      {video.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <a 
                          href={video.youtubeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-600 text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on YouTube
                        </a>
                        <div className="text-xs text-gray-500">
                          Click to {selectedVideos.includes(video.id) ? 'remove' : 'add'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchInterface;
