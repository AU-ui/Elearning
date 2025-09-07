// Tree-based course data structure with multiple prerequisites and branches
export const treeCourseData = {
  id: 'web-dev-tree',
  title: 'Web Development Skill Tree',
  description: 'Master web development through interconnected learning paths',
  totalLectures: 20,
  estimatedDuration: '30+ hours',
  difficulty: 'Beginner to Advanced',
  
  // Tree structure with nodes and connections
  nodes: {
    // Foundation Layer (Root)
    'intro-web-dev': {
      id: 'intro-web-dev',
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development',
      youtubeId: 'qz0aGYrrlhU',
      duration: '1:09:34',
      prerequisites: [], // Root node
      children: ['html-basics', 'css-basics'], // Branches to HTML and CSS
      position: { x: 50, y: 10 }, // Root level
      difficulty: 'Beginner',
      category: 'Foundation',
      tags: ['introduction', 'fundamentals'],
      objectives: [
        'Understand web development basics',
        'Learn about client-server architecture',
        'Set up development environment'
      ],
      icon: '🌐'
    },

    // HTML Branch
    'html-basics': {
      id: 'html-basics',
      title: 'HTML Fundamentals',
      description: 'Master HTML structure and semantic elements',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['intro-web-dev'],
      children: ['html-advanced', 'accessibility'],
      position: { x: 25, y: 25 }, // Level 1 - Left branch
      difficulty: 'Beginner',
      category: 'HTML',
      tags: ['html', 'semantic', 'structure'],
      objectives: [
        'Learn HTML5 semantic elements',
        'Understand document structure',
        'Practice with forms and inputs'
      ],
      icon: '📄'
    },

    'html-advanced': {
      id: 'html-advanced',
      title: 'Advanced HTML',
      description: 'Advanced HTML features and best practices',
      youtubeId: 'vQWlgd7hV4A',
      duration: '1:45:00',
      prerequisites: ['html-basics'],
      children: ['responsive-design'],
      position: { x: 15, y: 40 }, // Level 2 - HTML branch
      difficulty: 'Intermediate',
      category: 'HTML',
      tags: ['html', 'advanced', 'best-practices'],
      objectives: [
        'Master advanced HTML features',
        'Learn HTML5 APIs',
        'Understand performance optimization'
      ],
      icon: '⚡'
    },

    // CSS Branch
    'css-basics': {
      id: 'css-basics',
      title: 'CSS Fundamentals',
      description: 'Learn CSS styling and layout basics',
      youtubeId: 'vQWlgd7hV4A',
      duration: '3:00:00',
      prerequisites: ['intro-web-dev'],
      children: ['css-advanced', 'responsive-design'],
      position: { x: 75, y: 25 }, // Level 1 - Right branch
      difficulty: 'Beginner',
      category: 'CSS',
      tags: ['css', 'styling', 'layout'],
      objectives: [
        'Master CSS selectors and properties',
        'Learn box model and positioning',
        'Understand CSS units and values'
      ],
      icon: '🎨'
    },

    'css-advanced': {
      id: 'css-advanced',
      title: 'Advanced CSS',
      description: 'Advanced CSS techniques and modern features',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:15:00',
      prerequisites: ['css-basics'],
      children: ['css-animations', 'css-grid-flexbox'],
      position: { x: 85, y: 40 }, // Level 2 - CSS branch
      difficulty: 'Intermediate',
      category: 'CSS',
      tags: ['css', 'advanced', 'modern'],
      objectives: [
        'Learn CSS Grid and Flexbox',
        'Master CSS animations and transitions',
        'Understand CSS custom properties'
      ],
      icon: '✨'
    },

    // Accessibility Branch
    'accessibility': {
      id: 'accessibility',
      title: 'Web Accessibility',
      description: 'Make your websites accessible to everyone',
      youtubeId: 'vQWlgd7hV4A',
      duration: '1:30:00',
      prerequisites: ['html-basics'],
      children: ['responsive-design'],
      position: { x: 35, y: 40 }, // Level 2 - Accessibility branch
      difficulty: 'Intermediate',
      category: 'Accessibility',
      tags: ['accessibility', 'a11y', 'inclusive'],
      objectives: [
        'Understand WCAG guidelines',
        'Learn ARIA attributes',
        'Test for accessibility'
      ],
      icon: '♿'
    },

    // Responsive Design (Convergence Point)
    'responsive-design': {
      id: 'responsive-design',
      title: 'Responsive Web Design',
      description: 'Create websites that work on all devices',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:00:00',
      prerequisites: ['html-advanced', 'css-advanced', 'accessibility'], // Multiple prerequisites
      children: ['javascript-basics', 'css-animations'],
      position: { x: 50, y: 55 }, // Level 3 - Convergence point
      difficulty: 'Intermediate',
      category: 'Design',
      tags: ['responsive', 'mobile-first', 'design'],
      objectives: [
        'Master responsive design principles',
        'Learn mobile-first approach',
        'Create flexible layouts'
      ],
      icon: '📱'
    },

    // CSS Animations Branch
    'css-animations': {
      id: 'css-animations',
      title: 'CSS Animations & Transitions',
      description: 'Bring your websites to life with animations',
      youtubeId: 'vQWlgd7hV4A',
      duration: '1:45:00',
      prerequisites: ['css-advanced', 'responsive-design'],
      children: ['javascript-basics'],
      position: { x: 75, y: 70 }, // Level 3 - CSS animations
      difficulty: 'Intermediate',
      category: 'CSS',
      tags: ['animations', 'transitions', 'interactions'],
      objectives: [
        'Master CSS animations',
        'Learn transition effects',
        'Create interactive elements'
      ],
      icon: '🎭'
    },

    'css-grid-flexbox': {
      id: 'css-grid-flexbox',
      title: 'CSS Grid & Flexbox Mastery',
      description: 'Advanced layout techniques with Grid and Flexbox',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['css-advanced'],
      children: ['javascript-basics'],
      position: { x: 95, y: 55 }, // Level 3 - CSS Grid/Flexbox
      difficulty: 'Advanced',
      category: 'CSS',
      tags: ['grid', 'flexbox', 'layout'],
      objectives: [
        'Master CSS Grid layouts',
        'Learn Flexbox techniques',
        'Combine Grid and Flexbox'
      ],
      icon: '🔲'
    },

    // JavaScript Branch (Major Convergence)
    'javascript-basics': {
      id: 'javascript-basics',
      title: 'JavaScript Fundamentals',
      description: 'Learn the programming language of the web',
      youtubeId: 'vQWlgd7hV4A',
      duration: '4:00:00',
      prerequisites: ['responsive-design', 'css-animations', 'css-grid-flexbox'], // Multiple paths lead here
      children: ['javascript-dom', 'javascript-async'],
      position: { x: 50, y: 85 }, // Level 4 - JavaScript convergence
      difficulty: 'Beginner',
      category: 'JavaScript',
      tags: ['javascript', 'programming', 'fundamentals'],
      objectives: [
        'Learn JavaScript syntax and concepts',
        'Understand variables and functions',
        'Master control structures'
      ],
      icon: '⚡'
    },

    'javascript-dom': {
      id: 'javascript-dom',
      title: 'JavaScript DOM Manipulation',
      description: 'Interact with web pages using JavaScript',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['javascript-basics'],
      children: ['javascript-async', 'react-basics'],
      position: { x: 25, y: 100 }, // Level 5 - JavaScript DOM
      difficulty: 'Intermediate',
      category: 'JavaScript',
      tags: ['dom', 'manipulation', 'events'],
      objectives: [
        'Master DOM manipulation',
        'Handle user events',
        'Create interactive web pages'
      ],
      icon: '🎯'
    },

    'javascript-async': {
      id: 'javascript-async',
      title: 'Asynchronous JavaScript',
      description: 'Master promises, async/await, and API calls',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:45:00',
      prerequisites: ['javascript-basics'],
      children: ['react-basics', 'node-basics'],
      position: { x: 75, y: 100 }, // Level 5 - JavaScript Async
      difficulty: 'Advanced',
      category: 'JavaScript',
      tags: ['async', 'promises', 'apis'],
      objectives: [
        'Understand asynchronous programming',
        'Master Promises and async/await',
        'Work with APIs and fetch'
      ],
      icon: '🔄'
    },

    // React Branch
    'react-basics': {
      id: 'react-basics',
      title: 'React Fundamentals',
      description: 'Build user interfaces with React',
      youtubeId: 'vQWlgd7hV4A',
      duration: '3:30:00',
      prerequisites: ['javascript-dom', 'javascript-async'], // Multiple paths
      children: ['react-advanced', 'react-hooks'],
      position: { x: 50, y: 115 }, // Level 6 - React convergence
      difficulty: 'Intermediate',
      category: 'React',
      tags: ['react', 'components', 'jsx'],
      objectives: [
        'Learn React components and JSX',
        'Understand props and state',
        'Build interactive UIs'
      ],
      icon: '⚛️'
    },

    'react-advanced': {
      id: 'react-advanced',
      title: 'Advanced React Patterns',
      description: 'Master advanced React concepts and patterns',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:45:00',
      prerequisites: ['react-basics'],
      children: ['fullstack-project'],
      position: { x: 35, y: 130 }, // Level 7 - React Advanced
      difficulty: 'Advanced',
      category: 'React',
      tags: ['react', 'patterns', 'advanced'],
      objectives: [
        'Learn advanced React patterns',
        'Master performance optimization',
        'Understand React ecosystem'
      ],
      icon: '🚀'
    },

    'react-hooks': {
      id: 'react-hooks',
      title: 'React Hooks & State Management',
      description: 'Modern React with hooks and state management',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:15:00',
      prerequisites: ['react-basics'],
      children: ['fullstack-project'],
      position: { x: 65, y: 130 }, // Level 7 - React Hooks
      difficulty: 'Advanced',
      category: 'React',
      tags: ['hooks', 'state', 'management'],
      objectives: [
        'Master React Hooks',
        'Learn state management patterns',
        'Build complex applications'
      ],
      icon: '🎣'
    },

    // Node.js Branch
    'node-basics': {
      id: 'node-basics',
      title: 'Node.js & Backend Development',
      description: 'Build server-side applications with Node.js',
      youtubeId: 'vQWlgd7hV4A',
      duration: '3:00:00',
      prerequisites: ['javascript-async'],
      children: ['express-api', 'database-basics'],
      position: { x: 80, y: 115 }, // Level 6 - Node.js
      difficulty: 'Intermediate',
      category: 'Backend',
      tags: ['nodejs', 'backend', 'server'],
      objectives: [
        'Learn Node.js fundamentals',
        'Understand server-side programming',
        'Build RESTful APIs'
      ],
      icon: '🟢'
    },

    'express-api': {
      id: 'express-api',
      title: 'Express.js & API Development',
      description: 'Build robust APIs with Express.js',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:30:00',
      prerequisites: ['node-basics'],
      children: ['fullstack-project'],
      position: { x: 70, y: 130 }, // Level 7 - Express API
      difficulty: 'Advanced',
      category: 'Backend',
      tags: ['express', 'api', 'rest'],
      objectives: [
        'Master Express.js framework',
        'Build RESTful APIs',
        'Handle authentication and middleware'
      ],
      icon: '🚂'
    },

    'database-basics': {
      id: 'database-basics',
      title: 'Database Design & MongoDB',
      description: 'Learn database design and MongoDB',
      youtubeId: 'vQWlgd7hV4A',
      duration: '2:00:00',
      prerequisites: ['node-basics'],
      children: ['fullstack-project'],
      position: { x: 90, y: 130 }, // Level 7 - Database
      difficulty: 'Intermediate',
      category: 'Database',
      tags: ['database', 'mongodb', 'design'],
      objectives: [
        'Learn database design principles',
        'Master MongoDB operations',
        'Understand data modeling'
      ],
      icon: '🗄️'
    },

    // Final Project (Ultimate Convergence)
    'fullstack-project': {
      id: 'fullstack-project',
      title: 'Full-Stack Web Application',
      description: 'Build a complete full-stack web application',
      youtubeId: 'vQWlgd7hV4A',
      duration: '4:00:00',
      prerequisites: ['react-advanced', 'react-hooks', 'express-api', 'database-basics'], // All paths converge here
      children: [], // Final node
      position: { x: 50, y: 145 }, // Level 8 - Final Project (All paths converge here)
      difficulty: 'Advanced',
      category: 'Project',
      tags: ['fullstack', 'project', 'portfolio'],
      objectives: [
        'Build a complete web application',
        'Integrate frontend and backend',
        'Deploy to production'
      ],
      icon: '🎯'
    }
  },

  // Helper functions
  getNode: (nodeId) => treeCourseData.nodes[nodeId],
  
  getChildren: (nodeId) => {
    const node = treeCourseData.nodes[nodeId];
    return node ? node.children.map(childId => treeCourseData.nodes[childId]) : [];
  },
  
  getPrerequisites: (nodeId) => {
    const node = treeCourseData.nodes[nodeId];
    return node ? node.prerequisites.map(prereqId => treeCourseData.nodes[prereqId]) : [];
  },
  
  getAllNodes: () => Object.values(treeCourseData.nodes),
  
  getRootNodes: () => Object.values(treeCourseData.nodes).filter(node => node.prerequisites.length === 0),
  
  getLeafNodes: () => Object.values(treeCourseData.nodes).filter(node => node.children.length === 0),
  
  getConvergenceNodes: () => Object.values(treeCourseData.nodes).filter(node => node.prerequisites.length > 1),
  
  getBranchNodes: () => Object.values(treeCourseData.nodes).filter(node => node.children.length > 1)
};

export default treeCourseData;
