import React, { useState, useEffect } from 'react';

const NotesSystem = ({ lecture, userProgress, onSaveNotes, darkMode }) => {
  const [notes, setNotes] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);

  // Load existing notes for this lecture
  useEffect(() => {
    if (lecture && userProgress[lecture.id]?.notes) {
      setNotes(userProgress[lecture.id].notes);
      setSavedNotes(userProgress[lecture.id].savedNotes || []);
    } else {
      setNotes('');
      setSavedNotes([]);
    }
  }, [lecture, userProgress]);

  const handleSaveNote = async () => {
    if (!notes.trim()) return;
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newNote = {
      id: Date.now(),
      content: notes,
      timestamp: new Date().toISOString(),
      lectureId: lecture.id
    };
    
    const updatedSavedNotes = [...savedNotes, newNote];
    setSavedNotes(updatedSavedNotes);
    
    // Save to user progress
    onSaveNotes(lecture.id, notes, updatedSavedNotes);
    
    setNotes('');
    setIsSaving(false);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = savedNotes.filter(note => note.id !== noteId);
    setSavedNotes(updatedNotes);
    onSaveNotes(lecture.id, notes, updatedNotes);
  };

  if (!lecture) {
    return (
      <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-6 border ${darkMode ? 'border-gray-700/30' : 'border-gray-200/50'} shadow-sm`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Notes System
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a lecture to start taking notes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700/30' : 'border-gray-200/50'} shadow-sm`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'} px-6 py-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              📝 Notes for {lecture.title}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {savedNotes.length} saved notes
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Quick Note Input */}
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Quick Note
            </label>
            <div className="flex gap-3">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                className={`flex-1 px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                rows={3}
              />
              <button
                onClick={handleSaveNote}
                disabled={!notes.trim() || isSaving}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  !notes.trim() || isSaving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                }`}
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Note'
                )}
              </button>
            </div>
          </div>

          {/* Saved Notes */}
          {savedNotes.length > 0 && (
            <div>
              <h4 className={`text-md font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Saved Notes ({savedNotes.length})
              </h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {savedNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'} shadow-sm`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                          {note.content}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>
                          {new Date(note.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className={`ml-3 p-1 rounded ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tips */}
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800/30' : 'bg-blue-50 border border-blue-200'}`}>
            <h5 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-2`}>
              💡 Note-taking Tips
            </h5>
            <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
              <li>• Write key concepts and definitions</li>
              <li>• Note important code examples</li>
              <li>• Record questions for later review</li>
              <li>• Summarize main takeaways</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesSystem;
