
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
  description: string;
  tags: string[];
  createdAt: Date;
}

interface VideoStore {
  videos: Video[];
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (id: string, updates: Partial<Video>) => void;
  searchVideos: (query: string) => Video[];
  generateWorkoutPlan: (query: string) => {
    matchedVideos: Video[];
    category: string;
    difficulty: string;
    goal: string;
    audioNotes: string[];
  };
}

// Comprehensive fitness video library
const videoLibrary: Video[] = [
  {
    id: '1',
    title: 'Complete Deadlift Form and Technique for Beginners',
    youtubeUrl: 'https://www.youtube.com/embed/UIPvIYsjfpo?si=OaGdqtpZmgO2kxnU',
    thumbnailUrl: 'https://img.youtube.com/vi/deadlift101/maxresdefault.jpg',
    category: 'deadlift',
    difficulty: 'beginner',
    duration: 12,
    description: 'Master the fundamentals of deadlifting with this comprehensive beginner guide. Learn proper hip hinge mechanics, bar positioning, and foot placement. This video covers common mistakes beginners make and how to avoid them. You\'ll understand the importance of maintaining a neutral spine, engaging your lats, and creating tension throughout your body. Perfect for those who have never deadlifted before or want to refine their technique.',
    tags: ['deadlift', 'form', 'technique', 'beginner', 'strength', 'powerlifting'],
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    title: 'Advanced Deadlift Variations for Maximum Muscle Building',
    youtubeUrl: 'https://www.youtube.com/embed/3lmGfN-8C6I?si=4H-bzTDumJwdzy7i',
    thumbnailUrl: 'https://img.youtube.com/vi/deadlift-advanced/maxresdefault.jpg',
    category: 'muscle building',
    difficulty: 'advanced',
    duration: 18,
    description: 'Take your deadlifting to the next level with advanced variations including deficit deadlifts, Romanian deadlifts, and sumo deadlifts. This workout focuses on progressive overload techniques, tempo variations, and accessory movements that complement your main deadlift. Learn how to incorporate pause reps, chains, and bands for enhanced muscle activation. Ideal for experienced lifters looking to break through plateaus and maximize muscle growth in the posterior chain.',
    tags: ['deadlift', 'advanced', 'muscle building', 'variations', 'progressive overload'],
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    title: 'High Intensity Cardio HIIT Workout for Fat Loss',
    youtubeUrl: 'https://www.youtube.com/embed/TfnQHo9eX6Q?si=1cS2uQyepslvSx54',
    thumbnailUrl: 'https://img.youtube.com/vi/hiit-cardio/maxresdefault.jpg',
    category: 'HIIT',
    difficulty: 'intermediate',
    duration: 25,
    description: 'Burn maximum calories in minimum time with this intense HIIT cardio session. Combines bodyweight exercises like burpees, mountain climbers, and jump squats in a structured interval format. Each exercise is performed for 45 seconds with 15 seconds rest, repeated for 5 rounds. This workout is designed to boost your metabolism for hours after completion, making it perfect for fat loss goals. Modifications are provided for different fitness levels.',
    tags: ['HIIT', 'cardio', 'fat loss', 'bodyweight', 'intervals', 'metabolism'],
    createdAt: new Date('2024-01-03')
  },
  {
    id: '4',
    title: 'Beginner Friendly Cardio Dance Workout for Weight Loss',
    youtubeUrl: 'https://www.youtube.com/embed/ygAC0yJp1KU?si=SFKLorrgqpq_u0Sp',
    thumbnailUrl: 'https://img.youtube.com/vi/cardio-dance/maxresdefault.jpg',
    category: 'cardio',
    difficulty: 'beginner',
    duration: 20,
    description: 'Get your heart pumping with this fun and energetic cardio dance routine designed specifically for beginners. Follow along with easy-to-learn dance moves that keep you moving for the entire 20 minutes. This low-impact workout is perfect for those who find traditional cardio boring. Each sequence is repeated multiple times so you can master the moves while burning calories. Great for improving coordination, cardiovascular health, and having fun while exercising.',
    tags: ['cardio', 'dance', 'beginner', 'fun', 'low-impact', 'coordination'],
    createdAt: new Date('2024-01-04')
  },
  {
    id: '5',
    title: 'Full Body Weight Lifting Routine for Muscle Building',
    youtubeUrl: 'https://www.youtube.com/embed/-p0PA9Zt8zk?si=eRmIFUtI_MqyvEx4',
    thumbnailUrl: 'https://img.youtube.com/vi/fullbody-weights/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'intermediate',
    duration: 35,
    description: 'Build lean muscle mass with this comprehensive full-body weight lifting routine. Includes compound movements like squats, bench press, rows, and overhead press targeting all major muscle groups. Each exercise includes detailed form cues, rep ranges, and progression suggestions. The workout follows a structured approach with proper warm-up, main lifts, and accessory work. Perfect for intermediate lifters looking to build strength and muscle simultaneously.',
    tags: ['weight lifting', 'muscle building', 'compound movements', 'strength', 'full body'],
    createdAt: new Date('2024-01-05')
  },
  {
    id: '6',
    title: 'Advanced Weight Lifting Techniques for Serious Muscle Growth',
    youtubeUrl: 'https://youtu.be/aEUQZK8NF1Q?si=6BM2Z74tmW7Lb2tJ',
    thumbnailUrl: 'https://img.youtube.com/vi/advanced-lifting/maxresdefault.jpg',
    category: 'muscle building',
    difficulty: 'advanced',
    duration: 45,
    description: 'Maximize your muscle building potential with advanced weight lifting techniques including drop sets, supersets, and rest-pause training. This intensive session covers periodization principles, advanced programming, and how to manipulate training variables for optimal hypertrophy. Learn about muscle fiber recruitment, time under tension, and recovery optimization. Includes demonstrations of complex movements and advanced lifting strategies used by competitive bodybuilders.',
    tags: ['weight lifting', 'advanced', 'muscle building', 'hypertrophy', 'bodybuilding'],
    createdAt: new Date('2024-01-06')
  },
  {
    id: '7',
    title: 'Cutting Phase Workout Plan for Fat Loss and Muscle Retention',
    youtubeUrl: 'https://youtu.be/AdqrTg_hpEQ?si=pam0OKalWqyVbwuv',
    thumbnailUrl: 'https://img.youtube.com/vi/cutting-workout/maxresdefault.jpg',
    category: 'cutting',
    difficulty: 'intermediate',
    duration: 30,
    description: 'Optimize your cutting phase with this strategic workout designed to preserve muscle while promoting fat loss. Combines resistance training with metabolic conditioning to maintain strength during a caloric deficit. Includes techniques for maintaining training intensity while managing fatigue from reduced calories. Learn about exercise selection, volume management, and how to adjust your program as your cut progresses. Essential for anyone preparing for a competition or wanting to get lean.',
    tags: ['cutting', 'fat loss', 'muscle retention', 'deficit', 'lean', 'competition prep'],
    createdAt: new Date('2024-01-07')
  },
  {
    id: '8',
    title: 'Beginner Flexibility and Mobility Routine for Better Movement',
    youtubeUrl: 'https://youtu.be/RP0Q8geTcJc?si=EFuOaw-BEb0Mdcu1',
    thumbnailUrl: 'https://img.youtube.com/vi/flexibility-basics/maxresdefault.jpg',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 15,
    description: 'Improve your range of motion and reduce injury risk with this comprehensive flexibility routine designed for beginners. Covers basic stretches for all major muscle groups including hamstrings, hip flexors, shoulders, and spine. Each stretch is held for optimal duration with breathing cues to enhance relaxation and effectiveness. Learn the difference between static and dynamic stretching and when to use each. Perfect for post-workout recovery or as a standalone mobility session.',
    tags: ['flexibility', 'mobility', 'stretching', 'recovery', 'injury prevention', 'range of motion'],
    createdAt: new Date('2024-01-08')
  },
  {
    id: '9',
    title: 'Advanced Flexibility Training for Athletes and Performers',
    youtubeUrl: 'https://youtu.be/duVMTFaddGs?si=Rq1arWNizVS2wTSt',
    thumbnailUrl: 'https://img.youtube.com/vi/advanced-flexibility/maxresdefault.jpg',
    category: 'flexibility',
    difficulty: 'advanced',
    duration: 25,
    description: 'Push your flexibility boundaries with advanced techniques including PNF stretching, loaded stretching, and dynamic flexibility patterns. This comprehensive session targets end-range strength and active flexibility development. Learn about fascial release techniques, joint mobilization, and how to safely progress into extreme ranges of motion. Includes sport-specific flexibility protocols and performance enhancement strategies used by professional athletes.',
    tags: ['flexibility', 'advanced', 'PNF', 'athletes', 'performance', 'mobility'],
    createdAt: new Date('2024-01-09')
  },
  {
    id: '10',
    title: 'Intense Fat Loss Circuit Training for Quick Results',
    youtubeUrl: 'https://youtu.be/_NhuJDuHNZY?si=Lm_HmWZXDNCQUiB1',
    thumbnailUrl: 'https://img.youtube.com/vi/fat-loss-circuit/maxresdefault.jpg',
    category: 'fat loss',
    difficulty: 'intermediate',
    duration: 28,
    description: 'Accelerate your fat loss journey with this high-intensity circuit training workout. Combines strength exercises with cardio bursts to maximize calorie burn and create an afterburn effect. Each circuit includes 6 exercises performed back-to-back with minimal rest. The workout targets multiple muscle groups simultaneously while keeping your heart rate elevated throughout. Includes modifications for different fitness levels and equipment alternatives for home workouts.',
    tags: ['fat loss', 'circuit training', 'high intensity', 'calorie burn', 'afterburn effect'],
    createdAt: new Date('2024-01-10')
  },
  {
    id: '11',
    title: 'Beginner Fat Loss Workout with Nutrition Tips',
    youtubeUrl: 'https://youtu.be/Ues9N2uDa8Y?si=yAxSNbnrhwyNzt8X',
    thumbnailUrl: 'https://img.youtube.com/vi/beginner-fat-loss/maxresdefault.jpg',
    category: 'fat loss',
    difficulty: 'beginner',
    duration: 22,
    description: 'Start your fat loss journey with this beginner-friendly workout that focuses on building healthy habits and sustainable exercise routines. Combines light resistance training with steady-state cardio to create a foundation for long-term success. Includes basic nutrition guidance and tips for creating a caloric deficit. Each exercise is demonstrated with proper form cues and common mistakes to avoid. Perfect for those new to fitness or returning after a long break.',
    tags: ['fat loss', 'beginner', 'nutrition', 'habits', 'sustainable', 'foundation'],
    createdAt: new Date('2024-01-11')
  },
  {
    id: '12',
    title: 'Upper Body Muscle Building Workout for Mass Gain',
    youtubeUrl: 'https://www.youtube.com/embed/8uUawnM-FD8?si=WFbPt2cwGgfVqXuH',
    thumbnailUrl: 'https://img.youtube.com/vi/upper-body-mass/maxresdefault.jpg',
    category: 'muscle building',
    difficulty: 'intermediate',
    duration: 40,
    description: 'Build impressive upper body mass with this focused muscle building routine targeting chest, back, shoulders, and arms. Features compound movements like pull-ups, dips, and overhead press combined with isolation exercises for maximum muscle activation. Learn about progressive overload, time under tension, and how to structure your training for optimal hypertrophy. Includes advanced techniques like mechanical drop sets and cluster sets to push past plateaus.',
    tags: ['muscle building', 'upper body', 'mass gain', 'hypertrophy', 'compound movements'],
    createdAt: new Date('2024-01-12')
  },
  {
    id: '13',
    title: 'Lower Body Strength and Power Development Workout',
    youtubeUrl: 'https://www.youtube.com/watch?v=8bb4WZ1h9C8',
    thumbnailUrl: 'https://img.youtube.com/vi/lower-body-power/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'advanced',
    duration: 38,
    description: 'Develop explosive lower body strength and power with this advanced training session. Incorporates plyometric exercises, heavy squats, and Olympic lifting variations to enhance athletic performance. Learn about force production, rate of force development, and how to train for maximum power output. Includes proper progressions for box jumps, depth jumps, and weighted jump squats. Essential for athletes looking to improve their vertical jump and sprint speed.',
    tags: ['lower body', 'power', 'plyometrics', 'athletic performance', 'explosive strength'],
    createdAt: new Date('2024-01-13')
  },
  {
    id: '14',
    title: 'Total Body HIIT Workout for Maximum Calorie Burn',
    youtubeUrl: 'https://www.youtube.com/watch?v=7L-_e0Y7H4M',
    thumbnailUrl: 'https://img.youtube.com/vi/total-body-hiit/maxresdefault.jpg',
    category: 'HIIT',
    difficulty: 'advanced',
    duration: 32,
    description: 'Challenge yourself with this intense total body HIIT workout designed for maximum calorie burn and cardiovascular improvement. Features complex movement patterns that engage multiple muscle groups simultaneously. Each interval pushes you to your anaerobic threshold with structured work-to-rest ratios for optimal adaptation. Includes advanced exercises like burpee box jump overs, kettlebell swings, and bear crawls. Prepare for an intense metabolic challenge.',
    tags: ['HIIT', 'total body', 'advanced', 'calorie burn', 'metabolic', 'conditioning'],
    createdAt: new Date('2024-01-14')
  },
  {
    id: '15',
    title: 'Functional Movement Patterns for Daily Life Strength',
    youtubeUrl: 'https://www.youtube.com/watch?v=JEEG0hBNk3E',
    thumbnailUrl: 'https://img.youtube.com/vi/functional-movement/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'beginner',
    duration: 26,
    description: 'Learn essential functional movement patterns that translate directly to daily activities and sports performance. Focuses on squatting, lunging, pushing, pulling, and carrying movements that form the foundation of human movement. Each exercise is taught with proper progressions from bodyweight to loaded variations. Emphasizes core stability, balance, and coordination development. Perfect for beginners or anyone looking to build practical strength for everyday tasks.',
    tags: ['functional movement', 'daily life', 'movement patterns', 'core stability', 'practical strength'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '16',
    title: 'Yoga Flow for Flexibility and Mindfulness Practice',
    youtubeUrl: 'https://www.youtube.com/embed/digpucxFbMo?si=mNdRgWfXhwHqQ4Wi',
    thumbnailUrl: 'https://img.youtube.com/vi/yoga-flow/maxresdefault.jpg',
    category: 'flexibility',
    difficulty: 'intermediate',
    duration: 30,
    description: 'Combine physical flexibility training with mindfulness practice in this flowing yoga sequence. Features sun salutations, warrior poses, and deep stretches that improve both flexibility and mental focus. Learn proper breathing techniques and how to synchronize movement with breath for maximum benefit. Each pose includes modifications for different ability levels. This practice helps reduce stress, improve posture, and enhance overall well-being while building functional flexibility.',
    tags: ['yoga', 'flexibility', 'mindfulness', 'breathing', 'stress relief', 'flow'],
    createdAt: new Date('2024-01-16')
  },
  {
    id: '17',
    title: 'Sprint Interval Training for Explosive Cardio Fitness',
    youtubeUrl: 'https://www.youtube.com/embed/8uUawnM-FD8?si=WFbPt2cwGgfVqXuH',
    thumbnailUrl: 'https://img.youtube.com/vi/sprint-intervals/maxresdefault.jpg',
    category: 'cardio',
    difficulty: 'advanced',
    duration: 24,
    description: 'Develop explosive speed and cardiovascular power with this sprint interval training protocol. Alternates between all-out sprints and active recovery periods to improve both anaerobic and aerobic capacity. Learn proper sprinting mechanics, warm-up protocols, and progressive training methods. This workout enhances fast-twitch muscle fiber development and metabolic efficiency. Includes modifications for different training surfaces and fitness levels.',
    tags: ['sprints', 'intervals', 'explosive', 'speed', 'anaerobic', 'cardiovascular'],
    createdAt: new Date('2024-01-17')
  },
  {
    id: '18',
    title: 'Bodyweight Muscle Building Workout No Equipment Needed',
    youtubeUrl: 'https://www.youtube.com/embed/TJLKgWsS7vw?si=XSfPM23557f2hB6p',
    thumbnailUrl: 'https://img.youtube.com/vi/bodyweight-muscle/maxresdefault.jpg',
    category: 'muscle building',
    difficulty: 'beginner',
    duration: 27,
    description: 'Build lean muscle using only your bodyweight with this comprehensive no-equipment workout. Features progressive push-up variations, single-leg squats, and isometric holds that challenge your muscles in new ways. Learn how to manipulate leverage, tempo, and range of motion to increase difficulty without adding weight. Perfect for home workouts, travel, or anyone who prefers bodyweight training. Includes progressions for all fitness levels.',
    tags: ['bodyweight', 'no equipment', 'muscle building', 'home workout', 'progressions'],
    createdAt: new Date('2024-01-18')
  },
  {
    id: '19',
    title: 'Competition Prep Cutting Workout Advanced Fat Loss',
    youtubeUrl: 'https://www.youtube.com/watch?v=Eh00_rniF8E',
    thumbnailUrl: 'https://img.youtube.com/vi/comp-prep-cutting/maxresdefault.jpg',
    category: 'cutting',
    difficulty: 'advanced',
    duration: 42,
    description: 'Master the art of competition preparation with this advanced cutting workout designed for serious physique athletes. Combines high-volume training with metabolic circuits to achieve extreme levels of body fat reduction while maintaining muscle mass. Learn periodization strategies, depletion workouts, and peak week protocols. Includes advanced techniques like carb cycling integration and training modifications for contest prep. Only for experienced individuals with previous cutting experience.',
    tags: ['competition prep', 'cutting', 'advanced', 'physique', 'contest prep', 'depletion'],
    createdAt: new Date('2024-01-19')
  },
  {
    id: '20',
    title: 'Powerlifting Fundamentals Squat Bench Deadlift Technique',
    youtubeUrl: 'https://www.youtube.com/embed/digpucxFbMo?si=mNdRgWfXhwHqQ4Wi',
    thumbnailUrl: 'https://img.youtube.com/vi/powerlifting-basics/maxresdefault.jpg',
    category: 'deadlift',
    difficulty: 'intermediate',
    duration: 35,
    description: 'Master the three powerlifting movements with detailed technique instruction for squat, bench press, and deadlift. Learn proper setup, execution, and common mistakes for each lift. Covers competition standards, equipment usage, and programming basics for strength development. Includes mobility work specific to powerlifting movements and injury prevention strategies. Perfect for those interested in powerlifting competition or simply wanting to maximize their strength in these fundamental movements.',
    tags: ['powerlifting', 'squat', 'bench press', 'deadlift', 'technique', 'strength'],
    createdAt: new Date('2024-01-20')
  },
  {
    id: '21',
    title: 'Metabolic Conditioning Workout for Athletic Performance',
    youtubeUrl: 'https://www.youtube.com/watch?v=6jYHZ0y_W4k',
    thumbnailUrl: 'https://img.youtube.com/vi/metabolic-conditioning/maxresdefault.jpg',
    category: 'HIIT',
    difficulty: 'intermediate',
    duration: 29,
    description: 'Enhance your metabolic conditioning with this athlete-focused workout that bridges the gap between strength and endurance. Features compound movements performed at high intensity with strategic rest periods. Learn about energy system development and how to train different metabolic pathways. Includes exercises like thrusters, rowing intervals, and loaded carries that challenge your cardiovascular system while building functional strength.',
    tags: ['metabolic conditioning', 'athletic performance', 'energy systems', 'endurance', 'functional'],
    createdAt: new Date('2024-01-21')
  },
  {
    id: '22',
    title: 'Active Recovery and Restorative Movement Session',
    youtubeUrl: 'https://www.youtube.com/watch?v=3jAv-yH_zsg',
    thumbnailUrl: 'https://img.youtube.com/vi/active-recovery/maxresdefault.jpg',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 18,
    description: 'Optimize your recovery with this gentle active recovery session focusing on movement quality and tissue health. Combines light movement patterns, breathing exercises, and gentle stretches to promote blood flow and reduce muscle tension. Learn the importance of active recovery in your training program and how it differs from complete rest. Perfect for rest days or after intense training sessions. Helps prevent stiffness and maintains mobility between harder workouts.',
    tags: ['active recovery', 'restorative', 'mobility', 'tissue health', 'rest day', 'gentle'],
    createdAt: new Date('2024-01-22')
  },
  {
    id: '23',
    title: 'Strength Endurance Circuit for Military Fitness Preparation',
    youtubeUrl: 'https://www.youtube.com/embed/digpucxFbMo?si=mNdRgWfXhwHqQ4Wi',
    thumbnailUrl: 'https://img.youtube.com/vi/military-fitness/maxresdefault.jpg',
    category: 'cardio',
    difficulty: 'advanced',
    duration: 36,
    description: 'Prepare for military fitness tests with this comprehensive strength endurance circuit. Combines push-ups, sit-ups, pull-ups, and running drills in a structured format that mirrors military training standards. Learn proper form for each exercise and strategies for improving your scores on fitness assessments. Includes progressive training protocols and tips for mental toughness during challenging workouts. Essential for military personnel or anyone wanting military-style fitness.',
    tags: ['military fitness', 'strength endurance', 'fitness test', 'push-ups', 'pull-ups', 'assessment'],
    createdAt: new Date('2024-01-23')
  },
  {
    id: '24',
    title: 'Hypertrophy Training Split for Maximum Muscle Growth',
    youtubeUrl: 'https://www.youtube.com/watch?v=Br7LZ-1v5OI',
    thumbnailUrl: 'https://img.youtube.com/vi/hypertrophy-split/maxresdefault.jpg',
    category: 'muscle building',
    difficulty: 'intermediate',
    duration: 44,
    description: 'Maximize muscle growth with this scientifically-designed hypertrophy training split. Focuses on optimal volume, frequency, and intensity for muscle building. Learn about muscle protein synthesis, progressive overload, and how to structure your training week for maximum gains. Includes exercise selection strategies, rep ranges, and recovery protocols. Features both compound and isolation exercises with detailed explanations of their roles in muscle development.',
    tags: ['hypertrophy', 'muscle growth', 'training split', 'volume', 'progressive overload', 'gains'],
    createdAt: new Date('2024-01-24')
  },
  {
    id: '25',
    title: 'Core Strengthening and Stability Training Program',
    youtubeUrl: 'https://www.youtube.com/watch?v=3OKGQH3wD2U',
    thumbnailUrl: 'https://img.youtube.com/vi/core-stability/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'intermediate',
    duration: 23,
    description: 'Develop a strong and stable core with this comprehensive training program that goes beyond traditional crunches. Focuses on anti-extension, anti-rotation, and anti-lateral flexion exercises that build functional core strength. Learn about the deep stabilizing muscles and how they contribute to overall performance and injury prevention. Includes progressions from basic holds to dynamic movements that challenge your core in multiple planes of motion.',
    tags: ['core strength', 'stability', 'functional', 'anti-rotation', 'deep muscles', 'injury prevention'],
    createdAt: new Date('2024-01-25')
  },
  {
    id: '26',
    title: 'Olympic Weightlifting Technique and Power Development',
    youtubeUrl: 'https://www.youtube.com/watch?v=8S6M8sEx7C4',
    thumbnailUrl: 'https://img.youtube.com/vi/olympic-lifting/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'advanced',
    duration: 40,
    description: 'Learn the technical Olympic lifts including the snatch and clean & jerk with this comprehensive technique guide. Covers proper progressions from basic positions to full lifts with detailed breakdowns of each phase. Emphasizes mobility requirements, timing, and coordination needed for successful Olympic lifting. Includes common errors and corrections, as well as assistance exercises to improve your lifts. Essential for serious strength athletes and coaches.',
    tags: ['olympic weightlifting', 'snatch', 'clean and jerk', 'technique', 'power', 'coordination'],
    createdAt: new Date('2024-01-26')
  },
  {
    id: '27',
    title: 'Rehabilitation Exercise Program for Injury Prevention',
    youtubeUrl: 'https://www.youtube.com/embed/TJLKgWsS7vw?si=XSfPM23557f2hB6p',
    thumbnailUrl: 'https://img.youtube.com/vi/rehab-exercises/maxresdefault.jpg',
    category: 'flexibility',
    difficulty: 'beginner',
    duration: 21,
    description: 'Prevent injuries and address movement dysfunctions with this therapeutic exercise program. Focuses on common problem areas including shoulders, lower back, and knees with corrective exercises and mobility work. Learn to identify muscle imbalances and movement compensations that can lead to injury. Includes self-assessment techniques and progressive exercises to restore proper movement patterns. Perfect for anyone dealing with minor aches and pains or looking to bulletproof their body.',
    tags: ['rehabilitation', 'injury prevention', 'corrective exercise', 'movement dysfunction', 'therapeutic'],
    createdAt: new Date('2024-01-27')
  },
  {
    id: '28',
    title: 'Explosive Athletic Training for Sports Performance',
    youtubeUrl: 'https://www.youtube.com/watch?v=ECxYJcnvyMw',
    thumbnailUrl: 'https://img.youtube.com/vi/explosive-athletic/maxresdefault.jpg',
    category: 'HIIT',
    difficulty: 'advanced',
    duration: 34,
    description: 'Enhance your athletic performance with this explosive training session designed for competitive athletes. Combines plyometrics, agility drills, and power exercises to improve speed, quickness, and reactive ability. Learn about force-velocity relationships and how to train different aspects of power production. Includes sport-specific movement patterns and progressions for various athletic demands. Essential for athletes looking to gain a competitive edge.',
    tags: ['explosive training', 'athletic performance', 'plyometrics', 'agility', 'power', 'competitive'],
    createdAt: new Date('2024-01-28')
  },
  {
    id: '29',
    title: 'Beginner Weight Training Foundation Building Program',
    youtubeUrl: 'https://www.youtube.com/watch?v=6jQY1B6jOBU',
    thumbnailUrl: 'https://img.youtube.com/vi/beginner-weights/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'beginner',
    duration: 31,
    description: 'Build a solid foundation for weight training with this comprehensive beginner program. Covers basic movement patterns, proper form, and progressive loading strategies. Learn gym etiquette, equipment usage, and safety protocols for weight room training. Includes full-body routines that establish strength in all major movement patterns. Features detailed explanations of sets, reps, and rest periods with guidance on when and how to progress. Perfect starting point for weight training newcomers.',
    tags: ['beginner', 'weight training', 'foundation', 'movement patterns', 'safety', 'gym basics'],
    createdAt: new Date('2024-01-29')
  },
  {
    id: '30',
    title: 'Advanced Fat Burning HIIT Circuit Training Session',
    youtubeUrl: 'https://www.youtube.com/embed/digpucxFbMo?si=mNdRgWfXhwHqQ4Wi',
    thumbnailUrl: 'https://img.youtube.com/vi/advanced-fat-burn/maxresdefault.jpg',
    category: 'fat loss',
    difficulty: 'advanced',
    duration: 33,
    description: 'Maximize fat burning with this advanced HIIT circuit that combines strength and cardio elements for optimal body composition changes. Features complex movement patterns and combination exercises that challenge multiple energy systems simultaneously. Learn about EPOC (excess post-exercise oxygen consumption) and how to structure workouts for maximum metabolic impact. Includes periodization strategies for continued fat loss progress and avoiding adaptation plateaus.',
    tags: ['fat burning', 'HIIT', 'advanced', 'circuit training', 'EPOC', 'metabolic impact'],
    createdAt: new Date('2024-01-30')
  },
  {
    id: '31',
    title: 'Functional Strength Training for Everyday Movement',
    youtubeUrl: 'https://www.youtube.com/watch?v=1Jt0iXbX5x0',
    thumbnailUrl: 'https://img.youtube.com/vi/functional-strength/maxresdefault.jpg',
    category: 'weight lifting',
    difficulty: 'intermediate',
    duration: 28,
    description: 'Develop practical strength that transfers to daily activities with this functional training approach. Emphasizes multi-planar movements, unilateral training, and core integration in all exercises. Learn how to train movement patterns rather than isolated muscles for better real-world application. Includes loaded carries, unilateral squats, and rotational exercises that build strength in multiple planes. Perfect for those wanting strength that enhances their daily life and activities.',
    tags: ['functional strength', 'everyday movement', 'multi-planar', 'unilateral', 'practical', 'real-world'],
    createdAt: new Date('2024-01-31')
  },
  {
    id: '32',
    title: 'Competition Cutting Advanced Physique Preparation Techniques',
    youtubeUrl: 'https://www.youtube.com/embed/TJLKgWsS7vw?si=XSfPM23557f2hB6p',
    thumbnailUrl: 'https://img.youtube.com/vi/advanced-cutting/maxresdefault.jpg',
    category: 'cutting',
    difficulty: 'advanced',
    duration: 38,
    description: 'Master advanced cutting techniques used by competitive physique athletes to achieve extremely low body fat levels. Covers advanced dietary strategies, training modifications, and supplementation protocols for contest preparation. Learn about refeeds, depletion workouts, and peak week strategies. Includes psychological aspects of extreme dieting and how to maintain muscle mass during aggressive cuts. Only for experienced individuals with proper support systems.',
    tags: ['advanced cutting', 'physique competition', 'contest prep', 'extreme dieting', 'peak week'],
    createdAt: new Date('2024-02-01')
  }
];

// Smart search and video generation functions
const parseUserQuery = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  // Extract difficulty
  let difficulty = '';
  if (lowerQuery.includes('beginner') || lowerQuery.includes('basic') || lowerQuery.includes('start')) {
    difficulty = 'beginner';
  } else if (lowerQuery.includes('advanced') || lowerQuery.includes('expert') || lowerQuery.includes('pro')) {
    difficulty = 'advanced';
  } else if (lowerQuery.includes('intermediate') || lowerQuery.includes('medium')) {
    difficulty = 'intermediate';
  }
  
  // Extract category
  let category = '';
  if (lowerQuery.includes('deadlift')) category = 'deadlift';
  else if (lowerQuery.includes('muscle building') || lowerQuery.includes('mass') || lowerQuery.includes('hypertrophy')) category = 'muscle building';
  else if (lowerQuery.includes('weight lifting') || lowerQuery.includes('strength')) category = 'weight lifting';
  else if (lowerQuery.includes('cutting') || lowerQuery.includes('lean') || lowerQuery.includes('shred')) category = 'cutting';
  else if (lowerQuery.includes('cardio') || lowerQuery.includes('running')) category = 'cardio';
  else if (lowerQuery.includes('hiit') || lowerQuery.includes('interval')) category = 'HIIT';
  else if (lowerQuery.includes('fat loss') || lowerQuery.includes('weight loss') || lowerQuery.includes('burn')) category = 'fat loss';
  else if (lowerQuery.includes('flexibility') || lowerQuery.includes('stretch') || lowerQuery.includes('mobility')) category = 'flexibility';
  
  // Extract goal
  let goal = '';
  if (lowerQuery.includes('build') || lowerQuery.includes('gain') || lowerQuery.includes('mass')) goal = 'muscle building';
  else if (lowerQuery.includes('lose') || lowerQuery.includes('burn') || lowerQuery.includes('cut')) goal = 'fat loss';
  else if (lowerQuery.includes('strength') || lowerQuery.includes('strong')) goal = 'strength building';
  else if (lowerQuery.includes('flexible') || lowerQuery.includes('mobility')) goal = 'flexibility improvement';
  
  return { difficulty, category, goal };
};

