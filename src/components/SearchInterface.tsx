
import { useState, useMemo } from "react";
import { ArrowLeft, Search, Filter, Play, Clock, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVideoStore } from "../store/videoStore";

interface SearchInterfaceProps {
  onBack: () => void;
}

const SearchInterface = ({ onBack }: SearchInterfaceProps) => {
  const { videos } = useVideoStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  const categories = useMemo(() => {
    const unique = new Set(videos.map(v => v.category));
    return Array.from(unique);
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.category.toLowerCase().includes(searchTerm.toLowerCase());
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

  const generateClass = () => {
    if (selectedVideos.length === 0) return;
    
    const selectedVideoData = videos.filter(v => selectedVideos.includes(v.id));
    console.log("Generating class with videos:", selectedVideoData);
    console.log("Total duration:", totalSelectedDuration, "minutes");
    
    // This is where you would implement the video merging logic
    // For now, we'll just show an alert
    alert(`Class generated! ${selectedVideos.length} videos, ${totalSelectedDuration} minutes total. Video merging and AI voiceover features coming soon!`);
  };

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
                  onClick={generateClass}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Generate Class
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search & Filter</span>
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
              Search Results ({filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''})
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

        {/* Future Features Preview */}
        {selectedVideos.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-700">Class Generation Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Play className="w-4 h-4 text-purple-600" />
                  <span>Videos will be merged with FFmpeg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>AI voiceovers between segments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-600" />
                  <span>Smooth transitions and intro/outro</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchInterface;
