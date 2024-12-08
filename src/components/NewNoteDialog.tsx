"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Import DialogTitle
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface NoteProps {
  title: string;
  content: string;
  categories: string[];
}

interface NewNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addNote: (note: NoteProps) => void;
}

const categories = [
  { value: "Work", label: "Work" },
  { value: "Personal", label: "Personal" },
  { value: "Ideas", label: "Ideas" },
  { value: "Tasks", label: "Tasks" },
  { value: "Goals", label: "Goals" },
  { value: "Health", label: "Health" },
  { value: "Finances", label: "Finances" },
  { value: "Travel", label: "Travel" },
  { value: "Hobbies", label: "Hobbies" },
  { value: "Learning", label: "Learning" },
  { value: "Events", label: "Events" },
  { value: "Recipes", label: "Recipes" },
  { value: "Books", label: "Books" },
  { value: "Projects", label: "Projects" },
  { value: "Family", label: "Family" },
  { value: "Intern", label: "Intern" },
  { value: "Interview", label: "Interview" },
];

export default function NewNoteDialog({
  open,
  onOpenChange,
  addNote,
}: NewNoteDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle note creation logic here

    addNote({
      title,
      content,
      categories: selectedCategories,
    });

    onOpenChange(false);
    setTitle("");
    setContent("");
    setSelectedCategories([]);
  };

  const handleCategoryChange = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            // className="space-y-6 p-4"
          >
            <div className="space-y-2">
              {/* Add DialogTitle for accessibility */}
              <DialogTitle className="text-2xl font-bold">
                Create New Note
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Add your thoughts, ideas, and tasks
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat.value}
                      type="button"
                      variant={
                        selectedCategories.includes(cat.value)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => handleCategoryChange(cat.value)}
                      className="rounded-full"
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Create Note
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
