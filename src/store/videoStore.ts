
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
  tags: string[];
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
      description: "High-intensity interval training perfect for beginners. This workout combines cardio and strength exercises to burn calories and build endurance. No equipment needed, just your body weight.",
      tags: ["hiit", "cardio", "beginner", "bodyweight", "fat loss", "conditioning"],
      createdAt: "2024-01-15T00:00:00.000Z"
    },
    {
      id: "2",
      title: "Advanced Strength Training with Dumbbells",
      youtubeUrl: "https://www.youtube.com/watch?v=K56Z12XNQ5c",
      thumbnailUrl: "https://img.youtube.com/vi/strength456/maxresdefault.jpg",
      category: "Strength",
      difficulty: "advanced",
      machineType: "dumbbells",
      duration: 45,
      description: "Intensive strength training session using dumbbells for muscle building. Focus on compound movements including deadlifts, squats, and presses. Perfect for experienced lifters.",
      tags: ["strength", "dumbbells", "advanced", "muscle", "building", "compound"],
      createdAt: "2024-01-14T00:00:00.000Z"
    },
    {
      id: "3",
      title: "Relaxing Yoga Flow for Flexibility",
      youtubeUrl: "https://www.youtube.com/watch?v=7KSNmziMqog",
      thumbnailUrl: "https://img.youtube.com/vi/yoga123/maxresdefault.jpg",
      category: "Yoga",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 25,
      description: "Gentle yoga flow designed to improve flexibility and reduce stress. Perfect for beginners or as a recovery session. Focus on breathing and mindful movement.",
      tags: ["yoga", "flexibility", "beginner", "stretching", "relaxation", "mindfulness"],
      createdAt: "2024-01-12T00:00:00.000Z"
    },
    {
      id: "4",
      title: "Treadmill Cardio Blast - Fat Burning",
      youtubeUrl: "https://www.youtube.com/watch?v=IpUQElrETw4",
      thumbnailUrl: "https://img.youtube.com/vi/cardio789/maxresdefault.jpg",
      category: "Cardio",
      difficulty: "intermediate",
      machineType: "treadmill",
      duration: 30,
      description: "High-energy cardio workout on the treadmill designed for fat loss. Interval training with varying speeds and inclines to maximize calorie burn.",
      tags: ["cardio", "treadmill", "intermediate", "running", "fat loss", "intervals"],
      createdAt: "2024-01-13T00:00:00.000Z"
    },
    {
      id: "5",
      title: "Barbell Deadlift Training - Power Building",
      youtubeUrl: "https://www.youtube.com/watch?v=1aVw1gZ9Ncg",
      thumbnailUrl: "https://img.youtube.com/vi/barbell101/maxresdefault.jpg",
      category: "Strength",
      difficulty: "advanced",
      machineType: "barbell",
      duration: 50,
      description: "Comprehensive deadlift training session focusing on proper form and progressive overload. Includes conventional, sumo, and Romanian deadlift variations.",
      tags: ["strength", "barbell", "advanced", "deadlift", "powerlifting", "form"],
      createdAt: "2024-01-10T00:00:00.000Z"
    },
    {
      id: "6",
      title: "Pilates Fundamentals - Core Strength",
      youtubeUrl: "https://www.youtube.com/watch?v=kGZjouuqY4E",
      thumbnailUrl: "https://img.youtube.com/vi/pilates123/maxresdefault.jpg",
      category: "Pilates",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 28,
      description: "Introduction to Pilates focusing on core strength and stability. Learn fundamental movements and breathing techniques for better posture and control.",
      tags: ["pilates", "core", "beginner", "stability", "posture", "control"],
      createdAt: "2024-01-11T00:00:00.000Z"
    },
    {
      id: "7",
      title: "Cable Machine Full Body Strength",
      youtubeUrl: "https://www.youtube.com/watch?v=-Nr31VymCYM",
      thumbnailUrl: "https://img.youtube.com/vi/cable456/maxresdefault.jpg",
      category: "Strength",
      difficulty: "intermediate",
      machineType: "cable",
      duration: 35,
      description: "Complete workout using cable machines targeting all major muscle groups. Perfect for intermediate lifters looking for variety in their strength training.",
      tags: ["strength", "cable", "intermediate", "full body", "variety", "muscle"],
      createdAt: "2024-01-09T00:00:00.000Z"
    },
    {
      id: "8",
      title: "Beginner Cardio - Walking and Light Jogging",
      youtubeUrl: "https://www.youtube.com/watch?v=1w7eWrowb1s",
      thumbnailUrl: "https://img.youtube.com/vi/beginner789/maxresdefault.jpg",
      category: "Cardio",
      difficulty: "beginner",
      machineType: "treadmill",
      duration: 20,
      description: "Perfect introduction to cardio exercise. Start with walking and progress to light jogging. Great for building cardiovascular endurance safely.",
      tags: ["cardio", "beginner", "walking", "jogging", "endurance", "safe"],
      createdAt: "2024-01-08T00:00:00.000Z"
    },
    {
      id: "9",
      title: "Advanced HIIT - Maximum Intensity",
      youtubeUrl: "https://www.youtube.com/watch?v=Arbpo7cWyno",
      thumbnailUrl: "https://img.youtube.com/vi/hiit999/maxresdefault.jpg",
      category: "HIIT",
      difficulty: "advanced",
      machineType: "bodyweight",
      duration: 25,
      description: "Maximum intensity HIIT workout for advanced athletes. Push your limits with explosive movements and minimal rest periods.",
      tags: ["hiit", "advanced", "intensity", "explosive", "athletic", "challenging"],
      createdAt: "2024-01-07T00:00:00.000Z"
    },
    {
      id: "10",
      title: "Intermediate Yoga - Strength and Balance",
      youtubeUrl: "https://www.youtube.com/watch?v=3B2hVhSHd-s",
      thumbnailUrl: "https://img.youtube.com/vi/yoga456/maxresdefault.jpg",
      category: "Yoga",
      difficulty: "intermediate",
      machineType: "bodyweight",
      duration: 40,
      description: "Build strength and improve balance with challenging yoga poses. Perfect progression from beginner level with more complex asanas.",
      tags: ["yoga", "intermediate", "strength", "balance", "poses", "progression"],
      createdAt: "2024-01-06T00:00:00.000Z"
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
    
    // Enhanced AI simulation based on query keywords
    const queryLower = query.toLowerCase();
    let difficulty = 'beginner';
    let category = '';
    let goal = 'general fitness';
    let matchedVideos: Video[] = [];
    
    // Determine difficulty
    if (queryLower.includes('advanced') || queryLower.includes('expert')) {
      difficulty = 'advanced';
    } else if (queryLower.includes('intermediate')) {
      difficulty = 'intermediate';
    }
    
    // Determine category and goal
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
    } else if (queryLower.includes('pilates')) {
      category = 'Pilates';
      goal = 'core strength';
    } else if (queryLower.includes('deadlift')) {
      // Special case for deadlift
      matchedVideos = videoLibrary.filter(video => 
        video.tags.includes('deadlift') || video.title.toLowerCase().includes('deadlift')
      );
      goal = 'deadlift training';
    }
    
    // Filter videos if no specific deadlift search
    if (matchedVideos.length === 0) {
      matchedVideos = videoLibrary.filter(video => {
        const matchesDifficulty = video.difficulty === difficulty;
        const matchesCategory = category ? video.category === category : true;
        const matchesTags = video.tags.some(tag => 
          queryLower.includes(tag) || tag.includes(queryLower.split(' ')[0])
        );
        
        return matchesDifficulty || matchesCategory || matchesTags;
      });
    }
    
    // If still no matches, get videos by difficulty at least
    if (matchedVideos.length === 0) {
      matchedVideos = videoLibrary.filter(video => video.difficulty === difficulty);
    }
    
    // If still no matches, use default videos
    if (matchedVideos.length === 0) {
      matchedVideos = videoLibrary.slice(0, 3);
    }
    
    // Limit to 5 videos max
    matchedVideos = matchedVideos.slice(0, 5);
    
    // Generate audio notes for the workout
    const audioNotes = [
      `Welcome to your personalized ${difficulty} ${goal} training session! Let's begin with proper form and focus.`,
      "Great start! Remember to maintain proper breathing throughout each exercise. Now let's move to our next movement.",
      "Excellent work so far! You're building strength and endurance. Time to challenge yourself with the next exercise.",
      "Keep that momentum going! Focus on quality over quantity. Let's transition to our next training segment.",
      "Fantastic effort! You're really pushing your limits today. Ready for the next part of your workout?",
      "Amazing progress! Remember to listen to your body and maintain good form. Here comes another great exercise.",
      "Outstanding work! You've completed an incredible training session. Take a moment to stretch and hydrate."
    ];
    
    console.log("Smart Workout Generation:", {
      query: queryLower,
      difficulty,
      category,
      goal,
      matchedCount: matchedVideos.length,
      videoTitles: matchedVideos.map(v => v.title)
    });
    
    return {
      matchedVideos,
      category: category || 'Mixed',
      difficulty,
      goal,
      audioNotes
    };
  },
}));
