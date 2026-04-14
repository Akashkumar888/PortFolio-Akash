// Utility helpers

export const clsx = (...classes) => classes.filter(Boolean).join(' ')

export const lerp = (a, b, t) => a + (b - a) * t

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export const mapRange = (val, inMin, inMax, outMin, outMax) => {
  return ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export const debounce = (fn, ms = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export const rotateY = (x, y, z, a) => ({
  x: x * Math.cos(a) - z * Math.sin(a),
  y,
  z: x * Math.sin(a) + z * Math.cos(a),
})

export const rotateX = (x, y, z, a) => ({
  x,
  y: y * Math.cos(a) - z * Math.sin(a),
  z: y * Math.sin(a) + z * Math.cos(a),
})

export const rotateZ = (x, y, z, a) => ({
  x: x * Math.cos(a) - y * Math.sin(a),
  y: x * Math.sin(a) + y * Math.cos(a),
  z,
})

export const project3d = (x, y, z, cx, cy, fov) => {
  const scale = fov / (fov + z)
  return { x: cx + x * scale, y: cy + y * scale, s: scale }
}

export const socialLinks = [
  { label: 'GitHub', icon: '⌥', href: 'https://github.com/Akashkumar888' },
  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/in/akash-kumar-783a25333' },
  { label: 'LeetCode', icon: '🧩', href: 'https://leetcode.com/u/akashkumar888/' },
]

export const navLinks = ['About', 'Skills', 'Projects', 'DSA', 'Contact']

// ... (keep all the existing helper functions the same) ...

export const statsData = [
  { num: '1517+', label: 'Problems Solved' },
  { num: '5', label: 'Full-Stack Apps' },
  { num: '855', label: 'Total Active Days' },
  { num: '1626', label: 'CodeChef Peak Rating' },
  { num: '1637', label: 'LeetCode Rating' },
  { num: 'Rank 11', label: 'IIIT Bhagalpur GFG' },
]

export const certificationsData = [
  {
    title: '160 Days of Programming Challenge',
    issuer: 'GeeksforGeeks',
    date: 'May 2025',
    desc: 'Completed 22-week course on GfG 160 — solving 160+ problems across arrays, graphs, trees, and DP.',
    color: 'green',
    icon: '🌱',
    link: 'https://media.geeksforgeeks.org/courses/certificates/324678cb1a5c00072ab8945fbe3386bd.pdf',
    linkLabel: 'View Certificate',
  },
  {
    title: 'Oracle SQL Practice Course',
    issuer: 'LearnQuest · Coursera',
    date: 'Jun 26, 2025',
    desc: 'Advanced joins, normalization, indexing, and query optimization — verified by Coursera.',
    color: 'blue',
    icon: '🗄️',
    link: 'https://www.coursera.org/account/accomplishments/verify/TU2MRORUTR6Y',
    linkLabel: 'Verify on Coursera',
  },
]




export const achievementsData = [
  {
    icon: '🏆',
    title: 'CodeChef 3-Star',
    detail: 'Peak rating 1626 · Top 60 / 8000+ in Weekly Starters 201',
    color: 'amber',
  },
  {
    icon: '🧩',
    title: 'LeetCode Rating 1624',
    detail: 'Top 20.8% globally out of 796K+ · 64.64% acceptance rate',
    color: 'cyan',
  },
  {
    icon: '🔥',
    title: '500+ Day GFG Streak',
    detail: 'Consistently practiced DSA daily on GeeksforGeeks',
    color: 'green',
  },
  {
    icon: '🎓',
    title: 'Institute Rank 11 — GFG',
    detail: 'Among IIIT Bhagalpur students · 700+ problems solved',
    color: 'purple',
  },
  {
    icon: '💻',
    title: '500+ Problems Solved',
    detail: 'Across LeetCode, GFG, and Coding Ninjas combined',
    color: 'pink',
  },
]

export const educationData = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'IIIT Bhagalpur',
    period: 'Nov 2022 – Jul 2026',
    score: 'CGPA: 7.42',
    icon: '🎓',
  },
]


