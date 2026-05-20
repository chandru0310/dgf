// ─── PORTFOLIO DATA STORE ───
// Edit here or use the Admin Panel at /admin/index.html
// Data is saved to localStorage so Admin panel changes persist.

const DEFAULT_DATA = {
  profile: {
    name: "Chandru Govindaraj",
    title: "ECE Engineer · Innovator · Builder",
    tagline: "Electronics & Communication Engineering student at United Institute of Technology, Coimbatore. Building smart embedded systems, IoT solutions & creative tech.",
    email: "thekingmakerchandru@gmail.com",
    phone: "9345988466",
    linkedin: "chandru-govindaraj-843799256",
    blog: "https://chandrugembeddedprojects.blogspot.com",
    location: "Dharmapuri, Tamil Nadu",
    address: "2/181, Gundalapatti (village), Hale Dharmapuri (post), Dharmapuri – 636701"
  },

  skills: [
    { id: 1, icon: "🐍", name: "Python", level: "Basic", percent: 35 },
    { id: 2, icon: "💻", name: "C Programming", level: "Basic", percent: 40 },
    { id: 3, icon: "🔌", name: "Embedded Systems", level: "Pursuing", percent: 55 },
    { id: 4, icon: "📡", name: "IoT Systems", level: "Intermediate", percent: 60 },
    { id: 5, icon: "🧠", name: "CNN / AI Basics", level: "Exposure", percent: 30 },
    { id: 6, icon: "🎨", name: "Design & Creativity", level: "Passionate", percent: 75 },
    { id: 7, icon: "📣", name: "Communication", level: "Strong", percent: 80 },
    { id: 8, icon: "🚀", name: "Product Thinking", level: "Strong", percent: 70 }
  ],

  projects: [
    {
      id: 1,
      emoji: "👶",
      bgColor: "linear-gradient(135deg,#1a1a2e,#16213e)",
      tag: "Final Year Project · 2026",
      title: "Smart Baby Incubator",
      desc: "An IoT-powered smart incubator for neonates with real-time monitoring of temperature, humidity, SpO₂, and alerts — designed for rural healthcare settings.",
      link: "https://chandrugembeddedprojects.blogspot.com/2026/05/smart-baby-incubator-monitoring-and.html",
      github: ""
    },
    {
      id: 2,
      emoji: "❤️",
      bgColor: "linear-gradient(135deg,#1a0a0a,#2e1616)",
      tag: "Mini Project · 2025",
      title: "Portable IoT ECG Monitor",
      desc: "A portable cloud-connected ECG monitoring system for healthcare — captures heart data, transmits it to the cloud, and enables remote diagnosis by physicians.",
      link: "https://chandrugembeddedprojects.blogspot.com/2026/03/portable-iot-based-ecg-monitoring.html",
      github: ""
    },
    {
      id: 3,
      emoji: "☀️",
      bgColor: "linear-gradient(135deg,#1a1a0a,#2e2a00)",
      tag: "Mini Project · 2025",
      title: "Solar Charger",
      desc: "A basic-electronics solar charging circuit designed and built from scratch — demonstrates renewable energy harvesting and efficient charge management.",
      link: "https://chandrugembeddedprojects.blogspot.com/2026/03/solar-charger-with-basic-electronics.html",
      github: ""
    },
    {
      id: 4,
      emoji: "🌱",
      bgColor: "linear-gradient(135deg,#0a1a0a,#102010)",
      tag: "Conference Paper · ICEICST 2025",
      title: "Smart Irrigation (CNN)",
      desc: "Presented at an international conference — a CNN-based smart irrigation system that uses computer vision to detect crop health and optimize water usage automatically.",
      link: "",
      github: ""
    }
  ],

  certifications: [
    {
      id: 1,
      icon: "📜",
      name: "NPTEL – Soft Skills & Development",
      body: "National Programme on Technology Enhanced Learning (IITs)",
      year: "2023"
    },
    {
      id: 2,
      icon: "🤖",
      name: "NPTEL – Automation in Manufacturing",
      body: "National Programme on Technology Enhanced Learning (IITs)",
      year: "2025"
    },
    {
      id: 3,
      icon: "🌍",
      name: "International Conference – ICEICST 2025",
      body: "Presented: Smart Irrigation System Using CNN",
      year: "2025"
    },
    {
      id: 4,
      icon: "🏭",
      name: "Twin Booster Panel Assembly Training",
      body: "Spares Factory Company — Industrial Training",
      year: "2024"
    },
    {
      id: 5,
      icon: "💡",
      name: "Entrepreneurship Development Program",
      body: "Student Entrepreneur Workshop",
      year: "2024"
    }
  ]
};

// ─── LOAD DATA (localStorage overrides defaults) ───
function getPortfolioData() {
  try {
    const saved = localStorage.getItem('portfolioData');
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return DEFAULT_DATA;
}

function savePortfolioData(data) {
  localStorage.setItem('portfolioData', JSON.stringify(data));
}

function resetPortfolioData() {
  localStorage.removeItem('portfolioData');
  return DEFAULT_DATA;
}

window.PORTFOLIO = getPortfolioData();
