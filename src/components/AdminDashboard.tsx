import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Youtube, Clock, Star, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useVideoStore } from "../store/videoStore";

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const { videos, addVideo, deleteVideo } = useVideoStore();
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  
  const [newVideo, setNewVideo] = useState({
    title: "",
    youtubeUrl: "",
    category: "",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    duration: "",
    description: "",
    tags: ""
  });

  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const handleAddVideo = () => {
    if (newVideo.title && newVideo.youtubeUrl && newVideo.category && newVideo.duration) {
      addVideo({
        title: newVideo.title,
        youtubeUrl: newVideo.youtubeUrl,
        category: newVideo.category,
        difficulty: newVideo.difficulty,
        duration: parseInt(newVideo.duration),
        description: newVideo.description,
        thumbnailUrl: "", // Not needed since we're using direct YouTube URLs
        tags: newVideo.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      });
      
      setNewVideo({
        title: "",
        youtubeUrl: "",
        category: "",
        difficulty: "beginner",
        duration: "",
        description: "",
        tags: ""
      });
      setIsAddingVideo(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your video library</p>
              </div>
            </div>
            <Dialog open={isAddingVideo} onOpenChange={setIsAddingVideo}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Video</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                      placeholder="Enter video title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtubeUrl">YouTube URL</Label>
                    <Input
                      id="youtubeUrl"
                      value={newVideo.youtubeUrl}
                      onChange={(e) => setNewVideo({...newVideo, youtubeUrl: e.target.value})}
                      placeholder="https://youtube.com/watch?v=... or embedded URL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newVideo.category}
                      onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                      placeholder="e.g., Cardio, Strength, Yoga"
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select 
                      value={newVideo.difficulty} 
                      onValueChange={(value: "beginner" | "intermediate" | "advanced") => 
                        setNewVideo({...newVideo, difficulty: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                      placeholder="15"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input
                      id="description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                      placeholder="Brief description of the video"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newVideo.tags}
                      onChange={(e) => setNewVideo({...newVideo, tags: e.target.value})}
                      placeholder="e.g., strength, muscle, workout"
                    />
                  </div>
                  <Button 
                    onClick={handleAddVideo}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Add Video
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{videos.length}</p>
                  <p className="text-sm text-gray-600">Total Videos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{new Set(videos.map(v => v.category)).size}</p>
                  <p className="text-sm text-gray-600">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{videos.reduce((acc, v) => acc + v.duration, 0)}</p>
                  <p className="text-sm text-gray-600">Total Minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{videos.filter(v => v.difficulty === 'advanced').length}</p>
                  <p className="text-sm text-gray-600">Advanced</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Library */}
        <Card>
          <CardHeader>
            <CardTitle>Video Library</CardTitle>
          </CardHeader>
          <CardContent>
            {videos.length === 0 ? (
              <div className="text-center py-12">
                <Youtube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No videos yet</h3>
                <p className="text-gray-600 mb-4">Add your first video to get started</p>
                <Button 
                  onClick={() => setIsAddingVideo(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Video
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div key={video.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      {extractYouTubeId(video.youtubeUrl) ? (
                        <iframe
                          src={`${video.youtubeUrl}`}
                          title={video.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <Youtube className="w-8 h-8 mb-2" />
                          <p>Invalid YouTube URL</p>
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-xs">
                        {video.duration}min
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{video.category}</Badge>
                        <Badge className={getDifficultyColor(video.difficulty)}>
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
                        >
                          View on YouTube
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteVideo(video.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default AdminDashboard;
