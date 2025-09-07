import React, { useState, useEffect } from 'react';

const LecturePlayer = ({ lecture, onLectureComplete }) => {
  const [watchTime, setWatchTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    if (lecture) {
      setWatchTime(0);
      setIsCompleted(false);
    }
  }, [lecture]);

  // Force English language for YouTube videos
  useEffect(() => {
    const forceEnglish = () => {
      // Set document language
      document.documentElement.lang = 'en-US';
      document.documentElement.setAttribute('translate', 'no');
      
      // Set browser language preferences
      if (navigator.language) {
        Object.defineProperty(navigator, 'language', {
          value: 'en-US',
          writable: false
        });
      }
      
      // Prevent Google Translate
      if (window.google && window.google.translate) {
        window.google.translate.TranslateElement = null;
      }
      
      // Set iframe language
      const iframes = document.querySelectorAll('iframe[src*="youtube"]');
      iframes.forEach(iframe => {
        iframe.setAttribute('translate', 'no');
        iframe.style.translate = 'no';
        iframe.setAttribute('lang', 'en');
      });
      
      // Force YouTube to use English
      const script = document.createElement('script');
      script.innerHTML = `
        window.ytInitialPlayerResponse = window.ytInitialPlayerResponse || {};
        window.ytInitialPlayerResponse.captions = null;
        window.ytInitialPlayerResponse.captions = {
          playerCaptionsTracklistRenderer: {
            captionTracks: [],
            defaultAudioTrackIndex: -1
          }
        };
      `;
      document.head.appendChild(script);
    };

    forceEnglish();
    
    // Re-apply on any DOM changes
    const observer = new MutationObserver(forceEnglish);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [lecture]);

  const handleVideoProgress = (event) => {
    const video = event.target;
    const progress = (video.currentTime / video.duration) * 100;
    setWatchTime(progress);
    
    // Mark as completed when 90% watched
    if (progress >= 90 && !isCompleted) {
      setIsCompleted(true);
      setShowCompletionModal(true);
      onLectureComplete(lecture.id);
    }
  };

  const handleCompleteLecture = () => {
    setIsCompleted(true);
    onLectureComplete(lecture.id);
    setShowCompletionModal(false);
  };

  if (!lecture) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="text-gray-400 text-8xl mb-6">📚</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          No Lecture Selected
        </h2>
        <p className="text-gray-500 text-lg mb-6">
          Please select a lecture from the Course Tree to start learning.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-blue-800 text-sm">
            💡 Tip: Click on any unlocked lecture in the Course Tree to begin your learning journey!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative bg-black">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube-nocookie.com/embed/${lecture.youtubeId}?hl=en&cc_lang_pref=en&cc_load_policy=0&iv_load_policy=3&rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0&loop=0&start=0&end=0&wmode=opaque&theme=light&color=red&playsinline=1&origin=${window.location.origin}&enablejsapi=1&gl=US&region=US`}
          title={lecture.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-96 md:h-[500px]"
          style={{ translate: 'no' }}
          sandbox="allow-scripts allow-same-origin allow-presentation"
        ></iframe>
        
        {/* Progress Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center justify-between text-white mb-3">
            <span className="text-lg font-semibold">
              {lecture.title}
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-sm bg-black/50 px-3 py-1 rounded-full">
                {Math.round(watchTime)}% watched
              </span>
              {isCompleted && (
                <span className="text-sm bg-green-600 px-3 py-1 rounded-full">
                  ✅ Completed
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${watchTime}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lecture Information */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {lecture.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {lecture.difficulty}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {lecture.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {lecture.description}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-3">
            <div className="text-right">
              <span className="text-sm text-gray-500">Duration</span>
              <p className="text-lg font-semibold text-gray-900">{lecture.duration}</p>
            </div>
            {isCompleted && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✅ Completed
              </span>
            )}
          </div>
        </div>

        {/* Lecture Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            {!isCompleted && (
              <button
                onClick={handleCompleteLecture}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <span className="mr-2">✓</span>
                Mark as Complete
              </button>
            )}
            
            {isCompleted && (
              <div className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600">
                <span className="mr-2">✅</span>
                Lecture Completed
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Watch Progress</div>
              <div className="text-lg font-semibold text-gray-900">{Math.round(watchTime)}%</div>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${watchTime}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Congratulations!
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                You've completed <span className="font-semibold text-blue-600">"{lecture.title}"</span>! 
                The next lectures are now unlocked.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  🚀 Keep up the great work! You're making excellent progress in your learning journey.
                </p>
              </div>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LecturePlayer;
