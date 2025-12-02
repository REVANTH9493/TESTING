"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/courses";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { generateUpiUrl } from "@/lib/upi";
import { toast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface PaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  onPaymentSuccess: () => void;
}

export function PaymentModal({
  isOpen,
  onOpenChange,
  course,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const phonePeQrImage = PlaceHolderImages.find(p => p.id === 'phonepe-qr');

  if (!course) {
    return null;
  }
  
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    // Simulate a network request
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `You have successfully enrolled in "${course.title}".`,
      });
      onPaymentSuccess();
      setIsProcessing(false);
    }, 1500);
  };
  
  const handlePayWithId = () => {
    if (!upiId) {
      toast({
        variant: "destructive",
        title: "UPI ID required",
        description: "Please enter your UPI ID to proceed.",
      })
      return;
    }
    // In a real app, this would trigger a payment request to the user's UPI ID.
    // For this demo, we'll just simulate a successful payment.
    handleSimulatePayment();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Complete Your Enrollment
          </DialogTitle>
          <DialogDescription>
            Pay for "{course.title}" using your favorite UPI app.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-white rounded-lg inline-block shadow-md">
              {phonePeQrImage && <Image
                src={phonePeQrImage.imageUrl}
                alt="PhonePe UPI QR Code"
                width={200}
                height={200}
                data-ai-hint={phonePeQrImage.imageHint}
              />}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Scan & Pay Using PhonePe App
          </p>
          <div className="text-lg font-semibold">
            Total Amount: <span className="text-primary">₹{course.price}</span>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or pay with UPI ID
              </span>
            </div>
          </div>
          
          <div className="grid w-full items-center gap-1.5 text-left">
            <Label htmlFor="upiId">Your UPI ID</Label>
            <div className="flex w-full items-center space-x-2">
              <Input 
                type="text" 
                id="upiId" 
                placeholder="yourname@bank" 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                disabled={isProcessing}
              />
              <Button onClick={handlePayWithId} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay"}
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
           <Button size="lg" className="w-full sm:w-auto" onClick={handleSimulatePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Simulate Direct Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
