import React from 'react';

const ProgressDashboard = ({ userProgress }) => {
  // Sample course data (same as in CourseTree)
  const courseData = {
    lectures: [
      { id: 'intro-web-dev', title: 'Intro to web dev', duration: '15:30' },
      { id: 'frontend', title: 'Front end', duration: '22:45' },
      { id: 'backend', title: 'Back end', duration: '28:15' },
      { id: 'javascript', title: 'JavaScript', duration: '45:20' },
      { id: 'html', title: 'HTML', duration: '35:10' },
      { id: 'mysql', title: 'MySQL', duration: '40:30' },
      { id: 'linux-apache', title: 'Linux / Apache', duration: '50:45' }
    ]
  };

  const completedLectures = Object.values(userProgress).filter(p => p.completed).length;
  const totalLectures = courseData.lectures.length;
  const progressPercentage = Math.round((completedLectures / totalLectures) * 100);

  const getCompletionDate = (lectureId) => {
    const progress = userProgress[lectureId];
    return progress?.completedAt ? new Date(progress.completedAt).toLocaleDateString() : null;
  };

  const getTotalWatchTime = () => {
    // This would be calculated from actual watch times in a real app
    return courseData.lectures
      .filter(lecture => userProgress[lecture.id]?.completed)
      .reduce((total, lecture) => {
        const duration = lecture.duration.split(':');
        const minutes = parseInt(duration[0]) + parseInt(duration[1]) / 60;
        return total + minutes;
      }, 0);
  };

  const getStreakDays = () => {
    // This would be calculated from actual completion dates in a real app
    const completionDates = Object.values(userProgress)
      .filter(p => p.completed)
      .map(p => new Date(p.completedAt))
      .sort((a, b) => b - a);
    
    if (completionDates.length === 0) return 0;
    
    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < completionDates.length - 1; i++) {
      const current = new Date(completionDates[i]);
      const next = new Date(completionDates[i + 1]);
      current.setHours(0, 0, 0, 0);
      next.setHours(0, 0, 0, 0);
      
      const diffTime = current - next;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Overall Progress */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {progressPercentage}%
            </div>
            <div className="text-sm text-gray-600">Overall Progress</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Completed Lectures */}
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {completedLectures}/{totalLectures}
            </div>
            <div className="text-sm text-gray-600">Lectures Completed</div>
          </div>

          {/* Learning Streak */}
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {getStreakDays()}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>

        {/* Total Watch Time */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round(getTotalWatchTime())} minutes
          </div>
          <div className="text-sm text-gray-600">Total Learning Time</div>
        </div>
      </div>

      {/* Detailed Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lecture Progress</h3>
        
        <div className="space-y-3">
          {courseData.lectures.map((lecture, index) => {
            const isCompleted = userProgress[lecture.id]?.completed || false;
            const completionDate = getCompletionDate(lecture.id);
            
            return (
              <div 
                key={lecture.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      isCompleted ? 'text-green-900' : 'text-gray-900'
                    }`}>
                      {lecture.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Duration: {lecture.duration}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  {isCompleted ? (
                    <div>
                      <div className="text-sm font-medium text-green-800">
                        ✅ Completed
                      </div>
                      <div className="text-xs text-green-600">
                        {completionDate}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500">
                      🔒 Not Started
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First Lecture */}
          <div className={`p-4 rounded-lg border ${
            completedLectures >= 1 
              ? 'bg-yellow-50 border-yellow-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-2xl mb-2">
              {completedLectures >= 1 ? '🎯' : '🎯'}
            </div>
            <h4 className={`font-medium ${
              completedLectures >= 1 ? 'text-yellow-900' : 'text-gray-500'
            }`}>
              First Steps
            </h4>
            <p className="text-sm text-gray-600">
              Complete your first lecture
            </p>
          </div>

          {/* Halfway Point */}
          <div className={`p-4 rounded-lg border ${
            completedLectures >= Math.ceil(totalLectures / 2)
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-2xl mb-2">
              {completedLectures >= Math.ceil(totalLectures / 2) ? '🏆' : '🏆'}
            </div>
            <h4 className={`font-medium ${
              completedLectures >= Math.ceil(totalLectures / 2) ? 'text-blue-900' : 'text-gray-500'
            }`}>
              Halfway Hero
            </h4>
            <p className="text-sm text-gray-600">
              Complete half the course
            </p>
          </div>

          {/* Course Completion */}
          <div className={`p-4 rounded-lg border ${
            completedLectures === totalLectures
              ? 'bg-green-50 border-green-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="text-2xl mb-2">
              {completedLectures === totalLectures ? '🎓' : '🎓'}
            </div>
            <h4 className={`font-medium ${
              completedLectures === totalLectures ? 'text-green-900' : 'text-gray-500'
            }`}>
              Course Master
            </h4>
            <p className="text-sm text-gray-600">
              Complete the entire course
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