const generateAudioNotes = (videos: Video[], difficulty: string, goal: string) => {
  const notes = [
    `Welcome to your personalized ${difficulty} ${goal} training session! Let's begin with proper form and focus.`,
    `Great start! Remember to maintain proper breathing throughout each exercise. Now let's move to our next movement.`,
    `Excellent work so far! You're building strength and endurance. Time to challenge yourself with the next exercise.`,
    `Keep that momentum going! Focus on quality over quantity. Let's transition to our next training segment.`,
    `Fantastic effort! You're really pushing your limits today. Ready for the next part of your workout?`,
    `Amazing progress! Remember to listen to your body and maintain good form. Here comes another great exercise.`,
    `You're doing incredibly well! Stay focused and keep that energy high. Let's continue with our next movement.`,
    `Outstanding dedication! This is where champions are made. Time for our final push - give it everything you have!`,
    `Congratulations! You've completed an amazing training session. Your consistency and effort will pay off. Great job today!`
  ];
  
  return notes.slice(0, Math.min(notes.length, videos.length + 1));
};

export const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      videos: videoLibrary,
      
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
      
      searchVideos: (query) => {
        const videos = get().videos;
        const lowerQuery = query.toLowerCase();
        
        return videos.filter(video => 
          video.title.toLowerCase().includes(lowerQuery) ||
          video.category.toLowerCase().includes(lowerQuery) ||
          video.description.toLowerCase().includes(lowerQuery) ||
          video.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
      },
      
      generateWorkoutPlan: (query) => {
        const videos = get().videos;
        const { difficulty, category, goal } = parseUserQuery(query);
        
        // Filter videos based on parsed query
        let matchedVideos = videos.filter(video => {
          let matches = true;
          
          if (difficulty && video.difficulty !== difficulty) {
            matches = false;
          }
          
          if (category && video.category !== category) {
            // Also check if the goal matches the category
            if (goal) {
              if (goal === 'muscle building' && !['muscle building', 'weight lifting'].includes(video.category)) {
                matches = false;
              } else if (goal === 'fat loss' && !['fat loss', 'HIIT', 'cardio'].includes(video.category)) {
                matches = false;
              } else if (goal === 'strength building' && !['weight lifting', 'deadlift'].includes(video.category)) {
                matches = false;
              } else if (goal === 'flexibility improvement' && video.category !== 'flexibility') {
                matches = false;
              }
            } else {
              matches = false;
            }
          }
          
          return matches;
        });
        
        // If no exact matches, broaden the search
        if (matchedVideos.length === 0) {
          matchedVideos = videos.filter(video => {
            if (goal === 'muscle building') {
              return ['muscle building', 'weight lifting'].includes(video.category);
            } else if (goal === 'fat loss') {
              return ['fat loss', 'HIIT', 'cardio'].includes(video.category);
            } else if (difficulty) {
              return video.difficulty === difficulty;
            }
            return false;
          });
        }
        
        // Sort by difficulty and relevance, limit to 5-8 videos
        matchedVideos = matchedVideos
          .sort((a, b) => {
            // Prioritize exact category matches
            if (category) {
              if (a.category === category && b.category !== category) return -1;
              if (b.category === category && a.category !== category) return 1;
            }
            return 0;
          })
          .slice(0, 6);
        
        const audioNotes = generateAudioNotes(matchedVideos, difficulty || 'intermediate', goal || 'fitness');
        
        return {
          matchedVideos,
          category: category || 'mixed',
          difficulty: difficulty || 'intermediate',
          goal: goal || 'general fitness',
          audioNotes
        };
      },
    }),
    {
      name: 'video-store',
    }
  )
);
