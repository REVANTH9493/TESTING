
import Image from "next/image";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@/lib/courses";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";

interface MyLearningCardProps {
  course: Course;
}

export function MyLearningCard({ course }: MyLearningCardProps) {
  const courseImage = PlaceHolderImages.find(p => p.id === course.imageId);
  // Simulate some progress
  const progress = Math.floor(Math.random() * 60) + 10; 

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/dashboard/courses/${course.id}`}>
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
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg font-headline leading-tight mb-2 flex-grow">
            <Link href={`/dashboard/courses/${course.id}`} className="hover:text-primary transition-colors">
                {course.title}
            </Link>
        </CardTitle>
        <div className="space-y-2 mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">{progress}% Complete</p>
        </div>
        <Button asChild className="mt-4 w-full">
            <Link href={`/dashboard/courses/${course.id}`}>Continue Learning</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
