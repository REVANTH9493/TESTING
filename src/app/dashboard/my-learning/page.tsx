import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookCheck } from "lucide-react";

export default function MyLearningPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <BookCheck className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight font-headline">
          My Learning
        </h3>
        <p className="text-sm text-muted-foreground">
          Courses you've enrolled in will appear here.
        </p>
      </div>
    </div>
  )
}
