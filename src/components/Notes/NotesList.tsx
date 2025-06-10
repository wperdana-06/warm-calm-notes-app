
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Note } from '@/types';

interface NotesListProps {
  notes: Note[];
  onCreateNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  onCreateNote,
  onEditNote,
  onDeleteNote
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Notes</h2>
        <Button onClick={onCreateNote}>
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filteredNotes.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No notes found matching your search.' : 'No notes yet. Create your first one!'}
            </p>
          </Card>
        ) : (
          filteredNotes.map(note => (
            <Card 
              key={note.id} 
              className="p-4 cursor-pointer transition-all hover:shadow-md"
              onClick={() => onEditNote(note)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-foreground line-clamp-1">
                    {note.title || 'Untitled Note'}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {format(new Date(note.updatedAt), 'MMM d, yyyy')}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {note.content.substring(0, 150)}
                  {note.content.length > 150 ? '...' : ''}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
