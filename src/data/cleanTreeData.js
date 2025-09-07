// Clean Family Tree Structure for Web Development Course
export const cleanTreeData = {
  id: 'web-dev-family-tree',
  title: 'Web Development Family Tree',
  description: 'Learn web development through a clear family tree structure',
  totalLectures: 15,
  estimatedDuration: '25+ hours',
  difficulty: 'Beginner to Advanced',
  
  // Clean tree structure with proper levels
  nodes: {
    // ROOT LEVEL (Generation 1) - Top of family tree
    'web-dev-intro': {
      id: 'web-dev-intro',
      title: 'Web Development Basics',
      description: 'Start your web development journey',
      youtubeId: 'qz0aGYrrlhU',
      duration: '1:30:00',
      prerequisites: [],
      children: ['html-fundamentals', 'css-fundamentals'],
      level: 1,
      position: { x: 50, y: 8 },
      difficulty: 'Beginner',
      category: 'Foundation',
      tags: ['basics', 'introduction'],
      objectives: ['Understand web development', 'Set up environment'],
      icon: '🌐'
    },

    // LEVEL 2 (Generation 2) - Two main branches
    'html-fundamentals': {
      id: 'html-fundamentals',
      title: 'HTML Fundamentals',
      description: 'Master HTML structure and elements',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:00:00',
      prerequisites: ['web-dev-intro'],
      children: ['html-advanced', 'responsive-html'],
      level: 2,
      position: { x: 25, y: 20 },
      difficulty: 'Beginner',
      category: 'HTML',
      tags: ['html', 'structure'],
      objectives: ['Learn HTML elements', 'Create forms'],
      icon: '📄'
    },

    'css-fundamentals': {
      id: 'css-fundamentals',
      title: 'CSS Fundamentals',
      description: 'Learn CSS styling and layout',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['web-dev-intro'],
      children: ['css-advanced', 'responsive-css'],
      level: 2,
      position: { x: 75, y: 20 },
      difficulty: 'Beginner',
      category: 'CSS',
      tags: ['css', 'styling'],
      objectives: ['Master CSS selectors', 'Learn layouts'],
      icon: '🎨'
    },

    // LEVEL 3 (Generation 3) - Four branches
    'html-advanced': {
      id: 'html-advanced',
      title: 'Advanced HTML',
      description: 'Advanced HTML features and APIs',
      youtubeId: 'vQWlgd7hV4A',
      duration: '1:45:00',
      prerequisites: ['html-fundamentals'],
      children: ['javascript-basics'],
      level: 3,
      position: { x: 15, y: 32 },
      difficulty: 'Intermediate',
      category: 'HTML',
      tags: ['html5', 'apis'],
      objectives: ['Learn HTML5 APIs', 'Advanced features'],
      icon: '⚡'
    },

    'responsive-html': {
      id: 'responsive-html',
      title: 'Responsive HTML',
      description: 'HTML for responsive design',
      youtubeId: 'vQWlgd7hV4A',
      duration: '1:30:00',
      prerequisites: ['html-fundamentals'],
      children: ['javascript-basics'],
      level: 3,
      position: { x: 35, y: 32 },
      difficulty: 'Intermediate',
      category: 'HTML',
      tags: ['responsive', 'mobile'],
      objectives: ['Mobile-first HTML', 'Semantic elements'],
      icon: '📱'
    },

    'css-advanced': {
      id: 'css-advanced',
      title: 'Advanced CSS',
      description: 'Advanced CSS techniques',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:00:00',
      prerequisites: ['css-fundamentals'],
      children: ['javascript-basics'],
      level: 3,
      position: { x: 65, y: 32 },
      difficulty: 'Intermediate',
      category: 'CSS',
      tags: ['advanced', 'animations'],
      objectives: ['CSS Grid & Flexbox', 'Animations'],
      icon: '✨'
    },

    'responsive-css': {
      id: 'responsive-css',
      title: 'Responsive CSS',
      description: 'CSS for responsive design',
      youtubeId: 'vQWlgd7hV4A',
      duration: '1:45:00',
      prerequisites: ['css-fundamentals'],
      children: ['javascript-basics'],
      level: 3,
      position: { x: 85, y: 32 },
      difficulty: 'Intermediate',
      category: 'CSS',
      tags: ['responsive', 'media-queries'],
      objectives: ['Media queries', 'Flexible layouts'],
      icon: '📐'
    },

    // LEVEL 4 (Generation 4) - Convergence to JavaScript
    'javascript-basics': {
      id: 'javascript-basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn the programming language of the web',
      youtubeId: 'vQWlgd7hV4A',
      duration: '3:00:00',
      prerequisites: ['html-advanced', 'responsive-html', 'css-advanced', 'responsive-css'],
      children: ['javascript-dom', 'javascript-async'],
      level: 4,
      position: { x: 50, y: 44 },
      difficulty: 'Beginner',
      category: 'JavaScript',
      tags: ['javascript', 'programming'],
      objectives: ['JS syntax', 'Variables & functions'],
      icon: '⚡'
    },

    // LEVEL 5 (Generation 5) - JavaScript branches
    'javascript-dom': {
      id: 'javascript-dom',
      title: 'JavaScript DOM',
      description: 'Interact with web pages using JavaScript',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['javascript-basics'],
      children: ['react-basics'],
      level: 5,
      position: { x: 30, y: 56 },
      difficulty: 'Intermediate',
      category: 'JavaScript',
      tags: ['dom', 'events'],
      objectives: ['DOM manipulation', 'Event handling'],
      icon: '🎯'
    },

    'javascript-async': {
      id: 'javascript-async',
      title: 'Async JavaScript',
      description: 'Promises, async/await, and APIs',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:45:00',
      prerequisites: ['javascript-basics'],
      children: ['node-basics'],
      level: 5,
      position: { x: 70, y: 56 },
      difficulty: 'Advanced',
      category: 'JavaScript',
      tags: ['async', 'promises'],
      objectives: ['Async programming', 'API calls'],
      icon: '🔄'
    },

    // LEVEL 6 (Generation 6) - Framework branches
    'react-basics': {
      id: 'react-basics',
      title: 'React Fundamentals',
      description: 'Build user interfaces with React',
      youtubeId: 'vQWlgd7hV4A',
      duration: '3:30:00',
      prerequisites: ['javascript-dom'],
      children: ['fullstack-project'],
      level: 6,
      position: { x: 30, y: 68 },
      difficulty: 'Intermediate',
      category: 'React',
      tags: ['react', 'components'],
      objectives: ['React components', 'Props & state'],
      icon: '⚛️'
    },

    'node-basics': {
      id: 'node-basics',
      title: 'Node.js Backend',
      description: 'Build server-side applications',
      youtubeId: 'vQWlgd7hV4A',
      duration: '3:00:00',
      prerequisites: ['javascript-async'],
      children: ['fullstack-project'],
      level: 6,
      position: { x: 70, y: 68 },
      difficulty: 'Intermediate',
      category: 'Backend',
      tags: ['nodejs', 'backend'],
      objectives: ['Server-side JS', 'APIs'],
      icon: '🟢'
    },

    // LEVEL 7 (Generation 7) - Final convergence with multiple leaf nodes
    'fullstack-project': {
      id: 'fullstack-project',
      title: 'Full-Stack Project',
      description: 'Build a complete web application',
      youtubeId: 'vQWlgd7hV4A',
      duration: '4:00:00',
      prerequisites: ['react-basics', 'node-basics'],
      children: ['deployment', 'testing', 'optimization'],
      level: 7,
      position: { x: 50, y: 80 },
      difficulty: 'Advanced',
      category: 'Project',
      tags: ['fullstack', 'project'],
      objectives: ['Complete app', 'Deploy to production'],
      icon: '🎯'
    },

    // LEVEL 8 (Generation 8) - Final leaf nodes (cards at edges)
    'deployment': {
      id: 'deployment',
      title: 'Deployment & DevOps',
      description: 'Deploy your application to production',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['fullstack-project'],
      children: [],
      level: 8,
      position: { x: 25, y: 92 },
      difficulty: 'Advanced',
      category: 'DevOps',
      tags: ['deployment', 'devops'],
      objectives: ['Deploy to cloud', 'CI/CD pipeline'],
      icon: '🚀'
    },

    'testing': {
      id: 'testing',
      title: 'Testing & Quality',
      description: 'Write tests and ensure code quality',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:00:00',
      prerequisites: ['fullstack-project'],
      children: [],
      level: 8,
      position: { x: 50, y: 92 },
      difficulty: 'Advanced',
      category: 'Testing',
      tags: ['testing', 'quality'],
      objectives: ['Unit tests', 'Integration tests'],
      icon: '🧪'
    },

    'optimization': {
      id: 'optimization',
      title: 'Performance Optimization',
      description: 'Optimize your application for speed',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:15:00',
      prerequisites: ['fullstack-project'],
      children: [],
      level: 8,
      position: { x: 75, y: 92 },
      difficulty: 'Advanced',
      category: 'Performance',
      tags: ['optimization', 'performance'],
      objectives: ['Speed optimization', 'SEO'],
      icon: '⚡'
    }
  },

  // Helper functions
  getNode: (nodeId) => cleanTreeData.nodes[nodeId],
  
  getChildren: (nodeId) => {
    const node = cleanTreeData.nodes[nodeId];
    return node ? node.children.map(childId => cleanTreeData.nodes[childId]) : [];
  },
  
  getPrerequisites: (nodeId) => {
    const node = cleanTreeData.nodes[nodeId];
    return node ? node.prerequisites.map(prereqId => cleanTreeData.nodes[prereqId]) : [];
  },
  
  getAllNodes: () => Object.values(cleanTreeData.nodes),
  
  getRootNodes: () => Object.values(cleanTreeData.nodes).filter(node => node.prerequisites.length === 0),
  
  getLeafNodes: () => Object.values(cleanTreeData.nodes).filter(node => node.children.length === 0),
  
  getNodesByLevel: (level) => Object.values(cleanTreeData.nodes).filter(node => node.level === level),
  
  getConvergenceNodes: () => Object.values(cleanTreeData.nodes).filter(node => node.prerequisites.length > 1),
  
  getBranchNodes: () => Object.values(cleanTreeData.nodes).filter(node => node.children.length > 1)
};

export default cleanTreeData;
