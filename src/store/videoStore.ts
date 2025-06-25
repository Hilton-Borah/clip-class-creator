
import { create } from 'zustand';

export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  category: string;
  difficulty: string;
  machineType: string;
  duration: number;
  description: string;
  createdAt: string;
}

interface VideoStore {
  videos: Video[];
  videoLibrary: Video[];
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  generateWorkoutPlan: (query: string) => any;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  videos: [],
  videoLibrary: [
    {
      id: "1",
      title: "Full Body HIIT Workout - Beginner Friendly",
      youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      category: "HIIT",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 20,
      description: "A complete full body HIIT workout perfect for beginners",
      createdAt: "2024-01-15T00:00:00.000Z"
    },
    {
      id: "2",
      title: "Advanced Strength Training",
      youtubeUrl: "https://youtube.com/watch?v=strength456",
      thumbnailUrl: "https://img.youtube.com/vi/strength456/maxresdefault.jpg",
      category: "Strength",
      difficulty: "advanced",
      machineType: "dumbbells",
      duration: 45,
      description: "Intensive strength training for experienced athletes",
      createdAt: "2024-01-14T00:00:00.000Z"
    },
    {
      id: "3",
      title: "Relaxing Yoga Flow for Flexibility",
      youtubeUrl: "https://youtube.com/watch?v=yoga123",
      thumbnailUrl: "https://img.youtube.com/vi/yoga123/maxresdefault.jpg",
      category: "Yoga",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 25,
      description: "Gentle yoga flow to improve flexibility and reduce stress",
      createdAt: "2024-01-12T00:00:00.000Z"
    },
    {
      id: "4",
      title: "Treadmill Cardio Blast",
      youtubeUrl: "https://youtube.com/watch?v=cardio789",
      thumbnailUrl: "https://img.youtube.com/vi/cardio789/maxresdefault.jpg",
      category: "Cardio",
      difficulty: "intermediate",
      machineType: "treadmill",
      duration: 30,
      description: "High energy cardio workout on the treadmill",
      createdAt: "2024-01-13T00:00:00.000Z"
    },
    {
      id: "5",
      title: "Barbell Power Training",
      youtubeUrl: "https://youtube.com/watch?v=barbell101",
      thumbnailUrl: "https://img.youtube.com/vi/barbell101/maxresdefault.jpg",
      category: "Strength",
      difficulty: "advanced",
      machineType: "barbell",
      duration: 50,
      description: "Power training with barbell for serious lifters",
      createdAt: "2024-01-10T00:00:00.000Z"
    },
    {
      id: "6",
      title: "Pilates Fundamentals - Full Body",
      youtubeUrl: "https://youtube.com/watch?v=pilates123",
      thumbnailUrl: "https://img.youtube.com/vi/pilates123/maxresdefault.jpg",
      category: "Pilates",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 28,
      description: "Introduction to Pilates with full body exercises",
      createdAt: "2024-01-11T00:00:00.000Z"
    },
    {
      id: "7",
      title: "Cable Machine Full Body Workout",
      youtubeUrl: "https://youtube.com/watch?v=cable456",
      thumbnailUrl: "https://img.youtube.com/vi/cable456/maxresdefault.jpg",
      category: "Strength",
      difficulty: "intermediate",
      machineType: "cable",
      duration: 35,
      description: "Complete workout using cable machines for all muscle groups",
      createdAt: "2024-01-09T00:00:00.000Z"
    }
  ],

  addVideo: (video) => set((state) => {
    const newVideo: Video = {
      ...video,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    return { 
      videos: [...state.videos, newVideo],
      videoLibrary: [...state.videoLibrary, newVideo]
    };
  }),

  updateVideo: (id, updatedVideo) => set((state) => ({
    videos: state.videos.map((video) =>
      video.id === id ? { ...video, ...updatedVideo } : video
    ),
    videoLibrary: state.videoLibrary.map((video) =>
      video.id === id ? { ...video, ...updatedVideo } : video
    ),
  })),

  deleteVideo: (id) => set((state) => ({
    videos: state.videos.filter((video) => video.id !== id),
    videoLibrary: state.videoLibrary.filter((video) => video.id !== id),
  })),

  generateWorkoutPlan: (query: string) => {
    const { videoLibrary } = get();
    
    // Simple AI simulation based on query keywords
    const queryLower = query.toLowerCase();
    let difficulty = 'beginner';
    let category = 'general fitness';
    let goal = 'general fitness';
    
    if (queryLower.includes('advanced') || queryLower.includes('expert')) {
      difficulty = 'advanced';
    } else if (queryLower.includes('intermediate')) {
      difficulty = 'intermediate';
    }
    
    if (queryLower.includes('strength') || queryLower.includes('muscle') || queryLower.includes('lifting')) {
      category = 'Strength';
      goal = 'muscle building';
    } else if (queryLower.includes('cardio') || queryLower.includes('running') || queryLower.includes('fat loss')) {
      category = 'Cardio';
      goal = 'fat loss';
    } else if (queryLower.includes('yoga') || queryLower.includes('flexibility')) {
      category = 'Yoga';
      goal = 'flexibility';
    } else if (queryLower.includes('hiit')) {
      category = 'HIIT';
      goal = 'conditioning';
    } else if (queryLower.includes('deadlift')) {
      category = 'deadlift';
      goal = 'general fitness';
    }
    
    // Filter videos based on the analysis
    let matchedVideos = videoLibrary.filter(video => {
      const matchesDifficulty = video.difficulty === difficulty;
      const matchesCategory = video.category.toLowerCase().includes(category.toLowerCase()) || 
                             category === 'general fitness';
      return matchesDifficulty || matchesCategory;
    }).slice(0, 5);
    
    // If no matches, use some default videos
    if (matchedVideos.length === 0) {
      matchedVideos = videoLibrary.slice(0, 3);
    }
    
    // Generate audio notes for the workout
    const audioNotes = [
      `Welcome to your personalized ${difficulty} ${goal} training session! Let's begin with proper form and focus.`,
      "Great start! Remember to maintain proper breathing throughout each exercise. Now let's move to our next movement.",
      "Excellent work so far! You're building strength and endurance. Time to challenge yourself with the next exercise.",
      "Keep that momentum going! Focus on quality over quantity. Let's transition to our next training segment.",
      "Fantastic effort! You're really pushing your limits today. Ready for the next part of your workout?",
      "Amazing progress! Remember to listen to your body and maintain good form. Here comes another great exercise."
    ];
    
    return {
      matchedVideos,
      category,
      difficulty,
      goal,
      audioNotes
    };
  },
}));
