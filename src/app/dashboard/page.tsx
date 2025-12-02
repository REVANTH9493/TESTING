import Link from "next/link";
import { courses } from "@/lib/courses";
import { CourseCard } from "@/components/course-card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Explore Courses
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Link href={`/dashboard/courses/${course.id}`} key={course.id} className="group">
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
}
