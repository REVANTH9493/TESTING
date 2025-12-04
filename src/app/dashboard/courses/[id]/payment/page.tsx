"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter, notFound } from "next/navigation";
import { courses, type Course } from "@/lib/courses";
import { useMyLearning } from "@/hooks/use-my-learning";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Wallet } from "lucide-react";
import Link from "next/link";
import { generateUpiUrl } from "@/lib/upi";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const { addCourse } = useMyLearning();
  const { toast } = useToast();
  const [transactionId, setTransactionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }
  
  const upiUrl = generateUpiUrl({
    payeeVpa: 'payment@example',
    payeeName: 'Mr Nagidi Revanth',
    amount: course.price,
    transactionNote: `Payment for ${course.title}`
  });

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}`;


  const handleVerifyAndEnroll = () => {
    if (!transactionId) {
      toast({
        variant: "destructive",
        title: "Transaction ID required",
        description: "Please enter the transaction ID from your UPI app.",
      });
      return;
    }
    
    setIsProcessing(true);
    // Simulate a network request to verify the transaction
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `You have successfully enrolled in "${course.title}".`,
      });
      addCourse(course);
      setIsProcessing(false);
      router.push("/dashboard/my-learning");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
       <Link href={`/dashboard/courses/${courseId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
         <ArrowLeft className="h-4 w-4" />
         Back to Course
       </Link>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Complete Your Payment</CardTitle>
          <CardDescription>
            You are enrolling in: <strong>{course.title}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg inline-block shadow-md">
                    <Image
                      src={qrCodeUrl}
                      alt="UPI QR Code for Mr Nagidi Revanth"
                      width={220}
                      height={220}
                      data-ai-hint="qr code"
                      unoptimized // Required for external URL based images which are not in next.config.js
                    />
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold text-foreground">Mr Nagidi Revanth</p>
                    <p className="text-sm text-muted-foreground">
                        Scan the QR code with any UPI app
                    </p>
                    <div className="text-lg font-semibold">
                        Amount: <span className="text-primary">₹{course.price}</span>
                    </div>
                </div>
                 <Button asChild className="w-full">
                    <a href={upiUrl}>
                      <Wallet className="mr-2 h-4 w-4" />
                      Pay with UPI App
                    </a>
                </Button>
            </div>
            <div className="space-y-4">
                <div className="text-sm text-muted-foreground p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Open your UPI payment app (Google Pay, PhonePe, etc.).</li>
                        <li>Scan the QR code or use the "Pay with UPI" button.</li>
                        <li>Confirm the payment of <strong>₹{course.price}</strong>.</li>
                        <li>After payment, find the Transaction ID (or UPI Ref ID).</li>
                        <li>Enter the ID below and click "Verify & Enroll".</li>
                    </ol>
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="transactionId">UPI Transaction ID</Label>
                    <Input
                        type="text"
                        id="transactionId"
                        placeholder="e.g., T2401011234567890123456"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        disabled={isProcessing}
                    />
                </div>
            </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full" onClick={handleVerifyAndEnroll} disabled={isProcessing}>
            {isProcessing ? "Verifying..." : "Verify & Enroll"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
