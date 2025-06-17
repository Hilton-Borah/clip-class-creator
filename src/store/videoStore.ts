
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  description?: string;
  createdAt: Date;
}

interface VideoStore {
  videos: Video[];
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
}

// Mock data for demonstration
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Full Body HIIT Workout - Beginner Friendly',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    category: 'HIIT',
    difficulty: 'beginner',
    duration: 20,
    description: 'A complete full body HIIT workout perfect for beginners',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Advanced Strength Training - Upper Body',
    youtubeUrl: 'https://youtube.com/watch?v=abc123xyz',
    thumbnailUrl: 'https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg',
    category: 'Strength',
    difficulty: 'advanced',
    duration: 35,
    description: 'Intense upper body strength training for experienced athletes',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Relaxing Yoga Flow for Flexibility',
    youtubeUrl: 'https://youtube.com/watch?v=yoga123',
    thumbnailUrl: 'https://img.youtube.com/vi/yoga123/maxresdefault.jpg',
    category: 'Yoga',
    difficulty: 'beginner',
    duration: 25,
    description: 'Gentle yoga flow to improve flexibility and reduce stress',
    createdAt: new Date('2024-01-12')
  },
  {
    id: '4',
    title: 'Cardio Blast - Fat Burning Workout',
    youtubeUrl: 'https://youtube.com/watch?v=cardio456',
    thumbnailUrl: 'https://img.youtube.com/vi/cardio456/maxresdefault.jpg',
    category: 'Cardio',
    difficulty: 'intermediate',
    duration: 30,
    description: 'High-intensity cardio workout designed to burn maximum calories',
    createdAt: new Date('2024-01-08')
  },
  {
    id: '5',
    title: 'Core Strengthening - Intermediate Level',
    youtubeUrl: 'https://youtube.com/watch?v=core789',
    thumbnailUrl: 'https://img.youtube.com/vi/core789/maxresdefault.jpg',
    category: 'Core',
    difficulty: 'intermediate',
    duration: 15,
    description: 'Focused core workout to build strength and stability',
    createdAt: new Date('2024-01-14')
  },
  {
    id: '6',
    title: 'Pilates Fundamentals - Full Body',
    youtubeUrl: 'https://youtube.com/watch?v=pilates123',
    thumbnailUrl: 'https://img.youtube.com/vi/pilates123/maxresdefault.jpg',
    category: 'Pilates',
    difficulty: 'beginner',
    duration: 28,
    description: 'Introduction to Pilates with full body exercises',
    createdAt: new Date('2024-01-11')
  }
];

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      videos: mockVideos,
      
      addVideo: (videoData) => {
        const newVideo: Video = {
          ...videoData,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        set((state) => ({
          videos: [newVideo, ...state.videos],
        }));
      },
      
      deleteVideo: (id) => {
        set((state) => ({
          videos: state.videos.filter((video) => video.id !== id),
        }));
      },
      
      updateVideo: (id, updates) => {
        set((state) => ({
          videos: state.videos.map((video) =>
            video.id === id ? { ...video, ...updates } : video
          ),
        }));
      },
    }),
    {
      name: 'video-store',
    }
  )
);
