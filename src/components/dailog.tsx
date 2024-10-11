import * as React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => (
  <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
    <div className="fixed inset-0 bg-black opacity-50" onClick={() => onOpenChange(false)}></div>
    <div className="relative bg-white rounded-lg shadow-xl p-4 mx-auto mt-20 w-1/3">{children}</div>
  </div>
);

export const DialogContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

export const DialogHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;

export const DialogTitle = ({ children }: { children: React.ReactNode }) => <h3 className="text-xl font-semibold">{children}</h3>;

export const DialogDescription = ({ children }: { children: React.ReactNode }) => <p className="text-gray-600">{children}</p>;

export const DialogFooter = ({ children }: { children: React.ReactNode }) => <div className="mt-4">{children}</div>;
