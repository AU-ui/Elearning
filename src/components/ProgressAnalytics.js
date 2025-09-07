import React, { useState, useMemo } from 'react';

const ProgressAnalytics = ({ userProgress, allLectures, darkMode }) => {
  const [timeRange, setTimeRange] = useState('all'); // 'week', 'month', 'all'
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Calculate analytics data
  const analytics = useMemo(() => {
    const completedLectures = Object.values(userProgress).filter(p => p.completed);
    const totalLectures = allLectures.length;
    const completionPercentage = Math.round((completedLectures.length / totalLectures) * 100);

    // Calculate time spent (simulated - in real app this would come from actual data)
    const estimatedTimePerLecture = 15; // minutes
    const totalTimeSpent = completedLectures.length * estimatedTimePerLecture;
    const hoursSpent = Math.floor(totalTimeSpent / 60);
    const minutesSpent = totalTimeSpent % 60;

    // Calculate category progress
    const categoryProgress = {};
    allLectures.forEach(lecture => {
      if (!categoryProgress[lecture.category]) {
        categoryProgress[lecture.category] = { total: 0, completed: 0 };
      }
      categoryProgress[lecture.category].total++;
      if (userProgress[lecture.id]?.completed) {
        categoryProgress[lecture.category].completed++;
      }
    });

    // Calculate learning streak (simulated)
    const learningStreak = Math.min(completedLectures.length, 7); // Max 7 days

    // Calculate average completion time (simulated)
    const avgCompletionTime = 12; // minutes

    // Calculate difficulty distribution
    const difficultyStats = { beginner: 0, intermediate: 0, advanced: 0 };
    completedLectures.forEach(progress => {
      const lecture = allLectures.find(l => l.id === progress.lectureId);
      if (lecture) {
        difficultyStats[lecture.difficulty] = (difficultyStats[lecture.difficulty] || 0) + 1;
      }
    });

    return {
      totalLectures,
      completedLectures: completedLectures.length,
      completionPercentage,
      totalTimeSpent,
      hoursSpent,
      minutesSpent,
      categoryProgress,
      learningStreak,
      avgCompletionTime,
      difficultyStats
    };
  }, [userProgress, allLectures]);

  const categories = Object.keys(analytics.categoryProgress);

  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700/30' : 'border-gray-200/50'} shadow-sm`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} px-6 py-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              📊 Progress Analytics
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Detailed insights into your learning journey
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-3 py-1 text-sm border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/30' : 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>Completion</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  {analytics.completionPercentage}%
                </p>
              </div>
              <div className="text-2xl">🎯</div>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-700/30' : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>Lectures</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
                  {analytics.completedLectures}/{analytics.totalLectures}
                </p>
              </div>
              <div className="text-2xl">📚</div>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-700/30' : 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>Time Spent</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  {analytics.hoursSpent}h {analytics.minutesSpent}m
                </p>
              </div>
              <div className="text-2xl">⏱️</div>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-700/30' : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>Streak</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  {analytics.learningStreak} days
                </p>
              </div>
              <div className="text-2xl">🔥</div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'}`}>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Overall Progress
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Course Completion</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{analytics.completionPercentage}%</span>
              </div>
              <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${analytics.completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'}`}>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Progress by Category
          </h4>
          <div className="space-y-3">
            {categories.map(category => {
              const progress = analytics.categoryProgress[category];
              const percentage = Math.round((progress.completed / progress.total) * 100);
              
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{category}</span>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {progress.completed}/{progress.total} ({percentage}%)
                    </span>
                  </div>
                  <div className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'}`}>
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              Learning Insights
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Avg. Time per Lecture</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{analytics.avgCompletionTime} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Estimated Remaining</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {Math.round((analytics.totalLectures - analytics.completedLectures) * analytics.avgCompletionTime)} min
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Completion Rate</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {analytics.completedLectures > 0 ? '100%' : '0%'}
                </span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'}`}>
            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
              Difficulty Distribution
            </h4>
            <div className="space-y-2">
              {Object.entries(analytics.difficultyStats).map(([difficulty, count]) => (
                <div key={difficulty} className="flex justify-between text-sm">
                  <span className={`capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {difficulty}
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'}`}>
          <div className="text-center">
            <div className="text-2xl mb-2">
              {analytics.completionPercentage >= 80 ? '🎉' : 
               analytics.completionPercentage >= 50 ? '🚀' : 
               analytics.completionPercentage >= 25 ? '💪' : '🌟'}
            </div>
            <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-2`}>
              {analytics.completionPercentage >= 80 ? 'Almost There!' : 
               analytics.completionPercentage >= 50 ? 'Great Progress!' : 
               analytics.completionPercentage >= 25 ? 'Keep Going!' : 'You\'re Getting Started!'}
            </h4>
            <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              {analytics.completionPercentage >= 80 ? 
                `Just ${analytics.totalLectures - analytics.completedLectures} more lectures to complete the course!` :
                `You've completed ${analytics.completedLectures} lectures. Keep up the great work!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
