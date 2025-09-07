import React, { useState, useMemo } from 'react';

const CourseTree = ({ onLectureSelect, userProgress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('order');
  const [darkMode, setDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(null);
  // Enhanced course data with comprehensive YouTube video IDs for web development
  const courseData = {
    id: 'web-dev-course',
    title: 'Complete Web Development Course / Skill Tree',
    lectures: [
      // Foundation Level
      {
        id: 'intro-web-dev',
        title: 'Intro to web dev',
        description: 'Introduction to web development fundamentals',
        youtubeId: 'qz0aGYrrlhU', // HTML Crash Course - Mosh Hamedani (English)
        duration: '1:09:34',
        prerequisites: [],
        order: 1,
        difficulty: 'Beginner',
        category: 'Foundation'
      },
      {
        id: 'html-css',
        title: 'HTML & CSS',
        description: 'Complete HTML and CSS tutorial',
        youtubeId: 'vQWlgd7hV4A', // HTML & CSS Full Course - freeCodeCamp
        duration: '6:18:38',
        prerequisites: ['intro-web-dev'],
        order: 2,
        difficulty: 'Beginner',
        category: 'Foundation'
      },
      {
        id: 'javascript-basics',
        title: 'JavaScript Basics',
        description: 'JavaScript programming fundamentals',
        youtubeId: 'PkZNo7MFNFg', // JavaScript Tutorial - Mosh Hamedani
        duration: '1:37:26',
        prerequisites: ['html-css'],
        order: 3,
        difficulty: 'Beginner',
        category: 'Foundation'
      },
      
      // Frontend Development
      {
        id: 'frontend',
        title: 'Frontend Development',
        description: 'Frontend development basics and tools',
        youtubeId: '3JluqTojuME', // Frontend Development - Traversy Media
        duration: '22:45',
        prerequisites: ['javascript-basics'],
        order: 4,
        difficulty: 'Intermediate',
        category: 'Frontend'
      },
      {
        id: 'react',
        title: 'React.js',
        description: 'Complete React.js tutorial',
        youtubeId: 'SqcY0GlETPk', // React Tutorial - Programming with Mosh
        duration: '4:40:00',
        prerequisites: ['frontend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Frontend'
      },
      {
        id: 'vue',
        title: 'Vue.js',
        description: 'Vue.js framework tutorial',
        youtubeId: 'qZXt1Aom3Cs', // Vue.js Tutorial - Programming with Mosh
        duration: '3:00:00',
        prerequisites: ['frontend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Frontend'
      },
      {
        id: 'angular',
        title: 'Angular',
        description: 'Angular framework tutorial',
        youtubeId: 'k5E2AVpusko', // Angular Tutorial - Programming with Mosh
        duration: '2:00:00',
        prerequisites: ['frontend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Frontend'
      },
      
      // Backend Development
      {
        id: 'backend',
        title: 'Backend Development',
        description: 'Backend development fundamentals',
        youtubeId: 'Oe421EPjeBE', // Backend Development - Traversy Media
        duration: '28:15',
        prerequisites: ['javascript-basics'],
        order: 4,
        difficulty: 'Intermediate',
        category: 'Backend'
      },
      {
        id: 'nodejs',
        title: 'Node.js',
        description: 'Node.js server-side JavaScript',
        youtubeId: 'TlB_eWDSMt4', // Node.js Tutorial - Programming with Mosh
        duration: '2:00:00',
        prerequisites: ['backend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Backend'
      },
      {
        id: 'python',
        title: 'Python',
        description: 'Python programming language',
        youtubeId: 'kqtD5dpn9C8', // Python Tutorial - Programming with Mosh
        duration: '6:14:07',
        prerequisites: ['backend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Backend'
      },
      {
        id: 'php',
        title: 'PHP',
        description: 'PHP server-side scripting',
        youtubeId: 'OK_JCtrrv-c', // PHP Tutorial - Programming with Mosh
        duration: '4:00:00',
        prerequisites: ['backend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Backend'
      },
      
      // Database
      {
        id: 'mysql',
        title: 'MySQL',
        description: 'MySQL database management',
        youtubeId: '7S_tz1z_5bA', // MySQL Tutorial - Programming with Mosh
        duration: '3:10:00',
        prerequisites: ['backend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Database'
      },
      {
        id: 'mongodb',
        title: 'MongoDB',
        description: 'MongoDB NoSQL database',
        youtubeId: '-56x56UppqQ', // MongoDB Tutorial - Web Dev Simplified
        duration: '1:00:00',
        prerequisites: ['backend'],
        order: 5,
        difficulty: 'Intermediate',
        category: 'Database'
      },
      
      // DevOps & Server
      {
        id: 'linux-apache',
        title: 'Linux / Apache',
        description: 'Linux and Apache server management',
        youtubeId: 'ROjZy1WbMIA', // Linux Tutorial - Programming with Mosh
        duration: '2:00:00',
        prerequisites: ['backend'],
        order: 6,
        difficulty: 'Advanced',
        category: 'DevOps'
      },
      {
        id: 'docker',
        title: 'Docker',
        description: 'Docker containerization',
        youtubeId: 'pTFZFxd4hOI', // Docker Tutorial - Programming with Mosh
        duration: '1:00:00',
        prerequisites: ['linux-apache'],
        order: 7,
        difficulty: 'Advanced',
        category: 'DevOps'
      },
      {
        id: 'aws',
        title: 'AWS',
        description: 'Amazon Web Services cloud platform',
        youtubeId: 'SJVsEHiQfrE', // AWS Tutorial - freeCodeCamp
        duration: '1:00:00',
        prerequisites: ['docker'],
        order: 8,
        difficulty: 'Advanced',
        category: 'DevOps'
      },
      
      // Tools & Technologies
      {
        id: 'git',
        title: 'Git & GitHub',
        description: 'Version control with Git and GitHub',
        youtubeId: '8JJ101D3knE', // Git Tutorial - Programming with Mosh
        duration: '1:00:00',
        prerequisites: ['javascript-basics'],
        order: 4,
        difficulty: 'Beginner',
        category: 'Tools'
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        description: 'TypeScript programming language',
        youtubeId: 'BwuLxPH8IDs', // TypeScript Tutorial - Programming with Mosh
        duration: '1:00:00',
        prerequisites: ['javascript-basics'],
        order: 4,
        difficulty: 'Intermediate',
        category: 'Tools'
      }
    ]
  };

  const isLectureUnlocked = (lecture) => {
    if (lecture.prerequisites.length === 0) return true;
    return lecture.prerequisites.every(prereq => 
      userProgress[prereq]?.completed
    );
  };

  const isLectureCompleted = (lectureId) => {
    return userProgress[lectureId]?.completed || false;
  };

  const getLectureStatus = (lecture) => {
    if (isLectureCompleted(lecture.id)) return 'completed';
    if (isLectureUnlocked(lecture)) return 'unlocked';
    return 'locked';
  };

  const getConnectionStatus = (lecture, index) => {
    const currentStatus = getLectureStatus(lecture);
    const nextLecture = courseData.lectures[index + 1];
    
    if (!nextLecture) return null;
    
    const nextStatus = getLectureStatus(nextLecture);
    
    // If current is completed and next is unlocked/completed, show connected
    if (currentStatus === 'completed' && (nextStatus === 'unlocked' || nextStatus === 'completed')) {
      return 'connected';
    }
    
    // If current is completed but next is locked, show partial connection
    if (currentStatus === 'completed' && nextStatus === 'locked') {
      return 'partial';
    }
    
    // If current is unlocked but next is locked, show disconnected
    if (currentStatus === 'unlocked' && nextStatus === 'locked') {
      return 'disconnected';
    }
    
    return null;
  };

  // Get unique categories and difficulties for filter options
  const categories = useMemo(() => {
    const cats = [...new Set(courseData.lectures.map(lecture => lecture.category))];
    return ['All', ...cats];
  }, []);

  const difficulties = useMemo(() => {
    const diffs = [...new Set(courseData.lectures.map(lecture => lecture.difficulty))];
    return ['All', ...diffs];
  }, []);

  // Filter and sort lectures
  const filteredLectures = useMemo(() => {
    let filtered = courseData.lectures.filter(lecture => {
      const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lecture.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || lecture.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || lecture.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort lectures
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'status':
          const statusOrder = { 'completed': 1, 'unlocked': 2, 'locked': 3 };
          return statusOrder[getLectureStatus(a)] - statusOrder[getLectureStatus(b)];
        default:
          return a.order - b.order;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy, userProgress]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'unlocked': return 'bg-blue-500';
      case 'locked': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'unlocked': return '🔓';
      case 'locked': return '🔒';
      default: return '🔒';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Foundation': return 'bg-purple-100 text-purple-800';
      case 'Frontend': return 'bg-blue-100 text-blue-800';
      case 'Backend': return 'bg-orange-100 text-orange-800';
      case 'Database': return 'bg-green-100 text-green-800';
      case 'DevOps': return 'bg-red-100 text-red-800';
      case 'Tools': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Achievement system
  const getAchievements = () => {
    const completedCount = Object.values(userProgress).filter(p => p.completed).length;
    const achievements = [];
    
    if (completedCount >= 1) achievements.push({ icon: '🎯', title: 'First Steps', description: 'Completed your first lecture!' });
    if (completedCount >= 5) achievements.push({ icon: '🔥', title: 'On Fire', description: 'Completed 5 lectures!' });
    if (completedCount >= 10) achievements.push({ icon: '💪', title: 'Halfway Hero', description: 'Completed 10 lectures!' });
    if (completedCount >= 15) achievements.push({ icon: '🚀', title: 'Almost There', description: 'Completed 15 lectures!' });
    if (completedCount >= 18) achievements.push({ icon: '🏆', title: 'Course Master', description: 'Completed all lectures!' });
    
    return achievements;
  };

  const achievements = getAchievements();

  // Group lectures by order for better visualization
  const lecturesByOrder = courseData.lectures.reduce((acc, lecture) => {
    if (!acc[lecture.order]) acc[lecture.order] = [];
    acc[lecture.order].push(lecture);
    return acc;
  }, {});

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 animate-slide-in-up">
      <div className="text-left mb-4 ml-12">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-3 shadow-lg animate-float">
          <span className="text-xl">🚀</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            {courseData.title}
          </h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p className="text-sm text-gray-600">Master web development step by step with our comprehensive learning path</p>
        
        {/* Progress Flow Indicator */}
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Learning Path Progress:</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                <span>Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="ml-12 mb-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50 shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🏆</span>
              Your Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white/80 rounded-xl p-4 shadow-sm border border-yellow-200/30 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{achievement.icon}</span>
                    <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Advanced Search and Filter Controls */}
      <div className="ml-12 mb-6">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Lectures</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'order', label: 'Default Order' },
                { value: 'title', label: 'Title' },
                { value: 'difficulty', label: 'Difficulty' },
                { value: 'duration', label: 'Duration' },
                { value: 'status', label: 'Status' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    sortBy === option.value
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredLectures.length} of {courseData.lectures.length} lectures
          </div>
        </div>
      </div>
      
      <div className="ml-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative">
          {filteredLectures.map((lecture, index) => {
            const status = getLectureStatus(lecture);
            const isUnlocked = status !== 'locked';
            const connectionStatus = getConnectionStatus(lecture, index);
            
            return (
              <div key={lecture.id} className="flex flex-col relative">
                {/* Lecture Node */}
                <div
                  className={`group relative w-full p-4 rounded-2xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                    isUnlocked
                      ? 'border-blue-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/25'
                      : 'border-gray-300 cursor-not-allowed opacity-60'
                  } ${status === 'completed' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg shadow-green-500/20' : 'bg-white/90 backdrop-blur-sm'}`}
                  onClick={() => isUnlocked && onLectureSelect(lecture)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                      {/* Status Indicator */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getStatusColor(status)} flex items-center justify-center text-white text-xs shadow-lg transition-all duration-300 group-hover:scale-110 ${
                        status === 'completed' ? 'animate-pulse-glow' : ''
                      }`}>
                        {getStatusIcon(status)}
                      </div>
                      
                      {/* Category Badge */}
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(lecture.category)} shadow-sm transition-all duration-300 group-hover:scale-105`}>
                        {lecture.category}
                      </div>
                      
                      <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                        {lecture.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {lecture.description}
                      </p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {lecture.duration}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lecture.difficulty)} shadow-sm`}>
                          {lecture.difficulty}
                        </span>
                      </div>
                      
                      {/* Course Stats */}
                      <div className="flex justify-center mb-3">
                        <div className="flex items-center justify-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                            <span>18 Lectures</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                            <span>6 Categories</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                            <span>Sequential</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <span className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 transform group-hover:scale-105 ${
                          status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/25' :
                          status === 'unlocked' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {status === 'completed' ? '✅ Completed' : 
                           status === 'unlocked' ? '🚀 Start Learning' : 
                           '🔒 Locked'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Connection Indicator */}
                    {connectionStatus && connectionStatus !== 'disconnected' && (
                      <div className="flex justify-center mt-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ${
                          connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                          connectionStatus === 'partial' ? 'bg-yellow-500' :
                          'bg-red-400'
                        }`}>
                          {connectionStatus === 'connected' ? '✓' : 
                           connectionStatus === 'partial' ? '⏳' : 
                           ''}
                        </div>
                      </div>
                    )}
                    
                    {/* Connection Line to Next Card */}
                    {connectionStatus === 'connected' && index < courseData.lectures.length - 1 && (
                      <div className="absolute top-1/2 -right-3 w-6 h-0.5 bg-green-500 transform -translate-y-1/2 z-10"></div>
                    )}
                  </div>
              );
            })}
        </div>
      </div>
      
      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200/50 shadow-lg">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">Learning Progress</h3>
          <p className="text-sm text-gray-600">Track your journey through the complete web development course</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Object.values(userProgress).filter(p => p.completed).length}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {courseData.lectures.length}
            </div>
            <div className="text-xs text-gray-600">Total Lectures</div>
          </div>
          <div className="text-center p-3 bg-white/70 rounded-xl shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round((Object.values(userProgress).filter(p => p.completed).length / courseData.lectures.length) * 100)}%
            </div>
            <div className="text-xs text-gray-600">Progress</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
          <div 
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ 
              width: `${(Object.values(userProgress).filter(p => p.completed).length / courseData.lectures.length) * 100}%` 
            }}
          ></div>
        </div>
        
        <div className="flex justify-center mt-3">
          <div className="text-xs text-gray-500">
            {Object.values(userProgress).filter(p => p.completed).length === 0 && "Start your learning journey!"}
            {Object.values(userProgress).filter(p => p.completed).length > 0 && Object.values(userProgress).filter(p => p.completed).length < courseData.lectures.length && "Keep up the great work! 🚀"}
            {Object.values(userProgress).filter(p => p.completed).length === courseData.lectures.length && "Congratulations! You've completed the entire course! 🎉"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTree;
