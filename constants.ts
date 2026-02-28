export const AVAILABLE_SKILLS = [
  '3D PRINTING CONCEPTS, DESIGN AND PRINTING',
  'Adobe Illustrator',
  'Adobe Indesign',
  'Adobe Photoshop',
  'Android Studio',
  'Angular',
  'AWS',
  'Azure',
  'BIM CONCEPTS WITH MEP AND PRODUCT DESIGN',
  'BIM FOR ARCHITECTURE',
  'BIM FOR CONSTRUCTION',
  'BIM FOR HIGHWAY ENGINEERING',
  'BIM FOR STRUCTURES',
  'Business Management',
  'C++',
  'CakePHP',
  'Canva',
  'Cassandra',
  'Circuit Design',
  'Cloud access control',
  'CodeIgniter',
  'Computer Vision',
  'CSS',
  'D3.js',
  'Data Encryption',
  'Data Modeling',
  'Data Visualization',
  'Database Design',
  'Design with FPGA',
  'DevOps',
  'DHCP',
  'Digital Design',
  'Docker',
  'Economics',
  'Embedded Systems',
  'Figma',
  'FilamentPHP',
  'Finance',
  'Firewall Configuration',
  'Flutter',
  'Git',
  'Godot',
  'Google Cloud',
  'HTML',
  'IaaS',
  'Indexing',
  'Intelligent Machines',
  'Interior and Exterior Design',
  'IoT',
  'Java',
  'JavaScript',
  'Keras',
  'Kotlin',
  'Kubernetes',
  'LAN',
  'Laravel',
  'Layout Design',
  'Machine Learning',
  'Manufacturing',
  'Marketing',
  'MongoDB',
  'MySQL',
  'Natural Language Processing',
  'Network Architecture',
  'Node.js',
  'NoSQL',
  'Objective-C',
  'PaaS',
  'PHP',
  'Physical Design',
  'PostgreSQL',
  'Power BI',
  'Product Design & 3D Printing',
  'Product Design & Manufacturing',
  'Python',
  'PyTorch',
  'React',
  'React.js',
  'Ruby on Rails',
  'SaaS',
  'Scikit-learn',
  'SEO',
  'SQL',
  'Statistical Analysis',
  'Swift',
  'Tableau',
  'TCP/IP',
  'TensorFlow',
  'TypeScript',
  'UI/UX',
  'Verification & Validations',
  'VLSI Design',
  'VPNs',
  'Vue.js',
  'WAN',
  'WordPress',
  'Xamarin',
];

