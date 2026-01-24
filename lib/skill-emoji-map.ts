/**
 * Skill Emoji Mapping
 * Auto-assigns emojis to skills based on their names
 */

const skillEmojiMap: Record<string, string> = {
    // Programming Languages
    "python": "🐍",
    "javascript": "⚡",
    "typescript": "💙",
    "java": "☕",
    "c++": "⚙️",
    "c#": "🎯",
    "c": "🔧",
    "go": "🐹",
    "rust": "🦀",
    "php": "🐘",
    "ruby": "💎",
    "swift": "🦅",
    "kotlin": "🎨",
    "r": "📊",
    "scala": "🔺",
    "perl": "🐪",
    "bash": "💻",
    "shell": "🐚",
    "sql": "🗄️",

    // Frontend Frameworks & Libraries
    "react": "⚛️",
    "vue": "💚",
    "angular": "🅰️",
    "svelte": "🧡",
    "next.js": "▲",
    "nextjs": "▲",
    "nuxt": "💚",
    "gatsby": "🟣",
    "jquery": "📘",
    "bootstrap": "🅱️",
    "tailwind": "🎨",
    "tailwindcss": "🎨",
    "material-ui": "🎨",
    "mui": "🎨",

    // Backend Frameworks
    "node.js": "💚",
    "nodejs": "💚",
    "express": "🚂",
    "django": "🎸",
    "flask": "🌶️",
    "fastapi": "⚡",
    "spring": "🍃",
    "laravel": "🔺",
    "rails": "🛤️",
    "asp.net": "🔷",

    // Databases
    "mongodb": "🍃",
    "mysql": "🐬",
    "postgresql": "🐘",
    "postgres": "🐘",
    "redis": "🔴",
    "sqlite": "🪶",
    "oracle": "🔴",
    "cassandra": "💍",
    "elasticsearch": "🔍",
    "firebase": "🔥",
    "supabase": "⚡",

    // Cloud & DevOps
    "aws": "☁️",
    "azure": "☁️",
    "gcp": "☁️",
    "google cloud": "☁️",
    "docker": "🐳",
    "kubernetes": "☸️",
    "jenkins": "🔧",
    "terraform": "🏗️",
    "ansible": "🤖",
    "nginx": "🟢",
    "apache": "🪶",

    // Tools & Others
    "git": "🔀",
    "github": "🐙",
    "gitlab": "🦊",
    "vscode": "💻",
    "visual studio": "💻",
    "intellij": "💡",
    "vim": "📝",
    "emacs": "📝",
    "postman": "📮",
    "figma": "🎨",
    "photoshop": "🎨",
    "illustrator": "🎨",

    // Data Science & ML
    "tensorflow": "🧠",
    "pytorch": "🔥",
    "keras": "🧠",
    "scikit-learn": "🤖",
    "sklearn": "🤖",
    "pandas": "🐼",
    "numpy": "🔢",
    "matplotlib": "📊",
    "seaborn": "📊",
    "plotly": "📈",
    "jupyter": "📓",
    "opencv": "👁️",
    "nltk": "📚",
    "spacy": "🤖",

    // Mobile Development
    "react native": "📱",
    "flutter": "🦋",
    "android": "🤖",
    "ios": "🍎",
    "xamarin": "💙",

    // Testing
    "jest": "🃏",
    "mocha": "☕",
    "pytest": "🧪",
    "selenium": "🌐",
    "cypress": "🌲",

    // Build Tools
    "webpack": "📦",
    "vite": "⚡",
    "rollup": "📦",
    "parcel": "📦",
    "gulp": "🥤",
    "grunt": "🐗",

    // Other Tools
    "graphql": "💗",
    "rest": "🌐",
    "api": "🔌",
    "websocket": "🔌",
    "xampp": "🔶",
    "linux": "🐧",
    "ubuntu": "🟠",
    "windows": "🪟",
    "macos": "🍎",
    "streamlit": "🎈",
    "dash": "📊",
    "airflow": "🌊",
};

/**
 * Get emoji for a skill based on its name
 * @param skillName - The name of the skill
 * @returns The emoji representing the skill, or a default emoji if not found
 */
export function getSkillEmoji(skillName: string): string {
    const normalizedName = skillName.toLowerCase().trim();

    // Direct match
    if (skillEmojiMap[normalizedName]) {
        return skillEmojiMap[normalizedName];
    }

    // Partial match - check if skill name contains any key
    for (const [key, emoji] of Object.entries(skillEmojiMap)) {
        if (normalizedName.includes(key) || key.includes(normalizedName)) {
            return emoji;
        }
    }

    // Default emoji for unknown skills
    return "🔧";
}
