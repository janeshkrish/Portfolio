import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    // About Me section
    bio: { type: String, default: "Full-stack developer with strong proficiency in RESTful APIs, scalable application design, and DSA." },
    aboutText: { type: String, default: "Aspiring Software Development Engineer with strong proficiency in full-stack development, RESTful APIs, scalable application design, and Data Structures & Algorithms.\\n\\nI love building things that actually work — from hackathon prototypes to production HRMS systems. When I'm not coding, I'm probably solving LeetCode." },
    
    // Quick Info Box
    location: { type: String, default: 'Coimbatore, TN' },
    email: { type: String, default: 'janeshkrishna12@gmail.com' },
    status: { type: String, default: 'Open to Internships/SDE roles' },
    degree: { type: String, default: 'B.Tech IT (2nd Year)' },
    
    // Education Box
    degreeTitle: { type: String, default: 'B.Tech — Information Technology' },
    university: { type: String, default: 'KGiSL Institute of Technology' },
    educationYears: { type: String, default: '2023 - 2027' },

    // Stats
    cgpa: { type: String, default: '8.24' },
    internships: { type: String, default: '2+' },
    projectsCount: { type: String, default: '10+' },
    hackathons: { type: String, default: '5' },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
