import { AnimatePresence, motion } from "framer-motion";
import Note from "./Note";

interface NoteProps {
  id: number;
  title: string;
  content: string;
  categories: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NoteComponentProps {
  notes: NoteProps[];
  updateNote: (
    id: number,
    note: {
      title: string;
      content: string;
      categories: string[];
      // archived: boolean;
    }
  ) => void;
  deleteNote: (id: number) => void;
  archiveNote: (id: number) => void;
  unarchiveNote: (id: number) => void;
}

const NoteList: React.FC<NoteComponentProps> = ({
  notes,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      //   className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Note
              note={note}
              updateNote={updateNote}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              unarchiveNote={unarchiveNote}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoteList;
