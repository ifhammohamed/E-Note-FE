import axios from "axios";
import * as apiRoutes from "../apiRoutes";
class NoteService {
  async fetchNotes(pagination, searchTerm, filter, order, categories) {
    try {
      const response = await axios.get(apiRoutes.GET_ALL_NOTES, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          title: searchTerm,
          order,
          categories,
          archived:
            filter === "archived"
              ? true
              : filter === "active"
              ? false
              : undefined,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  }

  async addNote(note) {
    try {
      const response = await axios.post(apiRoutes.ADD_NOTE, note);
      return response.data.data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  }

  async updateNote(id, updatedNote) {
    try {
      const response = await axios.put(apiRoutes.UPDATE_NOTE(id), updatedNote);
      return response.data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  async deleteNote(id) {
    try {
      await axios.delete(apiRoutes.DELETE_NOTE(id));
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }

  async archiveNote(id) {
    try {
      const response = await axios.patch(apiRoutes.ARCHIVE_NOTE(id));
      return response.data;
    } catch (error) {
      console.error(
        "Error archiving note:",
        error.response?.data || error.message || error
      );
      throw error;
    }
  }

  async unarchiveNote(id) {
    try {
      const response = await axios.patch(apiRoutes.UNARCHIVE_NOTE(id));
      return response.data;
    } catch (error) {
      console.error("Error un-archiving note:", error);
      throw error;
    }
  }

  async getActiveNotes() {
    try {
      const response = await axios.get(apiRoutes.GET_ACTIVE_NOTES);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching active notes:", error);
      throw error;
    }
  }

  async getArchivedNotes() {
    try {
      const response = await axios.get(apiRoutes.GET_ARCHIVED_NOTES);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching archived notes:", error);
      throw error;
    }
  }
}

export default new NoteService();
