
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
  bodyParts: string[];
  goals: string[];
  intensity: string;
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
      title: "Full Body HIIT Workout - Beginner Friendly Fat Burning",
      youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      category: "HIIT",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 20,
      description: "High-intensity interval training perfect for beginners. This workout combines cardio and strength exercises to burn calories and build endurance. No equipment needed, just your body weight. Great for fat loss and conditioning.",
      tags: ["hiit", "cardio", "beginner", "bodyweight", "fat loss", "conditioning", "full body", "burning", "weight loss", "interval"],
      bodyParts: ["full body", "core", "legs", "arms"],
      goals: ["fat loss", "conditioning", "endurance", "weight loss"],
      intensity: "moderate",
      createdAt: "2024-01-15T00:00:00.000Z"
    },
    {
      id: "2",
      title: "Advanced Strength Training with Dumbbells - Muscle Building Power",
      youtubeUrl: "https://www.youtube.com/watch?v=K56Z12XNQ5c",
      thumbnailUrl: "https://img.youtube.com/vi/strength456/maxresdefault.jpg",
      category: "Strength",
      difficulty: "advanced",
      machineType: "dumbbells",
      duration: 45,
      description: "Intensive strength training session using dumbbells for serious muscle building. Focus on compound movements including deadlifts, squats, and presses. Perfect for experienced lifters looking to build mass and strength.",
      tags: ["strength", "dumbbells", "advanced", "muscle", "building", "compound", "mass", "power", "lifting", "weights"],
      bodyParts: ["chest", "back", "legs", "shoulders", "arms"],
      goals: ["muscle building", "strength", "mass", "power"],
      intensity: "high",
      createdAt: "2024-01-14T00:00:00.000Z"
    },
    {
      id: "3",
      title: "Relaxing Yoga Flow for Flexibility and Stress Relief",
      youtubeUrl: "https://www.youtube.com/watch?v=7KSNmziMqog",
      thumbnailUrl: "https://img.youtube.com/vi/yoga123/maxresdefault.jpg",
      category: "Yoga",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 25,
      description: "Gentle yoga flow designed to improve flexibility and reduce stress. Perfect for beginners or as a recovery session. Focus on breathing, mindful movement, and stretching tight muscles.",
      tags: ["yoga", "flexibility", "beginner", "stretching", "relaxation", "mindfulness", "recovery", "stress relief", "calm", "meditation"],
      bodyParts: ["full body", "spine", "hips", "shoulders"],
      goals: ["flexibility", "stress relief", "recovery", "mindfulness"],
      intensity: "low",
      createdAt: "2024-01-12T00:00:00.000Z"
    },
    {
      id: "4",
      title: "Treadmill Cardio Blast - Fat Burning Intervals for Weight Loss",
      youtubeUrl: "https://www.youtube.com/watch?v=IpUQElrETw4",
      thumbnailUrl: "https://img.youtube.com/vi/cardio789/maxresdefault.jpg",
      category: "Cardio",
      difficulty: "intermediate",
      machineType: "treadmill",
      duration: 30,
      description: "High-energy cardio workout on the treadmill designed for maximum fat loss. Interval training with varying speeds and inclines to maximize calorie burn and improve cardiovascular fitness.",
      tags: ["cardio", "treadmill", "intermediate", "running", "fat loss", "intervals", "weight loss", "burning", "endurance", "fitness"],
      bodyParts: ["legs", "glutes", "cardiovascular"],
      goals: ["fat loss", "weight loss", "endurance", "cardiovascular health"],
      intensity: "moderate",
      createdAt: "2024-01-13T00:00:00.000Z"
    },
    {
      id: "5",
      title: "Barbell Deadlift Training - Power Building and Strength Development",
      youtubeUrl: "https://www.youtube.com/watch?v=1aVw1gZ9Ncg",
      thumbnailUrl: "https://img.youtube.com/vi/barbell101/maxresdefault.jpg",
      category: "Strength",
      difficulty: "advanced",
      machineType: "barbell",
      duration: 50,
      description: "Comprehensive deadlift training session focusing on proper form and progressive overload. Includes conventional, sumo, and Romanian deadlift variations for complete posterior chain development.",
      tags: ["strength", "barbell", "advanced", "deadlift", "powerlifting", "form", "posterior chain", "power", "lifting", "technique"],
      bodyParts: ["back", "glutes", "hamstrings", "traps", "core"],
      goals: ["strength", "power", "muscle building", "technique"],
      intensity: "high",
      createdAt: "2024-01-10T00:00:00.000Z"
    },
    {
      id: "6",
      title: "Pilates Fundamentals - Core Strength and Stability Training",
      youtubeUrl: "https://www.youtube.com/watch?v=kGZjouuqY4E",
      thumbnailUrl: "https://img.youtube.com/vi/pilates123/maxresdefault.jpg",
      category: "Pilates",
      difficulty: "beginner",
      machineType: "bodyweight",
      duration: 28,
      description: "Introduction to Pilates focusing on core strength and stability. Learn fundamental movements and breathing techniques for better posture, control, and body awareness.",
      tags: ["pilates", "core", "beginner", "stability", "posture", "control", "breathing", "fundamentals", "strength", "awareness"],
      bodyParts: ["core", "spine", "pelvis", "full body"],
      goals: ["core strength", "stability", "posture", "control"],
      intensity: "low",
      createdAt: "2024-01-11T00:00:00.000Z"
    },
    {
      id: "7",
      title: "Cable Machine Full Body Strength Training Workout",
      youtubeUrl: "https://www.youtube.com/watch?v=-Nr31VymCYM",
      thumbnailUrl: "https://img.youtube.com/vi/cable456/maxresdefault.jpg",
      category: "Strength",
      difficulty: "intermediate",
      machineType: "cable",
      duration: 35,
      description: "Complete workout using cable machines targeting all major muscle groups. Perfect for intermediate lifters looking for variety in their strength training routine with constant tension.",
      tags: ["strength", "cable", "intermediate", "full body", "variety", "muscle", "tension", "training", "resistance", "functional"],
      bodyParts: ["chest", "back", "shoulders", "arms", "legs", "core"],
      goals: ["muscle building", "strength", "functional fitness"],
      intensity: "moderate",
      createdAt: "2024-01-09T00:00:00.000Z"
    },
    {
      id: "8",
      title: "Beginner Cardio - Walking and Light Jogging for Weight Loss",
      youtubeUrl: "https://www.youtube.com/watch?v=1w7eWrowb1s",
      thumbnailUrl: "https://img.youtube.com/vi/beginner789/maxresdefault.jpg",
      category: "Cardio",
      difficulty: "beginner",
      machineType: "treadmill",
      duration: 20,
      description: "Perfect introduction to cardio exercise for beginners. Start with walking and progress to light jogging. Great for building cardiovascular endurance safely and burning calories.",
      tags: ["cardio", "beginner", "walking", "jogging", "endurance", "safe", "weight loss", "fat loss", "fitness", "gentle"],
      bodyParts: ["legs", "cardiovascular", "glutes"],
      goals: ["weight loss", "endurance", "fitness", "fat loss"],
      intensity: "low",
      createdAt: "2024-01-08T00:00:00.000Z"
    },
    {
      id: "9",
      title: "Advanced HIIT - Maximum Intensity Fat Burning Workout",
      youtubeUrl: "https://www.youtube.com/watch?v=Arbpo7cWyno",
      thumbnailUrl: "https://img.youtube.com/vi/hiit999/maxresdefault.jpg",
      category: "HIIT",
      difficulty: "advanced",
      machineType: "bodyweight",
      duration: 25,
      description: "Maximum intensity HIIT workout for advanced athletes. Push your limits with explosive movements, plyometrics, and minimal rest periods. Ultimate fat burning and conditioning challenge.",
      tags: ["hiit", "advanced", "intensity", "explosive", "athletic", "challenging", "fat burning", "plyometrics", "conditioning", "extreme"],
      bodyParts: ["full body", "legs", "core", "arms"],
      goals: ["fat loss", "conditioning", "athletic performance", "challenge"],
      intensity: "very high",
      createdAt: "2024-01-07T00:00:00.000Z"
    },
    {
      id: "10",
      title: "Intermediate Yoga - Strength Building and Balance Training",
      youtubeUrl: "https://www.youtube.com/watch?v=3B2hVhSHd-s",
      thumbnailUrl: "https://img.youtube.com/vi/yoga456/maxresdefault.jpg",
      category: "Yoga",
      difficulty: "intermediate",
      machineType: "bodyweight",
      duration: 40,
      description: "Build strength and improve balance with challenging yoga poses. Perfect progression from beginner level with more complex asanas, arm balances, and challenging transitions.",
      tags: ["yoga", "intermediate", "strength", "balance", "poses", "progression", "asanas", "challenging", "transitions", "flexibility"],
      bodyParts: ["full body", "arms", "core", "legs", "spine"],
      goals: ["strength", "balance", "flexibility", "progression"],
      intensity: "moderate",
      createdAt: "2024-01-06T00:00:00.000Z"
    },
    {
      id: "11",
      title: "Kettlebell HIIT - Full Body Fat Burning Strength Training",
      youtubeUrl: "https://www.youtube.com/watch?v=example11",
      thumbnailUrl: "https://img.youtube.com/vi/kettlebell11/maxresdefault.jpg",
      category: "HIIT",
      difficulty: "intermediate",
      machineType: "kettlebells",
      duration: 30,
      description: "Dynamic kettlebell workout combining strength and cardio. Swings, snatches, and Turkish get-ups for full-body conditioning and fat loss.",
      tags: ["kettlebell", "hiit", "intermediate", "full body", "fat burning", "strength", "conditioning", "swings", "functional", "power"],
      bodyParts: ["full body", "posterior chain", "core", "shoulders"],
      goals: ["fat loss", "strength", "conditioning", "functional fitness"],
      intensity: "high",
      createdAt: "2024-01-05T00:00:00.000Z"
    },
    {
      id: "12",
      title: "Resistance Band Training - Travel Friendly Strength Workout",
      youtubeUrl: "https://www.youtube.com/watch?v=example12",
      thumbnailUrl: "https://img.youtube.com/vi/resistance12/maxresdefault.jpg",
      category: "Strength",
      difficulty: "beginner",
      machineType: "resistance-bands",
      duration: 25,
      description: "Complete strength training workout using resistance bands. Perfect for home workouts or travel. Target all major muscle groups with portable equipment.",
      tags: ["resistance bands", "strength", "beginner", "home", "travel", "portable", "full body", "convenient", "versatile", "accessible"],
      bodyParts: ["arms", "chest", "back", "legs", "shoulders"],
      goals: ["strength", "convenience", "accessibility", "muscle building"],
      intensity: "moderate",
      createdAt: "2024-01-04T00:00:00.000Z"
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
    
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
    
    console.log("Search Query Analysis:", { originalQuery: query, queryWords });
    
    // Enhanced matching algorithm
    const scoredVideos = videoLibrary.map(video => {
      let score = 0;
      let matchReasons = [];
      
      // Exact title matches (highest priority)
      if (video.title.toLowerCase().includes(queryLower)) {
        score += 100;
        matchReasons.push("title match");
      }
      
      // Category matches
      if (video.category.toLowerCase().includes(queryLower) || queryLower.includes(video.category.toLowerCase())) {
        score += 80;
        matchReasons.push("category match");
      }
      
      // Difficulty matches
      if (queryWords.includes(video.difficulty)) {
        score += 60;
        matchReasons.push("difficulty match");
      }
      
      // Machine type matches
      if (queryWords.some(word => video.machineType.toLowerCase().includes(word) || word.includes(video.machineType.toLowerCase()))) {
        score += 50;
        matchReasons.push("equipment match");
      }
      
      // Tags matching (very important for specific searches)
      const tagMatches = video.tags.filter(tag => 
        queryWords.some(word => 
          tag.toLowerCase().includes(word) || 
          word.includes(tag.toLowerCase()) ||
          tag.toLowerCase() === word
        )
      );
      score += tagMatches.length * 40;
      if (tagMatches.length > 0) {
        matchReasons.push(`tag matches: ${tagMatches.join(', ')}`);
      }
      
      // Goals matching
      const goalMatches = video.goals.filter(goal =>
        queryWords.some(word => 
          goal.toLowerCase().includes(word) || 
          word.includes(goal.toLowerCase())
        )
      );
      score += goalMatches.length * 30;
      if (goalMatches.length > 0) {
        matchReasons.push(`goal matches: ${goalMatches.join(', ')}`);
      }
      
      // Body parts matching
      const bodyPartMatches = video.bodyParts.filter(part =>
        queryWords.some(word => 
          part.toLowerCase().includes(word) || 
          word.includes(part.toLowerCase())
        )
      );
      score += bodyPartMatches.length * 25;
      if (bodyPartMatches.length > 0) {
        matchReasons.push(`body part matches: ${bodyPartMatches.join(', ')}`);
      }
      
      // Description matching (lower priority but still valuable)
      const descriptionMatches = queryWords.filter(word => 
        video.description.toLowerCase().includes(word)
      );
      score += descriptionMatches.length * 15;
      if (descriptionMatches.length > 0) {
        matchReasons.push("description match");
      }
      
      // Intensity matching for specific terms
      if (queryLower.includes('intense') || queryLower.includes('maximum') || queryLower.includes('extreme')) {
        if (video.intensity === 'high' || video.intensity === 'very high') {
          score += 40;
          matchReasons.push("intensity match");
        }
      }
      
      if (queryLower.includes('gentle') || queryLower.includes('easy') || queryLower.includes('relaxing')) {
        if (video.intensity === 'low') {
          score += 40;
          matchReasons.push("intensity match");
        }
      }
      
      console.log(`Video "${video.title}" - Score: ${score}, Reasons: [${matchReasons.join(', ')}]`);
      
      return { video, score, matchReasons };
    });
    
    // Sort by score and take top matches
    const sortedVideos = scoredVideos
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    let matchedVideos = sortedVideos.map(item => item.video);
    
    // If no good matches, fall back to difficulty-based selection
    if (matchedVideos.length === 0) {
      let fallbackDifficulty = 'beginner';
      if (queryWords.includes('advanced') || queryWords.includes('expert')) {
        fallbackDifficulty = 'advanced';
      } else if (queryWords.includes('intermediate')) {
        fallbackDifficulty = 'intermediate';
      }
      
      matchedVideos = videoLibrary
        .filter(video => video.difficulty === fallbackDifficulty)
        .slice(0, 3);
        
      console.log(`Fallback to ${fallbackDifficulty} videos:`, matchedVideos.map(v => v.title));
    }
    
    // Determine workout characteristics
    const primaryCategory = matchedVideos.length > 0 
      ? matchedVideos[0].category 
      : 'Mixed';
      
    const primaryDifficulty = matchedVideos.length > 0
      ? matchedVideos[0].difficulty
      : 'beginner';
    
    // Enhanced goal detection
    let goal = 'general fitness';
    if (queryWords.some(word => ['strength', 'muscle', 'building', 'mass', 'power'].includes(word))) {
      goal = 'muscle building';
    } else if (queryWords.some(word => ['fat', 'loss', 'weight', 'burning', 'cutting'].includes(word))) {
      goal = 'fat loss';
    } else if (queryWords.some(word => ['flexibility', 'stretching', 'yoga'].includes(word))) {
      goal = 'flexibility';
    } else if (queryWords.some(word => ['cardio', 'endurance', 'running'].includes(word))) {
      goal = 'cardiovascular health';
    } else if (queryWords.some(word => ['deadlift', 'lifting', 'powerlifting'].includes(word))) {
      goal = 'strength training';
    } else if (queryWords.some(word => ['hiit', 'conditioning', 'athletic'].includes(word))) {
      goal = 'conditioning';
    }
    
    // Generate contextual audio notes
    const audioNotes = [
      `Welcome to your personalized ${primaryDifficulty} ${goal} training session! We've selected the perfect videos based on your request for "${query}". Let's begin with proper form and focus.`,
      "Excellent start! Remember to maintain proper breathing and form throughout each exercise. Now let's transition to our next movement with purpose.",
      "Great work so far! You're building momentum and strength. Focus on quality over quantity as we move to the next exercise.",
      "Outstanding effort! Keep that energy up and listen to your body. Time for another challenging segment of your workout.",
      "Fantastic progress! You're really pushing your limits today. Let's maintain this intensity for the next part of your training.",
      "Amazing dedication! Remember to stay hydrated and maintain good form. Here comes another excellent exercise for your goals.",
      "Incredible work! You've completed an outstanding training session focused on ${goal}. Take time to stretch and celebrate your achievement!"
    ];
    
    const result = {
      matchedVideos,
      category: primaryCategory,
      difficulty: primaryDifficulty,
      goal,
      audioNotes,
      searchAnalysis: {
        originalQuery: query,
        processedWords: queryWords,
        totalMatches: matchedVideos.length,
        topScores: sortedVideos.slice(0, 3).map(item => ({
          title: item.video.title,
          score: item.score,
          reasons: item.matchReasons
        }))
      }
    };
    
    console.log("Final Workout Plan:", result);
    return result;
  },
}));
