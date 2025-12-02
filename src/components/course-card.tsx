import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Course } from "@/lib/courses";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const courseImage = PlaceHolderImages.find(p => p.id === course.imageId);
  const instructorImage = PlaceHolderImages.find(p => p.id === course.instructor.avatarId);

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          {courseImage && (
            <Image
              src={courseImage.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              data-ai-hint={courseImage.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline leading-tight mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
           <Avatar className="h-6 w-6">
                {instructorImage && <AvatarImage src={instructorImage.imageUrl} alt={course.instructor.name} data-ai-hint={instructorImage.imageHint} />}
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{course.instructor.name}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="text-lg font-bold">₹{course.price}</div>
      </CardFooter>
    </Card>
  );
}
