'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="!outline-none">
        {/* <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription> */}
        {children}
      </DialogContent>
    </Dialog>
  );
}
