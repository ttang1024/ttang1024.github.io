export const educationData = [
	{
		degree: 'Master of Information Technology',
		school: 'University of Waikato',
		location: 'Hamilton, New Zealand',
		period: '2025 - 2026',
		status: 'In Progress',
		statusColor: '#e1251b',
		logoSrc: '/images/education/waikato.svg',
		papers: [
			'Interpretable Machine Learning',
			'Deep Learning',
			'Secure Cloud Application Engineering',
			'Malware Analysis',
			'Programming Tools and Techniques',
			'Managing Innovation and Value Creation',
		],
	},
	{
		degree: 'Master of Computer Programming, Specific Applications',
		school: 'Renmin University of China',
		location: 'Beijing, China',
		period: '2021 - 2023',
		status: 'Completed',
		statusColor: '#920303',
		logoSrc: '/images/education/remin.svg',
		papers: [
			'Data Structures and Algorithms',
			'Database Systems',
			'Data Mining',
			'Software Engineering',
			'Computer Networks',
			'Operating Systems',
			'Discrete Mathematics',
			'Combinatorial Mathematics',
		],
	},
	{
		degree: 'Bachelor of Statistics',
		school: 'Anhui University of Finance and Economics',
		location: 'Anhui, China',
		period: '2009 - 2013',
		status: 'Completed',
		statusColor: '#23408E',
		logoSrc: '/images/education/aufe.jpeg',
		papers: [
			'Statistics',
			'Linear Algebra',
			'Probability Theory and Mathematical Statistics',
			'Calculus',
			'Mathematical Modeling Method',
			'Database Management System',
			'Enterprise Operation Statistics',
			'Operations Research ',
			'Monetary and Financial Statistics',
			'Stochastic Process',
			'Macroeconomic Statistical Analysis',
			'Statistical Comprehensive Evaluation',
			'Statistical Forecasting and Decision Making',
			'Data Mining',
			'Sampling Survey Technology',
			'Input-output Analysis ',
			'Market Research and Statistical Analysis',
			'Statistical Software',
			'Statistical Case and Practice',
		],
	},
]

export const profileData = {
	name: 'Ting Tang',
	title: 'Full Stack Developer',
	focus: 'React / .NET',
	location: 'Hamilton, New Zealand',
	email: 'tangtingtt12@gmail.com',
	phone: '+64 20 477 6871',
	githubLabel: 'github.com/ttang1024',
	githubUrl: 'https://github.com/ttang1024',
	linkedinLabel: 'linkedin.com/in/tingtang12',
	linkedinUrl: 'https://www.linkedin.com/in/tingtang12/',
	status: 'Open to Work',
	sidebarFocus: ['Frontend-focused', 'React / TypeScript / .NET'],
	summary:
		'Frontend-focused Full Stack Developer with 8+ years of experience, including 6 years in frontend and 2 years in full-stack development. Skilled in building responsive and maintainable web applications using React and TypeScript, with working knowledge of .NET backend services and API integration. Experienced in delivering user-facing features in AI and healthcare domains, with a focus on performance, usability, and maintainable code.',
}

export const aboutHighlights = [
	'Skilled in building responsive, maintainable web applications using React, TypeScript, and modern frontend technologies.',
	'Working knowledge of .NET backend services, API integration, ASP.NET Core, Node.js, REST APIs, and GraphQL.',
	'Delivered AI product features including video summarization, AI chat, mind maps, note-taking, LLM API integration, and SSE streaming responses.',
	'Experienced across AI, healthcare, finance, telehealth, prescription systems, and cross-platform application development.',
]

export const experienceStats = [
	['8+', 'Years'],
	['6', 'Frontend'],
	['2', 'Full Stack'],
]

export type SidebarContactIcon = 'location' | 'email' | 'phone' | 'github' | 'linkedin'

export interface SidebarContactItem {
	icon: SidebarContactIcon
	text: string
	link?: string
}