// ─── Skill Matching Rules ────────────────────────────────────────────────────
// Each skill has:
//   keywords  → topic must contain AT LEAST ONE of these to match
//   exclude   → topic must NOT contain any of these (prevents false positives)
// ─────────────────────────────────────────────────────────────────────────────
export const SKILL_RULES: Record<string, { keywords: string[]; exclude?: string[] }> = {

  // ── Frontend ──────────────────────────────────────────────────────────────
  'React': {
    keywords: ['react', 'hooks', 'usestate', 'useeffect', 'jsx', 'react router', 'react component'],
    exclude: ['react native'] // react native → Flutter/Mobile not React
  },
  'React.js': {
    keywords: ['react.js', 'reactjs', 'react js'],
  },
  'Angular': {
    keywords: ['angular', 'angularjs', 'ng-'],
  },
  'Vue.js': {
    keywords: ['vue', 'vuejs', 'vue.js', 'vuex', 'nuxt'],
  },
  'JavaScript': {
    keywords: ['javascript', ' js ', 'es6', 'es2015', 'dom manipulation', 'vanilla js', 'ajax', 'fetch api'],
    exclude: ['node.js', 'nodejs'] // Node handled separately
  },
  'TypeScript': {
    keywords: ['typescript', ' ts ', '.ts file', 'type annotations', 'interface typescript'],
  },
  'HTML': {
    keywords: ['html', 'html5', 'markup', 'semantic html', 'html tags', 'webpage structure'],
    exclude: ['css', 'javascript'] // if topic is specifically HTML only
  },
  'CSS': {
    keywords: ['css', 'css3', 'tailwind', 'bootstrap', 'flexbox', 'grid layout', 'sass', 'scss', 'stylesheet', 'responsive design'],
  },
  'D3.js': {
    keywords: ['d3', 'd3.js', 'd3js'],
  },

  // ── Backend ───────────────────────────────────────────────────────────────
  'Node.js': {
    keywords: ['node.js', 'nodejs', 'node js', 'express', 'express.js', 'npm', 'backend javascript'],
  },
  'Python': {
    keywords: ['python', 'django', 'flask', 'fastapi', 'web scraping', 'automation script', 'pandas', 'numpy'],
    exclude: ['tensorflow', 'pytorch', 'keras', 'machine learning', 'deep learning'] // ML Python handled separately
  },
  'Java': {
    keywords: ['java', 'spring boot', 'spring framework', 'java servlet', 'maven', 'hibernate'],
    exclude: ['javascript'] // avoid false match
  },
  'C++': {
    keywords: ['c++', 'cpp', 'c plus plus', 'stl', 'object oriented c'],
  },
  'PHP': {
    keywords: ['php', 'php scripting', 'php backend'],
    exclude: ['laravel', 'cakephp', 'codeigniter', 'filament'] // specific frameworks handled separately
  },
  'Laravel': {
    keywords: ['laravel', 'laravel framework', 'laravel blade', 'eloquent orm'],
  },
  'CakePHP': {
    keywords: ['cakephp', 'cake php'],
  },
  'CodeIgniter': {
    keywords: ['codeigniter', 'code igniter'],
  },
  'FilamentPHP': {
    keywords: ['filament', 'filamentphp', 'filament admin'],
  },
  'Ruby on Rails': {
    keywords: ['rails', 'ruby on rails', 'ror', 'ruby framework'],
  },
  'WordPress': {
    keywords: ['wordpress', 'wp theme', 'wp plugin', 'woocommerce'],
  },

  // ── Mobile ────────────────────────────────────────────────────────────────
  'Android Studio': {
    keywords: ['android studio', 'android app', 'android development', 'android sdk'],
  },
  'Kotlin': {
    keywords: ['kotlin', 'kotlin android'],
  },
  'Swift': {
    keywords: ['swift', 'ios development', 'swiftui', 'xcode'],
  },
  'Flutter': {
    keywords: ['flutter', 'dart', 'flutter widget', 'flutter app'],
  },
  'Xamarin': {
    keywords: ['xamarin', 'xamarin forms', 'xamarin android'],
  },
  'Objective-C': {
    keywords: ['objective-c', 'objectivec', 'objc'],
  },

  // ── Database ──────────────────────────────────────────────────────────────
  'MySQL': {
    keywords: ['mysql', 'mysql database', 'mysql query', 'mysql workbench'],
  },
  'PostgreSQL': {
    keywords: ['postgresql', 'postgres', 'psql'],
  },
  'MongoDB': {
    keywords: ['mongodb', 'mongo', 'mongoose'],
  },
  'Cassandra': {
    keywords: ['cassandra', 'apache cassandra'],
  },
  'NoSQL': {
    keywords: ['nosql', 'no-sql', 'document database', 'key-value store'],
    exclude: ['mongodb', 'cassandra'] // specific ones handled above
  },
  'SQL': {
    keywords: ['sql query', 'sql joins', 'sql commands', 'structured query language', 'sql basics'],
    exclude: ['mysql', 'postgresql', 'nosql'] // specific DBs handled separately
  },
  'Database Design': {
    keywords: ['database design', 'schema design', 'er diagram', 'entity relationship', 'normalization'],
  },
  'Data Modeling': {
    keywords: ['data modeling', 'data model', 'uml diagram', 'data schema'],
  },
  'Indexing': {
    keywords: ['indexing', 'database index', 'query optimization', 'b-tree index'],
  },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────
  'AWS': {
    keywords: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'rds aws', 'cloudwatch'],
  },
  'Azure': {
    keywords: ['azure', 'microsoft azure', 'azure devops', 'azure functions'],
  },
  'Google Cloud': {
    keywords: ['gcp', 'google cloud', 'firebase', 'google cloud platform', 'bigquery'],
  },
  'Docker': {
    keywords: ['docker', 'dockerfile', 'docker compose', 'containerization', 'docker image'],
  },
  'Kubernetes': {
    keywords: ['kubernetes', 'k8s', 'kubectl', 'container orchestration'],
  },
  'DevOps': {
    keywords: ['devops', 'ci/cd', 'pipeline', 'continuous integration', 'continuous deployment', 'jenkins', 'github actions'],
  },
  'IaaS': {
    keywords: ['iaas', 'infrastructure as a service'],
  },
  'PaaS': {
    keywords: ['paas', 'platform as a service'],
  },
  'SaaS': {
    keywords: ['saas', 'software as a service'],
  },
  'Cloud access control': {
    keywords: ['cloud access', 'iam', 'identity access management', 'cloud permissions'],
  },

  // ── Networking ────────────────────────────────────────────────────────────
  'Network Architecture': {
    keywords: ['network architecture', 'network design', 'network topology', 'osi model'],
  },
  'TCP/IP': {
    keywords: ['tcp/ip', 'tcp ip', 'ip protocol', 'transport layer', 'network protocol'],
  },
  'LAN': {
    keywords: [' lan ', 'local area network', 'ethernet', 'lan setup'],
  },
  'WAN': {
    keywords: [' wan ', 'wide area network', 'wan setup'],
  },
  'DHCP': {
    keywords: ['dhcp', 'dynamic host configuration', 'ip assignment'],
  },
  'Firewall Configuration': {
    keywords: ['firewall', 'network security rules', 'packet filtering', 'iptables'],
  },
  'VPNs': {
    keywords: ['vpn', 'virtual private network', 'vpn setup', 'vpn tunnel'],
  },
  'Data Encryption': {
    keywords: ['encryption', 'aes', 'rsa encryption', 'ssl tls', 'cryptography', 'hashing'],
  },

  // ── AI / ML ───────────────────────────────────────────────────────────────
  'Machine Learning': {
    keywords: ['machine learning', ' ml ', 'supervised learning', 'unsupervised learning', 'classification', 'regression model', 'training model'],
  },
  'TensorFlow': {
    keywords: ['tensorflow', 'tf.keras', 'tensorflow model'],
  },
  'PyTorch': {
    keywords: ['pytorch', 'torch', 'pytorch model'],
  },
  'Keras': {
    keywords: ['keras', 'keras model', 'keras layer'],
  },
  'Scikit-learn': {
    keywords: ['scikit-learn', 'sklearn', 'scikit learn'],
  },
  'Natural Language Processing': {
    keywords: ['nlp', 'natural language processing', 'text classification', 'tokenization', 'sentiment analysis', 'named entity', 'language model'],
  },
  'Computer Vision': {
    keywords: ['computer vision', 'image recognition', 'object detection', 'opencv', 'image segmentation', 'cnn'],
  },
  'Intelligent Machines': {
    keywords: ['intelligent machine', 'ai automation', 'robotic process', 'autonomous system'],
  },

  // ── Data & Visualization ──────────────────────────────────────────────────
  'Data Visualization': {
    keywords: ['data visualization', 'charts', 'graphs', 'matplotlib', 'seaborn', 'plotly'],
  },
  'Power BI': {
    keywords: ['power bi', 'powerbi', 'power bi dashboard'],
  },
  'Tableau': {
    keywords: ['tableau', 'tableau dashboard', 'tableau workbook'],
  },
  'Statistical Analysis': {
    keywords: ['statistical analysis', 'statistics', 'hypothesis testing', 'p-value', 'regression analysis', 'anova'],
  },

  // ── Design & UI ───────────────────────────────────────────────────────────
  'UI/UX': {
    keywords: ['ui/ux', 'user interface', 'user experience', 'wireframe', 'prototyping', 'usability'],
  },
  'Figma': {
    keywords: ['figma', 'figma design', 'figma prototype'],
  },
  'Adobe Photoshop': {
    keywords: ['photoshop', 'adobe photoshop', 'psd', 'photo editing'],
  },
  'Adobe Illustrator': {
    keywords: ['illustrator', 'adobe illustrator', 'vector graphic', 'ai file'],
  },
  'Adobe Indesign': {
    keywords: ['indesign', 'adobe indesign', 'desktop publishing'],
  },
  'Canva': {
    keywords: ['canva', 'canva design', 'canva template'],
  },
  'Layout Design': {
    keywords: ['layout design', 'page layout', 'grid layout design', 'print layout'],
  },
  'Interior and Exterior Design': {
    keywords: ['interior design', 'exterior design', 'interior decoration', '3d interior'],
  },

  // ── Hardware & Electronics ────────────────────────────────────────────────
  'Circuit Design': {
    keywords: ['circuit design', 'pcb', 'circuit board', 'schematic', 'electronic circuit'],
  },
  'Embedded Systems': {
    keywords: ['embedded system', 'microcontroller', 'arduino', 'raspberry pi', 'firmware', 'rtos'],
  },
  'Digital Design': {
    keywords: ['digital design', 'logic gates', 'flip flop', 'combinational circuit', 'sequential circuit'],
  },
  'Design with FPGA': {
    keywords: ['fpga', 'vhdl', 'verilog', 'xilinx', 'altera'],
  },
  'VLSI Design': {
    keywords: ['vlsi', 'chip design', 'asic', 'verilog vlsi', 'vhdl vlsi'],
  },
  'IoT': {
    keywords: ['iot', 'internet of things', 'iot sensor', 'iot device', 'mqtt'],
  },
  'Physical Design': {
    keywords: ['physical design', 'place and route', 'floorplan', 'timing analysis'],
  },
  'Verification & Validations': {
    keywords: ['verification', 'validation', 'testbench', 'unit testing', 'qa testing', 'test cases'],
  },

  // ── BIM / CAD / Manufacturing ─────────────────────────────────────────────
  '3D PRINTING CONCEPTS, DESIGN AND PRINTING': {
    keywords: ['3d printing', '3d print', 'additive manufacturing', 'stl file', 'fdm printing'],
  },
  'Product Design & 3D Printing': {
    keywords: ['product design 3d', '3d product', 'cad 3d print'],
  },
  'Product Design & Manufacturing': {
    keywords: ['product design', 'manufacturing design', 'industrial design'],
    exclude: ['3d print'] // handled separately above
  },
  'Manufacturing': {
    keywords: ['manufacturing', 'production process', 'cnc', 'machining', 'lean manufacturing'],
  },
  'BIM CONCEPTS WITH MEP AND PRODUCT DESIGN': {
    keywords: ['bim mep', 'mep design', 'bim product', 'mechanical electrical plumbing'],
  },
  'BIM FOR ARCHITECTURE': {
    keywords: ['bim architecture', 'bim revit architecture', 'archicad', 'architectural bim'],
  },
  'BIM FOR CONSTRUCTION': {
    keywords: ['bim construction', 'construction bim', 'revit construction'],
  },
  'BIM FOR STRUCTURES': {
    keywords: ['bim structure', 'structural bim', 'structural revit'],
  },
  'BIM FOR HIGHWAY ENGINEERING': {
    keywords: ['bim highway', 'highway bim', 'civil bim', 'road bim'],
  },

  // ── Tools ─────────────────────────────────────────────────────────────────
  'Git': {
    keywords: ['git', 'github', 'gitlab', 'version control', 'git commit', 'branching', 'merge conflict'],
  },
  'Godot': {
    keywords: ['godot', 'godot engine', 'gdscript', 'game development godot'],
  },

  // ── Business ──────────────────────────────────────────────────────────────
  'Business Management': {
    keywords: ['business management', 'project management', 'team management', 'agile', 'scrum'],
  },
  'Marketing': {
    keywords: ['marketing', 'digital marketing', 'content marketing', 'social media marketing'],
    exclude: ['seo'] // handled separately
  },
  'SEO': {
    keywords: ['seo', 'search engine optimization', 'on-page seo', 'off-page seo', 'keyword research'],
  },
  'Finance': {
    keywords: ['finance', 'financial statements', 'balance sheet', 'accounting', 'budgeting'],
  },
  'Economics': {
    keywords: ['economics', 'macroeconomics', 'microeconomics', 'supply demand', 'gdp'],
  },
};

// ─── Main Matching Function ──────────────────────────────────────────────────
export const matchSkillsFromTopic = (topic: string): string[] => {
  if (!topic) return [];

  const topicLower = ' ' + topic.toLowerCase() + ' '; // pad with spaces for word boundary matching
  const matchedSkills: Set<string> = new Set();

  Object.entries(SKILL_RULES).forEach(([skill, rule]) => {
    // Check if any keyword matches
    const hasKeyword = rule.keywords.some(keyword => topicLower.includes(keyword));
    if (!hasKeyword) return;

    // Check if any exclusion word is present
    const hasExclusion = rule.exclude?.some(excl => topicLower.includes(excl));
    if (hasExclusion) return;

    matchedSkills.add(skill);
  });

  // De-duplicate: if React is matched, remove React.js (they are the same)
  if (matchedSkills.has('React') && matchedSkills.has('React.js')) {
    matchedSkills.delete('React.js');
  }

  return Array.from(matchedSkills).sort();
};

// Keep AVAILABLE_SKILLS as the master list used in dropdowns
export const SKILL_KEYWORDS = SKILL_RULES; // backward compat alias if used elsewhere
