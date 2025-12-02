"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/courses";

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
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    course.upiUrl
  )}`;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            Complete Your Enrollment
          </DialogTitle>
          <DialogDescription>
            Scan the QR code or use the button to pay for "{course.title}".
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
          <div className="text-lg font-semibold">
            Total Amount: <span className="text-primary">₹{course.price}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            On your mobile device, you can tap the button below to open your
            UPI app directly.
          </p>
        </div>
        <Button asChild size="lg" className="w-full">
          <a href={course.upiUrl}>Pay with UPI App</a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
