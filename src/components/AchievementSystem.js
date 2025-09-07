import React, { useState, useEffect } from 'react';

const AchievementSystem = ({ userProgress, allLectures, darkMode }) => {
  const [achievements, setAchievements] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // Calculate achievements based on progress
  useEffect(() => {
    const completedCount = Object.values(userProgress).filter(p => p.completed).length;
    const totalLectures = allLectures.length;
    const completionPercentage = Math.round((completedCount / totalLectures) * 100);

    const newAchievements = [
      {
        id: 'first_lecture',
        title: 'Getting Started',
        description: 'Complete your first lecture',
        icon: '🎯',
        unlocked: completedCount >= 1,
        progress: Math.min(completedCount, 1),
        maxProgress: 1,
        rarity: 'common',
        xp: 10
      },
      {
        id: 'early_bird',
        title: 'Early Bird',
        description: 'Complete 5 lectures',
        icon: '🐦',
        unlocked: completedCount >= 5,
        progress: Math.min(completedCount, 5),
        maxProgress: 5,
        rarity: 'common',
        xp: 25
      },
      {
        id: 'dedicated_learner',
        title: 'Dedicated Learner',
        description: 'Complete 10 lectures',
        icon: '📚',
        unlocked: completedCount >= 10,
        progress: Math.min(completedCount, 10),
        maxProgress: 10,
        rarity: 'uncommon',
        xp: 50
      },
      {
        id: 'half_way',
        title: 'Halfway There',
        description: 'Complete 50% of the course',
        icon: '🏃‍♂️',
        unlocked: completionPercentage >= 50,
        progress: completionPercentage,
        maxProgress: 100,
        rarity: 'uncommon',
        xp: 75
      },
      {
        id: 'course_master',
        title: 'Course Master',
        description: 'Complete all lectures',
        icon: '👑',
        unlocked: completedCount === totalLectures,
        progress: completedCount,
        maxProgress: totalLectures,
        rarity: 'legendary',
        xp: 200
      },
      {
        id: 'speed_learner',
        title: 'Speed Learner',
        description: 'Complete 3 lectures in one day',
        icon: '⚡',
        unlocked: false, // This would need daily tracking
        progress: 0,
        maxProgress: 3,
        rarity: 'rare',
        xp: 100
      },
      {
        id: 'note_taker',
        title: 'Note Taker',
        description: 'Take notes in 5 different lectures',
        icon: '📝',
        unlocked: Object.values(userProgress).filter(p => p.notes && p.notes.trim()).length >= 5,
        progress: Object.values(userProgress).filter(p => p.notes && p.notes.trim()).length,
        maxProgress: 5,
        rarity: 'common',
        xp: 30
      },
      {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Complete 80% of the course',
        icon: '💎',
        unlocked: completionPercentage >= 80,
        progress: completionPercentage,
        maxProgress: 100,
        rarity: 'rare',
        xp: 150
      }
    ];

    setAchievements(newAchievements);
  }, [userProgress, allLectures]);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-100';
      case 'uncommon': return 'border-green-400 bg-green-100';
      case 'rare': return 'border-blue-400 bg-blue-100';
      case 'legendary': return 'border-purple-400 bg-purple-100';
      default: return 'border-gray-400 bg-gray-100';
    }
  };

  const getRarityColorDark = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-600 bg-gray-800';
      case 'uncommon': return 'border-green-600 bg-green-900/30';
      case 'rare': return 'border-blue-600 bg-blue-900/30';
      case 'legendary': return 'border-purple-600 bg-purple-900/30';
      default: return 'border-gray-600 bg-gray-800';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const displayedAchievements = showAll ? achievements : unlockedAchievements;

  const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700/30' : 'border-gray-200/50'} shadow-sm`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} px-6 py-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🏆 Achievements
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {unlockedAchievements.length} of {achievements.length} unlocked • {totalXP} XP earned
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800'}`}>
              ⭐ {totalXP} XP
            </div>
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-600 text-white hover:bg-gray-500' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {showAll ? 'Show Unlocked' : 'Show All'}
            </button>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="p-6">
        {displayedAchievements.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              No achievements yet
            </h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start completing lectures to unlock your first achievement!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? darkMode 
                      ? getRarityColorDark(achievement.rarity)
                      : getRarityColor(achievement.rarity)
                    : darkMode
                      ? 'border-gray-700 bg-gray-800/50 opacity-60'
                      : 'border-gray-300 bg-gray-100/50 opacity-60'
                } ${achievement.unlocked ? 'hover:scale-105 shadow-lg' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`text-2xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked
                              ? 'bg-gradient-to-r from-green-400 to-blue-500'
                              : 'bg-gray-400'
                          }`}
                          style={{
                            width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                        {achievement.progress} / {achievement.maxProgress}
                      </div>
                    </div>

                    {/* XP and Rarity */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        darkMode 
                          ? 'bg-yellow-900/30 text-yellow-300' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        +{achievement.xp} XP
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        achievement.rarity === 'legendary' 
                          ? darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'
                          : achievement.rarity === 'rare'
                          ? darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                          : achievement.rarity === 'uncommon'
                          ? darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                          : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievement Stats */}
        <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100/50'}`}>
          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
            Achievement Progress
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {unlockedAchievements.length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Unlocked
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {totalXP}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total XP
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Completion
              </div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Legendary
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementSystem;
