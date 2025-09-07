import React, { useState, useMemo } from 'react';
import { cleanTreeData } from '../data/cleanTreeData';

const CleanTreeView = ({ onLectureSelect, userProgress, darkMode, selectedLecture }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all nodes from clean tree structure
  const allNodes = cleanTreeData.getAllNodes();
  const maxLevel = Math.max(...allNodes.map(node => node.level));

  // Helper functions
  const isNodeUnlocked = (node) => {
    if (node.prerequisites.length === 0) return true; // Root nodes are always unlocked
    return node.prerequisites.every(prereqId => userProgress[prereqId]?.completed);
  };

  const isNodeCompleted = (nodeId) => {
    return userProgress[nodeId]?.completed || false;
  };

  const getNodeStatus = (node) => {
    if (isNodeCompleted(node.id)) return 'completed';
    if (isNodeUnlocked(node)) return 'unlocked';
    return 'locked';
  };

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
      case 'completed': return '✓';
      case 'unlocked': return '▶';
      case 'locked': return '🔒';
      default: return '?';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Foundation': 'bg-purple-100 text-purple-800 border-purple-200',
      'HTML': 'bg-orange-100 text-orange-800 border-orange-200',
      'CSS': 'bg-blue-100 text-blue-800 border-blue-200',
      'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'React': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Backend': 'bg-green-100 text-green-800 border-green-200',
      'Project': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Filter nodes
  const filteredNodes = useMemo(() => {
    let filtered = allNodes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(node =>
        node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(node => node.level.toString() === selectedLevel);
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(node => node.category === selectedCategory);
    }

    return filtered;
  }, [allNodes, searchTerm, selectedLevel, selectedCategory]);

  // Get unique levels and categories
  const levels = useMemo(() => {
    const levelNumbers = [...new Set(allNodes.map(node => node.level))].sort((a, b) => a - b);
    return ['All', ...levelNumbers.map(level => `Level ${level}`)];
  }, [allNodes]);

  const categories = useMemo(() => {
    const cats = [...new Set(allNodes.map(node => node.category))];
    return ['All', ...cats];
  }, [allNodes]);

  // Render family tree connections
  const renderTreeConnections = () => {
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {allNodes.map(node => {
          if (node.children.length === 0) return null;
          
          return node.children.map(childId => {
            const child = cleanTreeData.getNode(childId);
            if (!child) return null;

            const startX = node.position.x;
            const startY = node.position.y + 8; // Start from bottom of parent card
            const endX = child.position.x;
            const endY = child.position.y - 8; // End at top of child card

            const isCompleted = isNodeCompleted(node.id);
            const isChildUnlocked = isNodeUnlocked(child);

            // Create family tree connections with arrows
            const midY = startY + (endY - startY) / 2;
            const connectionColor = isCompleted && isChildUnlocked ? '#10b981' : '#dc2626'; // Green or red like in the image

            return (
              <g key={`${node.id}-${childId}`}>
                {/* Vertical line from parent */}
                <line
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${startX}%`}
                  y2={`${midY}%`}
                  stroke={connectionColor}
                  strokeWidth="4"
                  className="transition-all duration-500"
                />
                
                {/* Horizontal line to child */}
                <line
                  x1={`${startX}%`}
                  y1={`${midY}%`}
                  x2={`${endX}%`}
                  y2={`${midY}%`}
                  stroke={connectionColor}
                  strokeWidth="4"
                  className="transition-all duration-500"
                />
                
                {/* Vertical line to child */}
                <line
                  x1={`${endX}%`}
                  y1={`${midY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke={connectionColor}
                  strokeWidth="4"
                  className="transition-all duration-500"
                />
                
                {/* Arrow pointing down to child */}
                <polygon
                  points={`${endX}%,${endY - 2}% ${endX - 1}%,${endY + 1}% ${endX + 1}%,${endY + 1}%`}
                  fill={connectionColor}
                  className="transition-all duration-500"
                />
              </g>
            );
          });
        })}
      </svg>
    );
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'} backdrop-blur-md rounded-2xl shadow-2xl border ${darkMode ? 'border-gray-700/20' : 'border-white/20'} p-4 animate-slide-in-up relative overflow-hidden`}>
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-800/20 to-gray-900/20' : 'bg-gradient-to-br from-blue-50/30 to-purple-50/30'} pointer-events-none`}></div>
      
      <div className="text-left mb-4 ml-12 relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-3 shadow-lg animate-float">
          <span className="text-xl">🌳</span>
        </div>
        <div className="mb-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
            {cleanTreeData.title}
          </h2>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cleanTreeData.description}</p>
        
        {/* Tree Stats */}
        <div className={`mt-4 p-3 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50'} rounded-xl border`}>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                🌱 {cleanTreeData.getRootNodes().length} Root Node
              </span>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                🌿 {cleanTreeData.getBranchNodes().length} Branch Points
              </span>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                🔄 {cleanTreeData.getConvergenceNodes().length} Convergence Points
              </span>
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                📊 {maxLevel} Levels Deep
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="ml-12 mb-6 relative z-10">
        <div className={`${darkMode ? 'bg-gray-800/70 border-gray-700/20' : 'bg-white/70 border-white/20'} backdrop-blur-md rounded-2xl shadow-xl border p-6 relative overflow-hidden`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Search Nodes</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg`}
              >
                {levels.map(level => (
                  <option key={level} value={level === 'All' ? 'All' : level.split(' ')[1]}>{level}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg`}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className={`mt-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {filteredNodes.length} of {allNodes.length} nodes
          </div>
        </div>
      </div>

      {/* Family Tree Layout */}
      <div className="ml-12 relative z-10">
        <div className="relative min-h-screen overflow-x-auto">
          {/* Tree Connections */}
          {renderTreeConnections()}
          
          {/* Family Tree Nodes */}
          <div className="relative" style={{ zIndex: 2, minWidth: '1200px', minHeight: '800px' }}>
            {filteredNodes.map((node, index) => {
              const status = getNodeStatus(node);
              const isUnlocked = status !== 'locked';
              
              return (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${node.position.x}%`,
                    top: `${node.position.y}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Family Tree Card */}
                  <div
                    className={`group relative w-56 p-4 rounded-xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                      selectedLecture && selectedLecture.id === node.id
                        ? 'border-pink-400 bg-gradient-to-br from-pink-50 to-rose-50 shadow-lg shadow-pink-500/30'
                        : isUnlocked
                          ? 'border-blue-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/25'
                          : 'border-gray-300 cursor-not-allowed opacity-60'
                    } ${status === 'completed' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg shadow-green-500/20' : darkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} relative overflow-hidden`}
                    onClick={() => isUnlocked && onLectureSelect(node)}
                  >
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    
                    {/* Status Indicator */}
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${getStatusColor(status)} flex items-center justify-center text-white text-xs shadow-lg transition-all duration-300 group-hover:scale-110 ${
                      status === 'completed' ? 'animate-pulse-glow' : ''
                    }`}>
                      {getStatusIcon(status)}
                    </div>
                    
                    {/* Level Badge */}
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      Level {node.level}
                    </div>
                    
                    {/* Category Badge */}
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ml-1 ${getCategoryColor(node.category)} shadow-sm transition-all duration-300 group-hover:scale-105`}>
                      {node.category}
                    </div>
                    
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2 text-sm group-hover:text-blue-600 transition-colors duration-300`}>
                      {node.title}
                    </h3>
                    <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-3 leading-relaxed ${darkMode ? 'group-hover:text-gray-200' : 'group-hover:text-gray-700'} transition-colors duration-300`}>
                      {node.description}
                    </p>
                    
                    {/* Node Stats */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded-full ${getDifficultyColor(node.difficulty)}`}>
                        {node.difficulty}
                      </span>
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {node.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className={`mt-6 p-4 ${darkMode ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-gray-600/50' : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200/50'} rounded-2xl border shadow-lg`}>
        <div className="text-center mb-4">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>Family Tree Progress</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Navigate through generations of learning</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={`text-center p-3 ${darkMode ? 'bg-gray-700/70' : 'bg-white/70'} rounded-xl shadow-sm`}>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Object.values(userProgress).filter(p => p.completed).length}
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Completed</div>
          </div>
          <div className={`text-center p-3 ${darkMode ? 'bg-gray-700/70' : 'bg-white/70'} rounded-xl shadow-sm`}>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {allNodes.length}
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Nodes</div>
          </div>
          <div className={`text-center p-3 ${darkMode ? 'bg-gray-700/70' : 'bg-white/70'} rounded-xl shadow-sm`}>
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round((Object.values(userProgress).filter(p => p.completed).length / allNodes.length) * 100)}%
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Progress</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
          <div 
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ 
              width: `${(Object.values(userProgress).filter(p => p.completed).length / allNodes.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CleanTreeView;
