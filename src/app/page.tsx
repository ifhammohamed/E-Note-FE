"use client";

import NewNoteDialog from "@/components/NewNoteDialog";
import NoteList from "@/components/NoteList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import noteService from "@/services/noteService";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  title: string;
  content: string;
  categories: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isNewNoteDialogOpen, setIsNewNoteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [categories, setCategoryFilter] = useState("");
  const [order, setOrder] = useState("desc");
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
  });

  const categoriesFilter = [
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

  const fetchNotes = async () => {
    try {
      const response = await noteService.fetchNotes(
        pagination,
        searchTerm,
        filter,
        order,
        categories
      );
      setNotes(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (note: {
    title: string;
    content: string;
    categories: string[];
  }) => {
    try {
      await noteService.addNote(note);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [pagination.page, searchTerm, filter, categories, order]);

  const updateNote = async (
    id: number,
    updatedNote: {
      title: string;
      content: string;
      categories: string[];
    }
  ) => {
    try {
      await noteService.updateNote(id, updatedNote);
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await noteService.deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const archiveNote = async (id: number) => {
    try {
      await noteService.archiveNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error archiving note:", error);
    }
  };

  const unarchiveNote = async (id: number) => {
    try {
      await noteService.unarchiveNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-500"
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              My Notes
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search notes by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter notes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notes</SelectItem>
                <SelectItem value="active">Active Notes</SelectItem>
                <SelectItem value="archived">Archived Notes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categories} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesFilter.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setIsNewNoteDialogOpen(true)}
              className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Note
            </Button>
          </div>

          <AnimatePresence>
            <NoteList
              notes={notes}
              updateNote={updateNote}
              deleteNote={deleteNote}
              archiveNote={archiveNote}
              unarchiveNote={unarchiveNote}
            />
          </AnimatePresence>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(pagination.page - 1) * pagination.limit + 1} -{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} notes
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
                disabled={pagination.page === 1}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
                }
                disabled={
                  pagination.page * pagination.limit >= pagination.total
                }
                variant="outline"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      <NewNoteDialog
        open={isNewNoteDialogOpen}
        onOpenChange={setIsNewNoteDialogOpen}
        addNote={addNote}
      />
    </div>
  );
}
