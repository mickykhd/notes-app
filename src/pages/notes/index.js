import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { baseURL } from '../../constants/baseUrl';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';

const Notes = () => {
  const { token, user } = useSelector(state => state.loginData);
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
      toast.error('Unable to fetch notes.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const resetForm = () => {
    setInput('');
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!token) {
      toast.error('Please log in to manage notes.');
      return;
    }
    if (!input.trim()) {
      toast.message('Write something before saving.');
      return;
    }

    const isEditing = Boolean(editingId);
    const endpoint = isEditing ? `${baseURL}/update/${editingId}` : `${baseURL}/save`;
    const method = isEditing ? 'PUT' : 'POST';

    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: input.trim() }),
      });
      if (!response.ok) throw new Error('Failed to save note');
      toast.success(isEditing ? 'Note updated.' : 'Note added.');
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async id => {
    if (!token) return;
    const confirmed = window.confirm('Delete this note permanently?');
    if (!confirmed) return;
    try {
      const response = await fetch(`${baseURL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete note');
      toast.success('Note removed.');
      if (editingId === id) {
        resetForm();
      }
      fetchNotes();
    } catch (error) {
      console.error(error);
      toast.error('Unable to delete note.');
    }
  };

  const startEditing = (note, id) => {
    setInput(note);
    setEditingId(id);
  };

  if (!token) {
    return (
      <Card className="glass-panel text-center">
        <CardHeader>
          <CardTitle className="text-primary">Sign in to see your notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted">Your notes live here once you log back in.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-muted">Notebook</p>
          <h1 className="font-display text-4xl text-primary">{user ? `${user}'s ` : ''}Living notes canvas</h1>
          <p className="text-muted">
            Capture thoughts, iterate in real-time, and keep everything synced for the next 30 days with persistent auth.
          </p>
        </div>
        <div className="glass-panel grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <label htmlFor="noteInput" className="text-sm text-muted">
              {editingId ? 'Editing note' : 'Write something brilliant'}
            </label>
            <Textarea
              id="noteInput"
              rows={6}
              placeholder="Drop your idea, list, or draft here..."
              value={input}
              onChange={event => setInput(event.target.value)}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="w-full" onClick={handleSave} disabled={submitting}>
                {submitting ? (editingId ? 'Updating...' : 'Adding...') : editingId ? 'Update note' : 'Add note'}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  Cancel edit
                </Button>
              )}
            </div>
          </div>
          <div className="surface-panel rounded-3xl p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-muted">Stats</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold text-primary">{notes.length}</p>
                <p className="text-sm text-muted">notes captured</p>
              </div>
              <div>
                <p className="text-4xl font-semibold text-primary">30d</p>
                <p className="text-sm text-muted">cookie persistence</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {loading && (
          <Card className="glass-panel sm:col-span-2 lg:col-span-3">
            <CardContent className="text-muted">Loading your notes...</CardContent>
          </Card>
        )}
        {!loading && notes.length === 0 && (
          <Card className="glass-panel border-dashed border-white/20 sm:col-span-2 lg:col-span-3">
            <CardContent className="text-center text-muted">No notes yet. Start typing above to create one.</CardContent>
          </Card>
        )}
        {notes.map(({ note, _id }) => (
          <Card key={_id} className="glass-panel">
            <CardHeader>
              <CardTitle className="text-base text-primary">Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted">{note}</p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => startEditing(note, _id)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" className="flex-1" onClick={() => handleDelete(_id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
};

export default Notes;
