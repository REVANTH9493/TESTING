"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { courses, type Course } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, BarChart, PlayCircle, FileText, CheckCircle } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useMyLearning } from "@/hooks/use-my-learning";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const { enrolledCourses, isLoaded } = useMyLearning();
  
  const course = courses.find((c) => c.id === courseId);

  const isEnrolled = isLoaded && enrolledCourses.some(enrolledCourse => enrolledCourse.id === course?.id);

  if (!course) {
    notFound();
  }

  const courseImage = PlaceHolderImages.find(p => p.id === course.imageId);
  const instructorImage = PlaceHolderImages.find(p => p.id === course.instructor.avatarId);

  const handleEnroll = () => {
    if (!isEnrolled) {
      router.push(`/dashboard/courses/${courseId}/payment`);
    }
  }

  return (
    <>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold font-headline">{course.title}</h1>
          <p className="text-lg text-muted-foreground">
            {course.description}
          </p>

          <div className="relative aspect-video rounded-lg overflow-hidden">
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

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-disc pl-5">
                {course.learnings.map((learning, index) => (
                  <li key={index}>{learning}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{module.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' ? <PlayCircle className="h-5 w-5 text-muted-foreground" /> : <FileText className="h-5 w-5 text-muted-foreground" />}
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h2 className="text-3xl font-bold">₹{course.price}</h2>
                  {isEnrolled ? (
                     <Button className="w-full mt-4" size="lg" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Enrolled
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-4"
                      size="lg"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                  )}
              </div>
              <div className="bg-muted/50 p-6 text-sm space-y-3">
                <p className="font-bold">This course includes:</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.duration} hours on-demand video</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span>All levels</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">About the Instructor</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                 {instructorImage && <AvatarImage src={instructorImage.imageUrl} alt={course.instructor.name} data-ai-hint={instructorImage.imageHint} />}
                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{course.instructor.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {course.instructor.title}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
