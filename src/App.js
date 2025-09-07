import React, { useState } from 'react';
import CleanTreeView from './components/CleanTreeView';
import LecturePlayer from './components/LecturePlayer';
import ProgressDashboard from './components/ProgressDashboard';
import LecturePreview from './components/LecturePreview';
import NotesSystem from './components/NotesSystem';
import AchievementSystem from './components/AchievementSystem';
import ProgressAnalytics from './components/ProgressAnalytics';

function App() {
  const [activeTab, setActiveTab] = useState('family-tree');
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [previewLecture, setPreviewLecture] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const tabs = [
    { id: 'family-tree', label: 'Learning Tree', icon: '🌳' },
    { id: 'lectures', label: 'Lectures', icon: '📚' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'notes', label: 'Notes', icon: '📝' }
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

  const handlePreviewLecture = (lecture) => {
    setPreviewLecture(lecture);
    setShowPreview(true);
  };

  const handleSaveNotes = (lectureId, notes, savedNotes) => {
    setUserProgress(prev => ({
      ...prev,
      [lectureId]: { 
        ...prev[lectureId], 
        notes: notes,
        savedNotes: savedNotes
      }
    }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Animated Background - Only show in light mode */}
      {!darkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      )}

      {/* Header */}
      <header className={`relative ${darkMode ? 'bg-gray-800/80 border-gray-700/20' : 'bg-white/80 border-white/20'} backdrop-blur-md shadow-lg border-b`}>
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
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Master web development step by step</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome back!</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Continue your learning journey</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl ${darkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
              >
                <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4">
          {/* Vertical Tabs Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/20' : 'bg-white/70 border-white/20'} backdrop-blur-md rounded-2xl shadow-xl border p-4`}>
              <div className="mb-4">
                <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>Navigation</h2>
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
                        : `${darkMode ? 'text-gray-300 hover:bg-gray-700/80' : 'text-gray-600 hover:bg-white/80'} hover:shadow-md`
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : `${darkMode ? 'bg-gray-700 group-hover:bg-gray-600' : 'bg-gray-100 group-hover:bg-blue-100'}`
                    }`}>
                      <span className="text-lg">{tab.icon}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{tab.label}</span>
                      <p className={`text-xs mt-1 ${
                        activeTab === tab.id ? 'text-white/80' : `${darkMode ? 'text-gray-400' : 'text-gray-500'}`
                      }`}>
                        {tab.id === 'family-tree' && 'Family tree learning path'}
                        {tab.id === 'lectures' && 'Watch video lessons'}
                        {tab.id === 'progress' && 'Track your progress'}
                        {tab.id === 'analytics' && 'Detailed insights'}
                        {tab.id === 'achievements' && 'Unlock badges'}
                        {tab.id === 'notes' && 'Take notes'}
                      </p>
                    </div>
                    {activeTab === tab.id && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </nav>
              
              {/* Progress Summary */}
              <div className={`mt-4 p-3 ${darkMode ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600/50' : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200/50'} rounded-xl border`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Overall Progress</span>
                  <span className="text-sm font-bold text-green-600">
                    {Math.round((Object.values(userProgress).filter(p => p.completed).length / 18) * 100)}%
                  </span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(Object.values(userProgress).filter(p => p.completed).length / 18) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  {Object.values(userProgress).filter(p => p.completed).length} of 18 lectures completed
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'family-tree' && (
              <CleanTreeView 
                onLectureSelect={handleLectureSelect}
                userProgress={userProgress}
                darkMode={darkMode}
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
            {activeTab === 'analytics' && (
              <ProgressAnalytics 
                userProgress={userProgress}
                allLectures={[]} // This would come from the tree data
                darkMode={darkMode}
              />
            )}
            {activeTab === 'achievements' && (
              <AchievementSystem 
                userProgress={userProgress}
                allLectures={[]} // This would come from the tree data
                darkMode={darkMode}
              />
            )}
            {activeTab === 'notes' && (
              <NotesSystem 
                lecture={selectedLecture}
                userProgress={userProgress}
                onSaveNotes={handleSaveNotes}
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </div>

      {/* Lecture Preview Modal */}
      <LecturePreview
        lecture={previewLecture}
        isVisible={showPreview}
        onClose={() => setShowPreview(false)}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;