"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getRecommendationsAction } from "@/app/actions";
import { type PersonalizedCourseRecommendationsOutput } from "@/ai/flows/personalized-course-recommendations";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Bot } from "lucide-react";

const formSchema = z.object({
  learningHistory: z.string().optional(),
  searchHistory: z.string().optional(),
  interests: z.string().min(1, "Please tell us at least one interest."),
});

type FormValues = z.infer<typeof formSchema>;

export default function RecommendationsPage() {
  const [result, setResult] = useState<PersonalizedCourseRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learningHistory: "",
      searchHistory: "",
      interests: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);

    const input = {
        learningHistory: values.learningHistory?.split(',').map(s => s.trim()).filter(Boolean) || [],
        searchHistory: values.searchHistory?.split(',').map(s => s.trim()).filter(Boolean) || [],
        interests: values.interests.split(',').map(s => s.trim()).filter(Boolean),
    };

    const response = await getRecommendationsAction(input);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
    setLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-primary" />
            Personalized Recommendations
          </CardTitle>
          <CardDescription>
            Let our AI assistant suggest courses tailored just for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Web Development, Data Science, Machine Learning"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What topics are you excited to learn about? (comma-separated)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed Courses (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Introduction to Python, SQL Basics"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      List any courses you've taken before. (comma-separated)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="searchHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search History (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'best javascript frameworks', 'how to learn react'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What have you been searching for? (comma-separated)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Get Recommendations"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="font-headline text-xl font-semibold">AI Suggestions</h2>
        {loading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {result && (
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center gap-2">
                <Bot className="h-5 w-5"/>
                Here are your recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Recommended Courses:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {result.recommendedCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reasoning:</h3>
                <p className="text-muted-foreground">{result.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {!loading && !result && !error && (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full min-h-[200px]">
                <div className="flex flex-col items-center gap-1 text-center p-4">
                    <h3 className="text-2xl font-bold tracking-tight font-headline">
                        Results will appear here
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Fill out the form to get your personalized course plan.
                    </p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
