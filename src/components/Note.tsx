import { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, Archive, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EditNoteDialog from "./EditNoteDialog";

interface NoteProps {
  note: {
    id: number;
    title: string;
    content: string;
    archived: boolean;
    createdAt: string;
    updatedAt: string;
    categories: string[];
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
  deleteNote: (id: number) => void;
  archiveNote: (id: number) => void;
  unarchiveNote: (id: number) => void;
}

const Note: React.FC<NoteProps> = ({
  note,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className={`overflow-hidden ${
          note.archived
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-white dark:bg-gray-800"
        } transition-colors duration-300 mb-4`}
      >
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold truncate">
            {note.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">
            {note.content}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {note.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {new Date(note.updatedAt).toLocaleDateString()}
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteNote(note.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            {note.archived ? (
              <Button
                variant="outline"
                size="icon"
                onClick={() => unarchiveNote(note.id)}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={() => archiveNote(note.id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      <EditNoteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        note={note}
        updateNote={updateNote}
      />
    </motion.div>
  );
};

export default Note;
