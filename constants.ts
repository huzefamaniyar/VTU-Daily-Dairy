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

// ─────────────────────────────────────────────────────────────────────────────
// SKILL MATCHING RULES
//
// keywords : topic must include AT LEAST ONE of these (case-insensitive)
// exclude  : topic must NOT include any of these (prevents false positives)
//
// LESSONS LEARNED (do NOT revert these):
//   ✗ ' ts '   → matches "tasks", "sets", "contents", "buttons"  → REMOVED
//   ✗ ' js '   → matches words ending in "js" unexpectedly        → REMOVED
//   ✗ 'kotlin' in Android Studio → matches Kotlin Playground      → REMOVED
//   ✗ 'script' alone → matches "description", "javascript"        → REMOVED
//   ✗ 'android' alone → matches unrelated words                   → REMOVED
//   ✗ 'java' without exclude → matches "javascript"               → MUST EXCLUDE
// ─────────────────────────────────────────────────────────────────────────────

export const SKILL_RULES: Record<string, { keywords: string[]; exclude?: string[] }> = {

  // ── Frontend Frameworks ──────────────────────────────────────────────────
  'React': {
    keywords: ['react hooks', 'usestate', 'useeffect', 'jsx', 'react router', 'react component', 'react app', 'react state', 'react props', 'create react app'],
    exclude: ['react native'],
  },
  'React.js': {
    keywords: ['react.js', 'reactjs'],
  },
  'Angular': {
    keywords: ['angular', 'angularjs', 'angular component', 'angular service', 'angular module'],
  },
  'Vue.js': {
    keywords: ['vue.js', 'vuejs', 'vue js', 'vuex', 'nuxt'],
  },

  // ── Core Web ──────────────────────────────────────────────────────────────
  'HTML': {
    keywords: ['html5', 'semantic html', 'html tags', 'html form', 'html layout', 'html structure', 'html page', 'html element'],
  },
  'CSS': {
    keywords: ['css3', 'tailwind', 'bootstrap', 'flexbox', 'css grid', 'sass', 'scss', 'stylesheet', 'responsive design', 'media query', 'css styling'],
  },
  'JavaScript': {
    keywords: ['javascript', 'es6', 'dom manipulation', 'vanilla js', 'ajax', 'fetch api', 'javascript function', 'javascript array', 'javascript object', 'javascript event', 'javascript promise'],
    exclude: ['node.js', 'nodejs', 'typescript', 'react', 'vue', 'angular'],
  },
  'TypeScript': {
    // NOTE: NEVER add ' ts ' — it matches "tasks", "sets", "contents" etc.
    keywords: ['typescript', '.tsx', 'type annotations', 'typescript interface', 'typescript generics', 'typescript class', 'typescript function', 'typed javascript'],
  },
  'D3.js': {
    keywords: ['d3.js', 'd3js', 'd3 chart', 'd3 visualization'],
  },

  // ── Backend ───────────────────────────────────────────────────────────────
  'Node.js': {
    keywords: ['node.js', 'nodejs', 'express.js', 'express js', 'backend javascript', 'node server', 'node module'],
  },
  'Python': {
    // NOTE: No 'script' alone — matches "description", "javascript"
    keywords: ['python', 'django', 'flask', 'fastapi', 'web scraping', 'pandas', 'numpy', 'python programming', 'python code', 'python function', 'python class', 'python module'],
    exclude: ['tensorflow', 'pytorch', 'keras', 'machine learning', 'deep learning', 'scikit'],
  },
  'Java': {
    // NOTE: MUST exclude 'javascript' — very common false positive
    keywords: ['java programming', 'spring boot', 'spring framework', 'java servlet', 'maven', 'hibernate', 'java class', 'java method', 'java backend', 'core java'],
    exclude: ['javascript'],
  },
  'C++': {
    keywords: ['c++', 'cpp', 'c plus plus', 'stl', 'c++ program'],
  },
  'PHP': {
    keywords: ['php programming', 'php scripting', 'php backend', 'php function'],
    exclude: ['laravel', 'cakephp', 'codeigniter', 'filament'],
  },
  'Laravel': {
    keywords: ['laravel', 'laravel framework', 'laravel blade', 'eloquent orm', 'laravel route'],
  },
  'CakePHP': {
    keywords: ['cakephp', 'cake php'],
  },
  'CodeIgniter': {
    keywords: ['codeigniter', 'code igniter'],
  },
  'FilamentPHP': {
    keywords: ['filament', 'filamentphp'],
  },
  'Ruby on Rails': {
    keywords: ['ruby on rails', 'rails framework', 'ruby rails'],
  },
  'WordPress': {
    keywords: ['wordpress', 'wp theme', 'wp plugin', 'woocommerce'],
  },

  // ── Mobile ────────────────────────────────────────────────────────────────
  'Android Studio': {
    // NOTE: NEVER add 'kotlin' here — Kotlin Playground topics would match falsely
    // NOTE: NEVER add 'android' alone — too broad
    keywords: ['android studio', 'android app', 'android development', 'android sdk', 'android project', 'android emulator', 'android activity', 'android fragment', 'android layout'],
  },
  'Kotlin': {
    keywords: ['kotlin', 'kotlin playground', 'kotlin function', 'kotlin class', 'kotlin coroutine', 'kotlin lambda', 'kotlin programming', 'kotlin syntax', 'kotlin list', 'kotlin collections', 'kotlin extension'],
  },
  'Swift': {
    keywords: ['swift', 'ios development', 'swiftui', 'xcode', 'swift programming'],
  },
  'Flutter': {
    keywords: ['flutter', 'dart', 'flutter widget', 'flutter app', 'flutter ui'],
  },
  'Xamarin': {
    keywords: ['xamarin', 'xamarin forms'],
  },
  'Objective-C': {
    keywords: ['objective-c', 'objectivec', 'objc'],
  },

  // ── Databases ─────────────────────────────────────────────────────────────
  'MySQL': {
    keywords: ['mysql', 'mysql database', 'mysql query', 'mysql workbench', 'mysql table'],
  },
  'PostgreSQL': {
    keywords: ['postgresql', 'postgres', 'psql'],
  },
  'MongoDB': {
    keywords: ['mongodb', 'mongoose', 'mongodb collection', 'mongodb query'],
  },
  'Cassandra': {
    keywords: ['cassandra', 'apache cassandra'],
  },
  'NoSQL': {
    keywords: ['nosql', 'no-sql', 'document database', 'key-value store'],
    exclude: ['mongodb', 'cassandra'],
  },
  'SQL': {
    keywords: ['sql query', 'sql joins', 'sql commands', 'structured query language', 'sql basics', 'sql table', 'sql select'],
    exclude: ['mysql', 'postgresql', 'nosql'],
  },
  'Database Design': {
    keywords: ['database design', 'schema design', 'er diagram', 'entity relationship', 'normalization'],
  },
  'Data Modeling': {
    keywords: ['data modeling', 'data model', 'uml diagram'],
  },
  'Indexing': {
    keywords: ['database index', 'query optimization', 'b-tree index'],
  },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────
  'AWS': {
    keywords: ['aws', 'amazon web services', 'ec2', 's3 bucket', 'aws lambda', 'cloudwatch'],
  },
  'Azure': {
    keywords: ['azure', 'microsoft azure', 'azure devops', 'azure functions'],
  },
  'Google Cloud': {
    keywords: ['gcp', 'google cloud platform', 'firebase', 'bigquery', 'cloud firestore'],
  },
  'Docker': {
    keywords: ['docker', 'dockerfile', 'docker compose', 'docker image', 'docker container'],
  },
  'Kubernetes': {
    keywords: ['kubernetes', 'k8s', 'kubectl', 'container orchestration'],
  },
  'DevOps': {
    keywords: ['devops', 'ci/cd', 'continuous integration', 'continuous deployment', 'jenkins', 'github actions'],
  },
  'IaaS': { keywords: ['iaas', 'infrastructure as a service'] },
  'PaaS': { keywords: ['paas', 'platform as a service'] },
  'SaaS': { keywords: ['saas', 'software as a service'] },
  'Cloud access control': {
    keywords: ['cloud access control', 'iam policy', 'identity access management', 'cloud iam'],
  },

  // ── Networking ────────────────────────────────────────────────────────────
  'Network Architecture': {
    keywords: ['network architecture', 'network design', 'network topology', 'osi model'],
  },
  'TCP/IP': {
    keywords: ['tcp/ip', 'tcp ip', 'ip protocol', 'transport layer protocol'],
  },
  'LAN': {
    keywords: ['local area network', 'lan setup', 'lan network'],
  },
  'WAN': {
    keywords: ['wide area network', 'wan setup', 'wan network'],
  },
  'DHCP': {
    keywords: ['dhcp', 'dynamic host configuration', 'dhcp server'],
  },
  'Firewall Configuration': {
    keywords: ['firewall', 'firewall rules', 'packet filtering', 'iptables'],
  },
  'VPNs': {
    keywords: ['vpn', 'virtual private network', 'vpn setup', 'vpn tunnel'],
  },
  'Data Encryption': {
    keywords: ['encryption', 'aes encryption', 'rsa encryption', 'ssl tls', 'cryptography'],
  },

  // ── AI / ML ───────────────────────────────────────────────────────────────
  'Machine Learning': {
    keywords: ['machine learning', 'supervised learning', 'unsupervised learning', 'classification model', 'regression model', 'ml model', 'ml algorithm'],
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
    keywords: ['nlp', 'natural language processing', 'text classification', 'tokenization', 'sentiment analysis', 'text mining'],
  },
  'Computer Vision': {
    keywords: ['computer vision', 'image recognition', 'object detection', 'opencv', 'image segmentation'],
  },
  'Intelligent Machines': {
    keywords: ['intelligent machine', 'ai automation', 'robotic process automation'],
  },

  // ── Data & Visualization ──────────────────────────────────────────────────
  'Data Visualization': {
    keywords: ['data visualization', 'matplotlib', 'seaborn', 'plotly', 'visualizing data'],
  },
  'Power BI': {
    keywords: ['power bi', 'powerbi', 'power bi dashboard'],
  },
  'Tableau': {
    keywords: ['tableau', 'tableau dashboard', 'tableau workbook'],
  },
  'Statistical Analysis': {
    keywords: ['statistical analysis', 'hypothesis testing', 'regression analysis', 'anova', 'statistics'],
  },

  // ── UI/UX & Design Tools ──────────────────────────────────────────────────
  'UI/UX': {
    // NOTE: Only match when topic EXPLICITLY mentions ui/ux design work
    keywords: ['ui/ux', 'user interface design', 'user experience design', 'wireframe', 'usability testing', 'ui design', 'ux design', 'ux research'],
  },
  'Figma': {
    keywords: ['figma', 'figma design', 'figma prototype', 'figma component'],
  },
  'Adobe Photoshop': {
    keywords: ['photoshop', 'adobe photoshop', 'psd file', 'photo editing'],
  },
  'Adobe Illustrator': {
    keywords: ['illustrator', 'adobe illustrator', 'vector graphic'],
  },
  'Adobe Indesign': {
    keywords: ['indesign', 'adobe indesign', 'desktop publishing'],
  },
  'Canva': {
    keywords: ['canva', 'canva design', 'canva template'],
  },
  'Layout Design': {
    keywords: ['layout design', 'page layout', 'print layout'],
    exclude: ['css'],
  },
  'Interior and Exterior Design': {
    keywords: ['interior design', 'exterior design', '3d interior'],
  },

  // ── Hardware & Electronics ────────────────────────────────────────────────
  'Circuit Design': {
    keywords: ['circuit design', 'pcb design', 'circuit board', 'schematic diagram'],
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
    keywords: ['physical design', 'place and route', 'floorplan design'],
  },
  'Verification & Validations': {
    // NOTE: Only match when topic explicitly mentions testing/verification work
    keywords: ['verification testing', 'validation testing', 'testbench', 'unit testing', 'test cases writing', 'qa testing', 'software testing'],
  },

  // ── BIM / CAD / Manufacturing ─────────────────────────────────────────────
  '3D PRINTING CONCEPTS, DESIGN AND PRINTING': {
    keywords: ['3d printing', 'additive manufacturing', 'stl file', 'fdm printing'],
  },
  'Product Design & 3D Printing': {
    keywords: ['product design 3d', '3d product design', 'cad 3d print'],
  },
  'Product Design & Manufacturing': {
    keywords: ['product design', 'industrial design'],
    exclude: ['3d print'],
  },
  'Manufacturing': {
    keywords: ['manufacturing', 'cnc machining', 'lean manufacturing', 'production process'],
  },
  'BIM CONCEPTS WITH MEP AND PRODUCT DESIGN': {
    keywords: ['bim mep', 'mep design', 'mechanical electrical plumbing'],
  },
  'BIM FOR ARCHITECTURE': {
    keywords: ['bim architecture', 'architectural bim', 'revit architecture', 'archicad'],
  },
  'BIM FOR CONSTRUCTION': {
    keywords: ['bim construction', 'construction bim'],
  },
  'BIM FOR STRUCTURES': {
    keywords: ['bim structure', 'structural bim'],
  },
  'BIM FOR HIGHWAY ENGINEERING': {
    keywords: ['bim highway', 'highway bim', 'road design bim'],
  },

  // ── Tools ─────────────────────────────────────────────────────────────────
  'Git': {
    keywords: ['git commit', 'git branch', 'git merge', 'github repository', 'gitlab', 'version control', 'pull request', 'git push'],
  },
  'Godot': {
    keywords: ['godot', 'godot engine', 'gdscript'],
  },

  // ── Business ──────────────────────────────────────────────────────────────
  'Business Management': {
    keywords: ['business management', 'project management', 'agile methodology', 'scrum methodology'],
  },
  'Marketing': {
    keywords: ['digital marketing', 'content marketing', 'social media marketing', 'marketing strategy'],
    exclude: ['seo'],
  },
  'SEO': {
    keywords: ['seo', 'search engine optimization', 'on-page seo', 'keyword research'],
  },
  'Finance': {
    keywords: ['finance', 'financial statements', 'balance sheet', 'accounting', 'budgeting'],
  },
  'Economics': {
    keywords: ['economics', 'macroeconomics', 'microeconomics', 'supply and demand'],
  },
};

// ─── Main Matching Function ──────────────────────────────────────────────────
export const matchSkillsFromTopic = (topic: string): string[] => {
  if (!topic) return [];

  const topicLower = ' ' + topic.toLowerCase() + ' ';
  const matchedSkills: Set<string> = new Set();

  Object.entries(SKILL_RULES).forEach(([skill, rule]) => {
    const hasKeyword = rule.keywords.some(keyword => topicLower.includes(keyword));
    if (!hasKeyword) return;

    const hasExclusion = rule.exclude?.some(excl => topicLower.includes(excl));
    if (hasExclusion) return;

    matchedSkills.add(skill);
  });

  // De-duplicate: if React also matched React.js, keep only React
  if (matchedSkills.has('React') && matchedSkills.has('React.js')) {
    matchedSkills.delete('React.js');
  }

  return Array.from(matchedSkills).sort();
};

// Backward compatibility
export const SKILL_KEYWORDS = SKILL_RULES;
