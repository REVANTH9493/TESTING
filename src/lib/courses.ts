import { PlaceHolderImages } from './placeholder-images';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: {
    name: string;
    title: string;
    avatarId: string;
  };
  imageId: string;
  upiUrl: string;
  duration: number;
  learnings: string[];
  modules: {
    title: string;
    lessons: {
      title: string;
      duration: string;
      type: 'video' | 'doc';
    }[];
  }[];
}

export const courses: Course[] = [
  {
    id: "1",
    title: "The Complete Web Development Bootcamp",
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
    price: 499,
    instructor: {
      name: "Angela Yu",
      title: "Web Development Instructor",
      avatarId: "instructor-1",
    },
    imageId: "course-1",
    upiUrl: "upi://pay?pa=ulearn@example&pn=U-Learn&am=499&cu=INR&tn=Course:WebDevBootcamp",
    duration: 55,
    learnings: [
        "Build 16 web development projects for your portfolio",
        "Master backend development with Node",
        "Learn the latest frameworks and technologies, including Javascript ES6, React.js",
        "Master frontend development with React",
    ],
    modules: [
        { title: "Module 1: Frontend", lessons: [{title: "Introduction to HTML", duration: "15:30", type: "video"}, {title: "CSS Grid", duration: "25:00", type: "video"}] },
        { title: "Module 2: Backend", lessons: [{title: "Node.js Basics", duration: "45:10", type: "video"}, {title: "Express.js", duration: "01:15:00", type: "video"}] },
    ]
  },
  {
    id: "2",
    title: "Machine Learning A-Z: AI & Data Science",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
    price: 599,
    instructor: {
      name: "Kirill Eremenko",
      title: "Data Scientist",
      avatarId: "instructor-2",
    },
    imageId: "course-2",
    upiUrl: "upi://pay?pa=ulearn@example&pn=U-Learn&am=599&cu=INR&tn=Course:MachineLearning",
    duration: 44,
    learnings: [
        "Master Machine Learning on Python & R",
        "Make accurate predictions",
        "Build an army of powerful Machine Learning models",
        "Handle specific topics like Reinforcement Learning, NLP and Deep Learning",
    ],
    modules: [
        { title: "Module 1: Data Preprocessing", lessons: [{title: "Importing datasets", duration: "10:20", type: "video"}] },
        { title: "Module 2: Regression", lessons: [{title: "Simple Linear Regression", duration: "30:00", type: "video"}] },
    ]
  },
  {
    id: "3",
    title: "iOS & Swift - The Complete iOS App Dev",
    description: "From beginner to iOS app developer with just one course! Fully updated with a comprehensive module dedicated to SwiftUI!",
    price: 699,
    instructor: {
      name: "Angela Yu",
      title: "iOS & Swift Instructor",
      avatarId: "instructor-1",
    },
    imageId: "course-3",
    upiUrl: "upi://pay?pa=ulearn@example&pn=U-Learn&am=699&cu=INR&tn=Course:iOSBootcamp",
    duration: 60,
    learnings: [
        "Be able to build any app you want",
        "Craft a portfolio of apps to apply for junior developer jobs",
        "Build apps for your own business or startup",
        "Master creating Augmented Reality apps using Apple's new ARKit",
    ],
    modules: [
        { title: "Module 1: Swift Basics", lessons: [{title: "Variables and Constants", duration: "20:00", type: "video"}] },
        { title: "Module 2: SwiftUI", lessons: [{title: "Introduction to SwiftUI", duration: "50:30", type:"video"}] },
    ]
  },
  {
    id: "4",
    title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
    description: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
    price: 499,
    instructor: {
      name: "Maximilian Schwarzmüller",
      title: "React Developer",
      avatarId: "instructor-3",
    },
    imageId: "course-4",
    upiUrl: "upi://pay?pa=ulearn@example&pn=U-Learn&am=499&cu=INR&tn=Course:ReactComplete",
    duration: 48,
    learnings: [
        "Build powerful, fast, user-friendly and reactive web apps",
        "Provide amazing user experiences by leveraging the power of JavaScript with ease",
        "Apply for high-paid jobs or work as a freelancer",
        "Learn all about React Hooks and React Components",
    ],
    modules: [
        { title: "Module 1: React Basics", lessons: [{title: "Components & Props", duration: "35:00", type: "video"}] },
        { title: "Module 2: Advanced React", lessons: [{title: "Hooks Deep Dive", duration: "01:05:12", type: "video"}] },
    ]
  },
];
