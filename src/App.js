import React, { useState } from 'react';
import CourseTree from './components/CourseTree';
import LecturePlayer from './components/LecturePlayer';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('course-tree');
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  const tabs = [
    { id: 'course-tree', label: 'Course Tree', icon: '🌳' },
    { id: 'lectures', label: 'Lectures', icon: '📚' },
    { id: 'progress', label: 'Progress', icon: '📊' }
  ];

  const handleLectureSelect = (lecture) => {
    setSelectedLecture(lecture);
    setActiveTab('lectures');
  };

  const handleLectureComplete = (lectureId) => {
    setUserProgress(prev => ({
      ...prev,
      [lectureId]: { completed: true, completedAt: new Date() }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Platform
                </h1>
                <p className="text-sm text-gray-500">Master web development step by step</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                  <p className="text-xs text-gray-500">Continue your learning journey</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200 shadow-sm">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7.5a7.5 7.5 0 1 1 15 0V17z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4">
          {/* Vertical Tabs Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-4">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-800 mb-1">Navigation</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <nav className="space-y-2">
                {tabs.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group w-full flex items-center px-3 py-3 text-left rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-600 hover:bg-white/80 hover:shadow-md'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-gray-100 group-hover:bg-blue-100'
                    }`}>
                      <span className="text-lg">{tab.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{tab.label}</span>
                      <p className={`text-xs mt-1 ${
                        activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {tab.id === 'course-tree' && 'Explore learning path'}
                        {tab.id === 'lectures' && 'Watch video lessons'}
                        {tab.id === 'progress' && 'Track your progress'}
                      </p>
                    </div>
                    {activeTab === tab.id && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </nav>
              
              {/* Progress Summary */}
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-green-600">
                    {Math.round((Object.values(userProgress).filter(p => p.completed).length / 18) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(Object.values(userProgress).filter(p => p.completed).length / 18) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {Object.values(userProgress).filter(p => p.completed).length} of 18 lectures completed
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'course-tree' && (
              <CourseTree 
                onLectureSelect={handleLectureSelect}
                userProgress={userProgress}
              />
            )}
            {activeTab === 'lectures' && (
              <LecturePlayer 
                lecture={selectedLecture}
                onLectureComplete={handleLectureComplete}
              />
            )}
            {activeTab === 'progress' && (
              <ProgressDashboard userProgress={userProgress} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;