export const skillsData = [
  {
    icon: '🖥️',
    title: 'Programming Languages',
    tags: ['C++', 'JavaScript', 'Python', 'C'],
    color: 'cyan',
  },
  {
    icon: '🌐',
    title: 'Frontend',
    tags: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux'],
    color: 'purple',
  },
  {
    icon: '⚙️',
    title: 'Backend',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Socket.io'],
    color: 'pink',
  },
  {
    icon: '🗄️',
    title: 'Database & Tools',
    tags: ['MongoDB', 'Git', 'GitHub', 'Vercel', 'VS Code'],
    color: 'green',
  },
  {
    icon: '🧩',
    title: 'DSA & CS Fundamentals',
    tags: ['Data Structures', 'Algorithms', 'DP', 'Graphs', 'Trees', 'Trie'],
    color: 'cyan',
  },
  {
    icon: '🔁',
    title: 'Development Workflow',
    tags: ['Building', 'Debugging', 'Optimizing', 'Scaling'],
    color: 'purple',
  },
]

export const projectsData = [
  {
    badge: 'Prescripto',
    badgeColor: 'blue',
    sub: 'Doctor Appointment System',
    visual: 'doctor',
    name: 'Doctor Appointment Booking System',
    desc: 'A full-stack MERN application featuring a patient-facing portal, an admin dashboard, and a doctor portal. Supports appointment scheduling, doctor management, and platform-wide operations — all deployed live on Vercel.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT Auth', 'Vercel'],
    live: 'https://doctor-appointment-booking-system-frontend-vrv5co5a4.vercel.app',
    source: 'https://github.com/Akashkumar888/Doctor-Appointment-Booking-System',
  },
  {
    badge: 'PingUp',
    badgeColor: 'purple',
    sub: 'Social Media Platform',
    visual: 'pingup',
    name: 'PingUp — Social Media Platform',
    desc: 'A real-time full-stack social media application built with React and Node.js/Express/MongoDB. Features include user feed, real-time messaging with Socket.io, connections, discover users, and profile management.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'Express.js', 'Vercel'],
    live: 'https://ping-up-alpha.vercel.app',
    source: 'https://github.com/Akashkumar888/PingUp',
  },
  {
    badge: 'Foodify',
    badgeColor: 'blue',
    sub: 'Food Delivery Platform',
    visual: 'doctor',
    name: 'Food Delivery Platform',
    desc: 'A full-stack food ordering platform with user, admin, and backend services. Features include order placement, admin dashboard, authentication, and payment integration.',
    tech: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'Razorpay'],
    live: 'https://food-delivery-frontend-lovat.vercel.app',
    source: 'https://github.com/Akashkumar888/Food-Delivery',
  },
  {
    badge: 'QuickGPT',
    badgeColor: 'purple',
    sub: 'AI Chat & Image Platform',
    visual: 'pingup',
    name: 'QuickGPT — AI Platform',
    desc: 'AI-powered full-stack application supporting chat, image generation, authentication, and credit-based payments using Razorpay. Built with scalable backend architecture.',
    tech: ['React (Vite)', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    live: 'https://quick-gpt-frontend-green.vercel.app',
    source: 'https://github.com/Akashkumar888/QuickGPT',
  },
  {
    badge: 'QuickChat',
    badgeColor: 'blue',
    sub: 'Real-Time Chat App',
    visual: 'doctor',
    name: 'Real-Time Chat Application',
    desc: 'A real-time chat system with instant messaging, online status, authentication, and image sharing using Socket.io and MERN stack.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    live: 'https://build-real-time-full-stack-chat-frontend-reixi9aht.vercel.app/login',
    source: 'https://github.com/Akashkumar888/Build-Real-Time-Full-Stack-Chat',
  },
]

export const dsaPlatforms = [
  { icon: '🧩', name: 'LeetCode', handle: 'akashgkr12', href: 'https://leetcode.com/u/akashgkr12/' },
  { icon: '🏆', name: 'CodeChef', handle: 'sedge_pixel_71', href: 'https://www.codechef.com/users/sedge_pixel_71' },
  { icon: '⚔️', name: 'Codeforces', handle: 'akashgkr12', href: 'https://codeforces.com/profile/akashgkr12' },
  { icon: '🌱', name: 'GeeksforGeeks', handle: 'akashg428x', href: 'https://www.geeksforgeeks.org/user/akashg428x/' },
  { icon: '🧠', name: 'AtCoder', handle: 'akash_kumar12', href: 'https://atcoder.jp/users/akash_kumar12' },
  { icon: '💡', name: 'CodeStudio', handle: 'Akashgkr12', href: 'https://www.naukri.com/code360/profile/Akashgkr12' },
  { icon: '🟢', name: 'HackerRank', handle: '@akashgkr12', href: 'https://www.hackerrank.com/profile/akashgkr12' },
  { icon: '📈', name: 'Codolio', handle: 'Akash_kumar888', href: 'https://codolio.com/profile/Akash_kumar888' },
]