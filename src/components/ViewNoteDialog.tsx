"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ViewNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: {
    title: string;
    content: string;
    categories: string[];
    createdAt: string;
  };
}

export default function ViewNoteDialog({
  open,
  onOpenChange,
  note,
}: ViewNoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            // className="space-y-6 p-4"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{note.title}</h2>
              <div className="flex flex-wrap gap-2">
                {note.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Created on {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="prose prose-sm max-w-none">
              <p>{note.content}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
