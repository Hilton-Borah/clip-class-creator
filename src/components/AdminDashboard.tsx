import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Play, Clock, Tag, Users, TrendingUp, Star, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVideoStore, Video } from "../store/videoStore";

interface AdminDashboardProps {
  onBack?: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const { videos, videoLibrary, addVideo, updateVideo, deleteVideo } = useVideoStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    youtubeUrl: "",
    category: "",
    difficulty: "",
    machineType: "",
    duration: "",
    description: "",
    tags: "",
  });

  // Combine user-added videos with the video library for display
  const allVideos = [...videoLibrary, ...videos];

  const resetForm = () => {
    setFormData({
      title: "",
      youtubeUrl: "",
      category: "",
      difficulty: "",
      machineType: "",
      duration: "",
      description: "",
      tags: "",
    });
    setShowAddForm(false);
    setEditingVideo(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.youtubeUrl || !formData.category || !formData.difficulty || !formData.machineType || !formData.duration) {
      alert("Please fill in all required fields");
      return;
    }

    const videoData = {
      ...formData,
      duration: parseInt(formData.duration),
      thumbnailUrl: `https://img.youtube.com/vi/${extractYouTubeId(formData.youtubeUrl)}/maxresdefault.jpg`,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    if (editingVideo) {
      updateVideo(editingVideo.id, videoData);
    } else {
      addVideo(videoData);
    }
    
    resetForm();
  };

  const handleEdit = (video: Video) => {
    setFormData({
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      category: video.category,
      difficulty: video.difficulty,
      machineType: video.machineType,
      duration: video.duration.toString(),
      description: video.description,
      tags: video.tags.join(', '),
    });
    setEditingVideo(video);
    setShowAddForm(true);
  };

  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your video library and workout content</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Videos</p>
                  <p className="text-2xl font-bold text-gray-900">{allVideos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(allVideos.map(v => v.category)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Duration</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {allVideos.reduce((sum, video) => sum + video.duration, 0)}m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Video Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter video title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube URL *
                    </label>
                    <Input
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Strength">Strength</SelectItem>
                        <SelectItem value="Cardio">Cardio</SelectItem>
                        <SelectItem value="HIIT">HIIT</SelectItem>
                        <SelectItem value="Yoga">Yoga</SelectItem>
                        <SelectItem value="Pilates">Pilates</SelectItem>
                        <SelectItem value="Flexibility">Flexibility</SelectItem>
                        <SelectItem value="Dance">Dance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level *
                    </label>
                    <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Machine Type *
                    </label>
                    <Select value={formData.machineType} onValueChange={(value) => setFormData({ ...formData, machineType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select machine type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bodyweight">Bodyweight</SelectItem>
                        <SelectItem value="dumbbells">Dumbbells</SelectItem>
                        <SelectItem value="barbell">Barbell</SelectItem>
                        <SelectItem value="treadmill">Treadmill</SelectItem>
                        <SelectItem value="cable">Cable Machine</SelectItem>
                        <SelectItem value="resistance-bands">Resistance Bands</SelectItem>
                        <SelectItem value="kettlebells">Kettlebells</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes) *
                    </label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="30"
                      min="1"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Input
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the workout"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="hiit, cardio, strength, etc."
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingVideo ? 'Update Video' : 'Add Video'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Video Library */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Video Library ({allVideos.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allVideos.map((video) => {
                const embedUrl = getEmbedUrl(video.youtubeUrl);
                const isExpanded = expandedVideo === video.id;
                
                return (
                  <div key={video.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
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
                            <Play className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{video.title}</h3>
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
                          <Badge variant="outline">{video.machineType}</Badge>
                        </div>
                        {video.tags && video.tags.length > 0 && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Tag className="w-3 h-3 text-gray-400" />
                            <div className="flex flex-wrap gap-1">
                              {video.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setExpandedVideo(isExpanded ? null : video.id)}
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(video)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteVideo(video.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t">
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
                    )}
                  </div>
                );
              })}
              
              {allVideos.length === 0 && (
                <div className="text-center py-12">
                  <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
                  <p className="text-gray-600">Add your first workout video to get started.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