export const sidebarContactData: SidebarContactItem[] = [
	{ icon: 'location', text: profileData.location },
	{ icon: 'email', text: profileData.email, link: `mailto:${profileData.email}` },
	{ icon: 'phone', text: profileData.phone, link: 'tel:+6420477 6871' },
	{ icon: 'github', text: profileData.githubLabel, link: profileData.githubUrl },
	{ icon: 'linkedin', text: profileData.linkedinLabel, link: profileData.linkedinUrl },
]

export type SkillLineType = 'prompt' | 'header' | 'category' | 'skill' | 'success' | 'gap'

export interface SkillLine {
	type: SkillLineType
	text?: string
}

export const skillLines: SkillLine[] = [
	{ type: 'prompt', text: 'ting --skills --verbose' },
	{ type: 'gap' },
	{ type: 'header', text: '╔══════════════════════════════════════╗' },
	{ type: 'header', text: '║        TING TANG  ·  SKILLS MAP      ║' },
	{ type: 'header', text: '╚══════════════════════════════════════╝' },
	{ type: 'gap' },
	{ type: 'category', text: '▶  FRONT-END' },
	{ type: 'skill', text: '   ✦ React.js · TypeScript · Next.js · React Native · Flutter' },
	{ type: 'skill', text: '   ✦ HTML · CSS · JavaScript' },
	{ type: 'gap' },
	{ type: 'category', text: '▶  BACK-END' },
	{ type: 'skill', text: '   ✦ .NET (ASP.NET Core) · Node.js · Python' },
	{ type: 'skill', text: '   ✦ REST APIs · GraphQL' },
	{ type: 'skill', text: '   ✦ Redis' },
	{ type: 'gap' },
	{ type: 'category', text: '▶  DATABASE' },
	{ type: 'skill', text: '   ✦ PostgreSQL · MySQL · MongoDB' },
	{ type: 'gap' },
	{ type: 'category', text: '▶  CLOUD & DEVOPS' },
	{ type: 'skill', text: '   ✦ AWS · Azure · Docker · CI/CD' },
	{ type: 'gap' },
	{ type: 'category', text: '▶  AI & REAL-TIME' },
	{ type: 'skill', text: '   ✦ LLM APIs · SSE · WebSocket · WebRTC · Playwright · Selenium' },
	{ type: 'gap' },
	{ type: 'success', text: '✓  Skills loaded successfully  [8+ years exp]' },
	{ type: 'prompt', text: '_' },
]

export const skillLineColors: Record<SkillLineType, string> = {
	prompt: '#5ac8fa',
	header: '#febc2e',
	category: '#30d158',
	skill: '#e0e0e0',
	success: '#30d158',
	gap: '',
}

export const contactCardData = [
	{
		icon: 'email',
		label: 'Email',
		value: profileData.email,
		href: `mailto:${profileData.email}`,
		color: '#007aff',
		bg: '#e8f2ff',
		iconColor: '#007aff',
	},
	{
		icon: 'phone',
		label: 'Phone',
		value: profileData.phone,
		href: 'tel:+6420477 6871',
		color: '#30d158',
		bg: '#e6f9ec',
		iconColor: '#30d158',
	},
	{
		icon: 'github',
		label: 'GitHub',
		value: profileData.githubLabel,
		href: profileData.githubUrl,
		color: '#1d1d1f',
		bg: '#f2f2f2',
		iconColor: '#1d1d1f',
	},
	{
		icon: 'linkedin',
		label: 'LinkedIn',
		value: profileData.linkedinLabel,
		href: profileData.linkedinUrl,
		color: '#0a66c2',
		bg: '#e8f0fb',
		iconColor: '#0a66c2',
	},
] as const

export const contactMailData = {
	from: `${profileData.name} <${profileData.email}>`,
	to: 'you@company.com',
	subject: 'Full Stack Developer (React / .NET)',
	greeting: 'Hi there,',
	intro: "I'm Ting Tang, a frontend-focused Full Stack Developer based in Hamilton, New Zealand, with 8+ years of experience including 6 years in frontend and 2 years in full-stack development.",
	body: 'I build responsive, maintainable web applications with React and TypeScript, with working knowledge of .NET backend services and API integration. I have delivered user-facing features across AI and healthcare domains.',
	signatureTitle: 'Full Stack Developer (React / .NET)',
}

