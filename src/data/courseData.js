// Enhanced nested JSON course data structure
export const courseData = {
  id: 'web-dev-course',
  title: 'Complete Web Development Course / Skill Tree',
  description: 'Master web development step by step with our comprehensive learning path',
  totalLectures: 18,
  estimatedDuration: '25+ hours',
  difficulty: 'Beginner to Advanced',
  categories: {
    foundation: {
      id: 'foundation',
      name: 'Foundation',
      description: 'Essential web development fundamentals',
      color: 'purple',
      icon: '🏗️',
      lectures: [
        {
          id: 'intro-web-dev',
          title: 'Intro to web dev',
          description: 'Introduction to web development fundamentals',
          youtubeId: 'qz0aGYrrlhU',
          duration: '1:09:34',
          prerequisites: [],
          order: 1,
          difficulty: 'Beginner',
          category: 'Foundation',
          tags: ['html', 'basics', 'introduction'],
          learningObjectives: [
            'Understand web development basics',
            'Learn HTML structure',
            'Set up development environment'
          ]
        },
        {
          id: 'html-css',
          title: 'HTML & CSS',
          description: 'Complete HTML and CSS tutorial',
          youtubeId: 'vQWlgd7hV4A',
          duration: '6:18:38',
          prerequisites: ['intro-web-dev'],
          order: 2,
          difficulty: 'Beginner',
          category: 'Foundation',
          tags: ['html', 'css', 'styling'],
          learningObjectives: [
            'Master HTML semantic elements',
            'Learn CSS styling techniques',
            'Create responsive layouts'
          ]
        },
        {
          id: 'javascript-basics',
          title: 'JavaScript Basics',
          description: 'JavaScript programming fundamentals',
          youtubeId: 'PkZNo7MFNFg',
          duration: '1:37:26',
          prerequisites: ['html-css'],
          order: 3,
          difficulty: 'Beginner',
          category: 'Foundation',
          tags: ['javascript', 'programming', 'basics'],
          learningObjectives: [
            'Learn JavaScript syntax',
            'Understand variables and functions',
            'Work with DOM manipulation'
          ]
        }
      ]
    },
    frontend: {
      id: 'frontend',
      name: 'Frontend Development',
      description: 'Modern frontend frameworks and libraries',
      color: 'blue',
      icon: '⚛️',
      lectures: [
        {
          id: 'frontend',
          title: 'Frontend Development',
          description: 'Frontend development basics and tools',
          youtubeId: '3JluqTojuME',
          duration: '22:45',
          prerequisites: ['javascript-basics'],
          order: 4,
          difficulty: 'Intermediate',
          category: 'Frontend',
          tags: ['frontend', 'tools', 'development'],
          learningObjectives: [
            'Understand frontend architecture',
            'Learn modern development tools',
            'Set up build processes'
          ]
        },
        {
          id: 'react-js',
          title: 'React.js',
          description: 'Complete React.js tutorial for beginners',
          youtubeId: 'SqcY0GlETPk',
          duration: '1:25:00',
          prerequisites: ['frontend'],
          order: 5,
          difficulty: 'Intermediate',
          category: 'Frontend',
          tags: ['react', 'jsx', 'components'],
          learningObjectives: [
            'Learn React components',
            'Understand state management',
            'Build interactive UIs'
          ]
        },
        {
          id: 'vue-js',
          title: 'Vue.js',
          description: 'Vue.js framework tutorial',
          youtubeId: 'qZXt1Aom3Cs',
          duration: '1:20:00',
          prerequisites: ['react-js'],
          order: 6,
          difficulty: 'Intermediate',
          category: 'Frontend',
          tags: ['vue', 'framework', 'progressive'],
          learningObjectives: [
            'Master Vue.js fundamentals',
            'Learn component composition',
            'Understand reactivity system'
          ]
        },
        {
          id: 'angular',
          title: 'Angular',
          description: 'Angular framework complete guide',
          youtubeId: 'Fdf5aTYRW0E',
          duration: '1:30:00',
          prerequisites: ['vue-js'],
          order: 7,
          difficulty: 'Advanced',
          category: 'Frontend',
          tags: ['angular', 'typescript', 'enterprise'],
          learningObjectives: [
            'Learn Angular architecture',
            'Master TypeScript integration',
            'Build enterprise applications'
          ]
        }
      ]
    },
    backend: {
      id: 'backend',
      name: 'Backend Development',
      description: 'Server-side development and APIs',
      color: 'green',
      icon: '🖥️',
      lectures: [
        {
          id: 'node-js',
          title: 'Node.js',
          description: 'Node.js backend development',
          youtubeId: 'fBNz5xF-Kx4',
          duration: '1:15:00',
          prerequisites: ['angular'],
          order: 8,
          difficulty: 'Intermediate',
          category: 'Backend',
          tags: ['nodejs', 'javascript', 'server'],
          learningObjectives: [
            'Learn Node.js fundamentals',
            'Build REST APIs',
            'Handle asynchronous operations'
          ]
        },
        {
          id: 'python-django',
          title: 'Python & Django',
          description: 'Python web development with Django',
          youtubeId: 'F5mRW0jo-U4',
          duration: '1:40:00',
          prerequisites: ['node-js'],
          order: 9,
          difficulty: 'Intermediate',
          category: 'Backend',
          tags: ['python', 'django', 'mvc'],
          learningObjectives: [
            'Master Python web development',
            'Learn Django framework',
            'Build scalable applications'
          ]
        },
        {
          id: 'php-laravel',
          title: 'PHP & Laravel',
          description: 'PHP development with Laravel framework',
          youtubeId: 'ImtZ5yENzgE',
          duration: '1:35:00',
          prerequisites: ['python-django'],
          order: 10,
          difficulty: 'Intermediate',
          category: 'Backend',
          tags: ['php', 'laravel', 'mvc'],
          learningObjectives: [
            'Learn PHP fundamentals',
            'Master Laravel framework',
            'Build robust web applications'
          ]
        }
      ]
    },
    database: {
      id: 'database',
      name: 'Database Management',
      description: 'Database design and management',
      color: 'yellow',
      icon: '🗄️',
      lectures: [
        {
          id: 'mysql',
          title: 'MySQL Database',
          description: 'MySQL database management',
          youtubeId: '7S_tz1z_5bA',
          duration: '1:10:00',
          prerequisites: ['php-laravel'],
          order: 11,
          difficulty: 'Beginner',
          category: 'Database',
          tags: ['mysql', 'sql', 'relational'],
          learningObjectives: [
            'Learn SQL fundamentals',
            'Design database schemas',
            'Optimize database performance'
          ]
        },
        {
          id: 'mongodb',
          title: 'MongoDB',
          description: 'NoSQL database with MongoDB',
          youtubeId: '-56x5UZZ9WE',
          duration: '1:25:00',
          prerequisites: ['mysql'],
          order: 12,
          difficulty: 'Intermediate',
          category: 'Database',
          tags: ['mongodb', 'nosql', 'document'],
          learningObjectives: [
            'Understand NoSQL concepts',
            'Learn MongoDB operations',
            'Design document schemas'
          ]
        }
      ]
    },
    devops: {
      id: 'devops',
      name: 'DevOps & Deployment',
      description: 'Deployment and infrastructure management',
      color: 'red',
      icon: '🚀',
      lectures: [
        {
          id: 'docker',
          title: 'Docker',
          description: 'Containerization with Docker',
          youtubeId: 'pTFZFxd4hOI',
          duration: '1:20:00',
          prerequisites: ['mongodb'],
          order: 13,
          difficulty: 'Advanced',
          category: 'DevOps',
          tags: ['docker', 'containers', 'deployment'],
          learningObjectives: [
            'Learn containerization concepts',
            'Master Docker commands',
            'Deploy containerized applications'
          ]
        },
        {
          id: 'aws',
          title: 'AWS Cloud',
          description: 'Amazon Web Services cloud platform',
          youtubeId: 'SORaoH8Hwv4',
          duration: '1:45:00',
          prerequisites: ['docker'],
          order: 14,
          difficulty: 'Advanced',
          category: 'DevOps',
          tags: ['aws', 'cloud', 'infrastructure'],
          learningObjectives: [
            'Understand cloud computing',
            'Learn AWS services',
            'Deploy scalable applications'
          ]
        }
      ]
    },
    tools: {
      id: 'tools',
      name: 'Development Tools',
      description: 'Essential development tools and utilities',
      color: 'indigo',
      icon: '🛠️',
      lectures: [
        {
          id: 'git-github',
          title: 'Git & GitHub',
          description: 'Version control with Git and GitHub',
          youtubeId: '8JJ101D3knE',
          duration: '1:00:00',
          prerequisites: ['aws'],
          order: 15,
          difficulty: 'Beginner',
          category: 'Tools',
          tags: ['git', 'github', 'version-control'],
          learningObjectives: [
            'Master Git version control',
            'Learn GitHub workflows',
            'Collaborate on projects'
          ]
        },
        {
          id: 'typescript',
          title: 'TypeScript',
          description: 'TypeScript programming language',
          youtubeId: 'BwuLxPH8IDs',
          duration: '1:30:00',
          prerequisites: ['git-github'],
          order: 16,
          difficulty: 'Intermediate',
          category: 'Tools',
          tags: ['typescript', 'types', 'javascript'],
          learningObjectives: [
            'Learn TypeScript syntax',
            'Understand type systems',
            'Build type-safe applications'
          ]
        },
        {
          id: 'webpack',
          title: 'Webpack',
          description: 'Module bundler and build tool',
          youtubeId: 'MpGLUVbqoYQ',
          duration: '1:15:00',
          prerequisites: ['typescript'],
          order: 17,
          difficulty: 'Advanced',
          category: 'Tools',
          tags: ['webpack', 'bundler', 'build-tool'],
          learningObjectives: [
            'Master Webpack configuration',
            'Optimize build processes',
            'Handle asset management'
          ]
        },
        {
          id: 'final-project',
          title: 'Final Project',
          description: 'Complete full-stack web application',
          youtubeId: 'ZtSWb2r4l4w',
          duration: '2:00:00',
          prerequisites: ['webpack'],
          order: 18,
          difficulty: 'Advanced',
          category: 'Tools',
          tags: ['project', 'fullstack', 'portfolio'],
          learningObjectives: [
            'Build complete web application',
            'Integrate all learned technologies',
            'Deploy to production'
          ]
        }
      ]
    }
  }
};

// Helper functions for nested JSON structure
export const getCategoryById = (categoryId) => {
  return courseData.categories[categoryId];
};

export const getLectureById = (lectureId) => {
  for (const category of Object.values(courseData.categories)) {
    const lecture = category.lectures.find(l => l.id === lectureId);
    if (lecture) return lecture;
  }
  return null;
};

export const getAllLectures = () => {
  return Object.values(courseData.categories).flatMap(category => category.lectures);
};

export const getLecturesByCategory = (categoryId) => {
  return courseData.categories[categoryId]?.lectures || [];
};

export const getCategoryStats = () => {
  const stats = {};
  Object.values(courseData.categories).forEach(category => {
    stats[category.id] = {
      name: category.name,
      lectureCount: category.lectures.length,
      totalDuration: category.lectures.reduce((total, lecture) => {
        const [hours, minutes, seconds] = lecture.duration.split(':').map(Number);
        return total + (hours * 3600 + minutes * 60 + seconds);
      }, 0),
      difficulties: [...new Set(category.lectures.map(l => l.difficulty))],
      tags: [...new Set(category.lectures.flatMap(l => l.tags))]
    };
  });
  return stats;
};

export default courseData;
