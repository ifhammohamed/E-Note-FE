import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: {
    id: number;
    title: string;
    content: string;
    categories: string[];
    archived: boolean;
  };
  updateNote: (
    id: number,
    note: {
      title: string;
      content: string;
      categories: string[];
      archived: boolean;
    }
  ) => void;
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

export default function EditNoteDialog({
  open,
  onOpenChange,
  note,
  updateNote,
}: EditNoteDialogProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    note.categories
  );

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedCategories(note.categories);
  }, [note]);

  const handleCategoryChange = (categoryValue: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((cat) => cat !== categoryValue)
        : [...prev, categoryValue]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNote(note.id, {
      title,
      content,
      categories: selectedCategories,
      archived: note.archived,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Categories</Label>
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
              <Button type="submit" className="w-full">
                Update Note
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