export const contactHeaderRows = [
	{ label: 'From:', value: contactMailData.from },
	{ label: 'To:', value: contactMailData.to },
]

export interface ExperienceHighlight {
	icon: string
	title: string
	desc: string
}

export interface ExperienceJob {
	company: string
	title?: string
	location: string
	period: string
	bullets: string[]
	tech: string[]
	color: string
	logo?: string
	emoji?: string
	screenshots: string[]
	highlights?: ExperienceHighlight[]
	githubUrl?: string
	projectUrl?: string
}

export const JOBS: ExperienceJob[] = [
	{
		company: 'Study Platform',
		location: 'Personal Project',
		period: 'Personal Project',
		bullets: [
			'Built a full-stack AI-powered learning platform supporting multi-format content (PDF, DOCX, YouTube, audio, web articles), generating summaries, flashcards, quizzes, glossaries, and study notes.',
			'Integrated multiple LLM providers with dynamic model selection, enabling scalable AI features such as content generation and AI tutor chat.',
			'Developed core learning and collaboration features including interactive quizzes, rich-text notes, shareable study materials, study groups.',
			'Designed and implemented a DDD-based modular architecture with CQRS (MediatR) across Domain, Application, and Infrastructure layers to improve scalability and maintainability.',
			'Implemented Redis-backed distributed caching to optimize performance by reducing repeated AI generation, analytics queries, and SAS URL creation, with timeout handling and in-memory fallback for resilience.',
		],
		tech: [
			'React.js',
			'TypeScript',
			'TailwindCSS',
			'ASP.NET Core',
			'EF Core',
			'Redis',
			'PostgreSQL',
			'Azure',
			'Docker',
			'Whisper.net',
		],
		color: '#0ea5e9',
		logo: '/images/experience/StudyPlatform_logo.png',
		screenshots: [
			'/images/experience/StudyPlatform1.png',
			'/images/experience/StudyPlatform2.png',
			'/images/experience/StudyPlatform3.png',
			'/images/experience/StudyPlatform4.png',
			'/images/experience/StudyPlatform5.png',
			'/images/experience/StudyPlatform6.png',
			'/images/experience/StudyPlatform7.png',
		],
		highlights: [
			{
				icon: '🧠',
				title: 'Study Generation',
				desc: 'Summaries, flashcards, quizzes, glossaries, notes, and mind maps.',
			},
			{
				icon: '🔁',
				title: 'Learning Tools',
				desc: 'SRS, interactive quizzes, rich-text notes, analytics, and TTS playback.',
			},
			{
				icon: '💬',
				title: 'AI Tutor',
				desc: 'Flexible model selection across multiple LLM providers.',
			},
			{
				icon: '👥',
				title: 'Collaboration',
				desc: 'Shareable materials, study groups, and shared courses.',
			},
		],
		githubUrl: 'https://github.com/ttang1024/AI_Study_Platform',
	},
	{
		company: 'Smart CV',
		location: 'Personal Project',
		period: 'Personal Project',
		bullets: [
			'Developed an AI-powered resume builder with a fully client-side architecture using React and IndexedDB for local data storage.',
			'Integrated LLM APIs to analyse job descriptions and assist with resume writing.',
			'Provided 10+ customizable resume templates with flexible layout and styling options.',
			'Implemented real-time editing and PDF export functionality.',
		],
		tech: [
			'React.js',
			'TypeScript',
			'TailwindCSS',
			'IndexedDB',
			'ASP.NET Core',
			'Azure',
			'Puppeteer',
		],
		color: '#a855f7',
		logo: '/images/experience/samrtcv_logo.svg',
		screenshots: [
			'/images/experience/samrtcv1.png',
			'/images/experience/samrtcv2.png',
			'/images/experience/samrtcv3.png',
		],
		highlights: [
			{
				icon: '🤖',
				title: 'AI Resume Help',
				desc: 'LLM-assisted job description analysis and resume writing support.',
			},
			{
				icon: '💾',
				title: 'Local Storage',
				desc: 'Client-side resume data persisted with IndexedDB.',
			},
			{
				icon: '🎨',
				title: 'Templates',
				desc: '10+ customizable resume templates with flexible layouts.',
			},
			{
				icon: '📤',
				title: 'PDF Export',
				desc: 'Real-time editing workflow with PDF generation.',
			},
		],
		githubUrl: 'https://github.com/ttang1024/Smart_CV',
	},
	{
		company: 'WayinVideo',
		title: 'Senior Frontend Developer',
		location: 'Hong Kong, China',
		period: 'May 2024 – Oct 2024',
		bullets: [
			'Led frontend development for an AI product using React, delivering scalable and high-performance features.',
			'Built a Chrome Extension with video summarization, AI chat, mind maps, and note-taking capabilities. ',
			'Implemented real-time streaming (SSE) and optimized UX for responsiveness and performance.',
			'Developed subscription, and sharing/referral features to support monetization and growth.',
			'Built video summary pages using Next.js to improve SEO and content discovery, driving growth to 30K+ users in 3 months.',
		],
		tech: ['React.js', 'TypeScript', 'Next.js', 'Chrome Extension APIs', 'SSE', 'MySQL'],
		color: '#22c55e',
		projectUrl:
			'https://chromewebstore.google.com/detail/wayinvideo-ai-youtube-sum/cedgndijpacnfbdggppddacngjfdkaca',
		logo: '/images/experience/weitu_logo.svg',
		screenshots: [
			'/images/experience/weitu1.png',
			'/images/experience/weitu2.png',
			'/images/experience/weitu3.png',
			'/images/experience/weitu4.png',
		],
	},
	{
		company: 'Shanghai Shantai Health',
		title: 'Senior Frontend Developer',
		location: 'Shanghai, China',
		period: 'Aug 2022 – Mar 2024',
		bullets: [
			'Contributed to a low-code platform for internal systems, enabling rapid UI and workflow configuration.',
			'Built digital therapeutics (DTx) apps across React, React Native, and Mini Programs for disease management and health records.',
			'Developed a scoliosis measurement tool using device sensors (gyroscope) for medical assessment.',
		],
		tech: ['React.js', 'React Native', 'WeChat Mini Program', 'Node.js', 'MySQL'],
		color: '#3b82f6',
		logo: '/images/experience/shantai_logo.png',
		screenshots: [
			'/images/experience/shantai1.png',
			'/images/experience/shantai2.png',
			'/images/experience/shantai3.png',
			'/images/experience/shantai4.png',
		],
	},
	{
		company: 'Ele.me (Alibaba Group)',
		title: 'Senior Frontend Developer',
		location: 'Shanghai, China',
		period: 'Mar 2021 – Jul 2022',
		bullets: [
			'Developed frontend features for financial systems (wallet, credit card), handling complex user states and rewards flows.',
			'Implemented personalised campaigns to support multi-channel user engagement.',
			'Developed a frontend technology portal (React + Node.js) for knowledge sharing and content management.',
		],
		tech: ['React.js', 'Vue.js', 'Alipay Mini Program', 'Node.js', 'Serverless', 'MySQL'],
		color: '#3b82f6',
		logo: '/images/experience/ele_logo.png',
		screenshots: [
			'/images/experience/ele1.png',
			'/images/experience/ele2.png',
			'/images/experience/ele3.png',
		],
	},
	{
		company: 'Ping An Health',
		title: 'Junior Frontend Developer',
		location: 'Shanghai, China',
		period: 'May 2018 – Mar 2021',
		bullets: [
			'Developed a telehealth platform with real-time communication using WebSocket and WebRTC. ',
			'Improved performance via Web Worker, IndexedDB caching, and HTTP2, reducing load time and API overhead.',
			'Built a log monitoring platform (React + GraphQL + BizCharts) for performance tracking and debugging.',
			'Delivered rapid solutions including an English COVID consultation app launched within one week. ',
		],
		tech: ['React.js', 'jQuery', 'WebSocket', 'WebRTC', 'Node.js', 'MySQL', 'GraphQL'],
		color: '#ff6b6b',
		logo: '/images/experience/pingan_logo.png',
		screenshots: ['/images/experience/pingan.png'],
	},
]
