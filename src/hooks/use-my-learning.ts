"use client";

import { useState, useEffect } from 'react';
import { type Course } from '@/lib/courses';

const MY_LEARNING_KEY = 'my-learning-courses';

export function useMyLearning() {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(MY_LEARNING_KEY);
      if (item) {
        setEnrolledCourses(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setEnrolledCourses([]);
    }
    setIsLoaded(true);
  }, []);

  const addCourse = (course: Course) => {
    const updatedCourses = [...enrolledCourses, course];
    setEnrolledCourses(updatedCourses);
    try {
      window.localStorage.setItem(MY_LEARNING_KEY, JSON.stringify(updatedCourses));
    } catch (error) {
      console.error("Failed to write to localStorage", error);
    }
  };

  return { enrolledCourses, addCourse, isLoaded };
}
