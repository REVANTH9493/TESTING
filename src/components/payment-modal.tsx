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

interface PaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
}

export function PaymentModal({
  isOpen,
  onOpenChange,
  course,
}: PaymentModalProps) {
  const [upiId, setUpiId] = useState("");

  if (!course) {
    return null;
  }
  
  const baseUpiUrl = generateUpiUrl({
    payeeVpa: "ulearn@example",
    payeeName: "U-Learn",
    amount: course.price,
    transactionNote: `Course: ${course.title}`
  });

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    baseUpiUrl
  )}`;

  const handlePayWithId = () => {
    if (!upiId) {
      toast({
        variant: "destructive",
        title: "UPI ID required",
        description: "Please enter your UPI ID to proceed.",
      })
      return;
    }
    const upiUrlWithId = generateUpiUrl({
      payeeVpa: upiId,
      payeeName: "U-Learn",
      amount: course.price,
      transactionNote: `Course: ${course.title}`
    });
    window.location.href = upiUrlWithId;
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
              <Image
                src={qrCodeUrl}
                alt="UPI QR Code"
                width={200}
                height={200}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Scan the QR code with any UPI app
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
              />
              <Button onClick={handlePayWithId}>
                Pay
              </Button>
            </div>
          </div>

        </div>
        <DialogFooter className="sm:justify-center">
           <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={baseUpiUrl}>Pay with UPI App on Mobile</a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
