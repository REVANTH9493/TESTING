"use client";

import { useMyLearning } from "@/hooks/use-my-learning";
import { BookCheck } from "lucide-react";
import { MyLearningCard } from "@/components/my-learning-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyLearningPage() {
  const { enrolledCourses } = useMyLearning();

  if (enrolledCourses.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-2 text-center">
          <BookCheck className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight font-headline">
            Start Your Learning Journey
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Courses you've enrolled in will appear here.
          </p>
          <Button asChild>
            <Link href="/dashboard">Explore Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        My Learning
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {enrolledCourses.map((course) => (
          <MyLearningCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
