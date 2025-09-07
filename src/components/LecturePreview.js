import React, { useState, useEffect } from 'react';

const LecturePreview = ({ lecture, isVisible, onClose, darkMode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true);
      // Simulate loading time
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, lecture]);

  if (!isVisible || !lecture) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideInUp`}>
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {lecture.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Preview • {lecture.duration} • {lecture.category}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Video Preview */}
              <div className="relative">
                <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative group">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${lecture.youtubeId}?autoplay=0&controls=1&modestbranding=1&rel=0&showinfo=0&start=0&end=30&hl=en&cc_lang_pref=en&cc_load_policy=0&iv_load_policy=3&fs=1&disablekb=0&controls=1&showinfo=0&autoplay=0&loop=0&playlist=${lecture.youtubeId}&start=0&end=30&wmode=opaque&theme=light&color=red&playsinline=1&gl=US&region=US`}
                    title={lecture.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ translate: 'no' }}
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-4">
                      <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  30s Preview
                </div>
              </div>

              {/* Lecture Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                    About this lecture
                  </h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {lecture.description}
                  </p>
                </div>
                
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                    Learning Objectives
                  </h4>
                  <ul className="space-y-2">
                    {lecture.objectives?.map((objective, index) => (
                      <li key={index} className={`flex items-start text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              {lecture.tags && lecture.tags.length > 0 && (
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lecture.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    // This would trigger the main lecture player
                    onClose();
                    // You can add a callback here to start the full lecture
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Full Lecture
                </button>
                <button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Close Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LecturePreview;
