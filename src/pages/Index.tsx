
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Layout from '@/components/Layout';
import CalendarView from '@/components/Calendar/CalendarView';
import EventDialog from '@/components/Calendar/EventDialog';
import TodoList from '@/components/Todos/TodoList';
import TodoDialog from '@/components/Todos/TodoDialog';
import NotesList from '@/components/Notes/NotesList';
import NoteDialog from '@/components/Notes/NoteDialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Event, Todo, Note } from '@/types';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'todos' | 'notes'>('calendar');
  
  // State management with localStorage
  const [events, setEvents] = useLocalStorage<Event[]>('notes-app-events', []);
  const [todos, setTodos] = useLocalStorage<Todo[]>('notes-app-todos', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes-app-notes', []);

  // Dialog states
  const [eventDialog, setEventDialog] = useState<{
    isOpen: boolean;
    event?: Event;
    selectedDate?: Date;
  }>({ isOpen: false });
  
  const [todoDialog, setTodoDialog] = useState<{
    isOpen: boolean;
    todo?: Todo;
  }>({ isOpen: false });
  
  const [noteDialog, setNoteDialog] = useState<{
    isOpen: boolean;
    note?: Note;
  }>({ isOpen: false });

  // Event handlers
  const handleEventCreate = (date: Date) => {
    setEventDialog({ isOpen: true, selectedDate: date });
  };

  const handleEventClick = (event: Event) => {
    setEventDialog({ isOpen: true, event });
  };

  const handleEventSave = (eventData: Partial<Event>) => {
    if (eventData.id) {
      // Update existing event
      setEvents(events.map(e => e.id === eventData.id ? { ...e, ...eventData } as Event : e));
    } else {
      // Create new event
      const newEvent: Event = {
        id: uuidv4(),
        title: eventData.title!,
        description: eventData.description,
        date: eventData.date!,
        startTime: eventData.startTime!,
        endTime: eventData.endTime!,
        color: eventData.color!,
        createdAt: new Date()
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const handleTodoCreate = () => {
    setTodoDialog({ isOpen: true });
  };

  const handleTodoEdit = (todo: Todo) => {
    setTodoDialog({ isOpen: true, todo });
  };

  const handleTodoSave = (todoData: Partial<Todo>) => {
    if (todoData.id) {
      // Update existing todo
      setTodos(todos.map(t => t.id === todoData.id ? { ...t, ...todoData } as Todo : t));
    } else {
      // Create new todo
      const newTodo: Todo = {
        id: uuidv4(),
        title: todoData.title!,
        completed: false,
        priority: todoData.priority!,
        dueDate: todoData.dueDate,
        createdAt: new Date()
      };
      setTodos([...todos, newTodo]);
    }
  };

  const handleTodoToggle = (todoId: string) => {
    setTodos(todos.map(t => t.id === todoId ? { ...t, completed: !t.completed } : t));
  };

  const handleTodoDelete = (todoId: string) => {
    setTodos(todos.filter(t => t.id !== todoId));
  };

  const handleNoteCreate = () => {
    setNoteDialog({ isOpen: true });
  };

  const handleNoteEdit = (note: Note) => {
    setNoteDialog({ isOpen: true, note });
  };

  const handleNoteSave = (noteData: Partial<Note>) => {
    const now = new Date();
    if (noteData.id) {
      // Update existing note
      setNotes(notes.map(n => n.id === noteData.id ? { ...n, ...noteData, updatedAt: now } as Note : n));
    } else {
      // Create new note
      const newNote: Note = {
        id: uuidv4(),
        title: noteData.title!,
        content: noteData.content!,
        createdAt: now,
        updatedAt: now
      };
      setNotes([...notes, newNote]);
    }
  };

  const handleNoteDelete = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <CalendarView
            events={events}
            onEventCreate={handleEventCreate}
            onEventClick={handleEventClick}
          />
        );
      case 'todos':
        return (
          <TodoList
            todos={todos}
            onToggleComplete={handleTodoToggle}
            onCreateTodo={handleTodoCreate}
            onEditTodo={handleTodoEdit}
            onDeleteTodo={handleTodoDelete}
          />
        );
      case 'notes':
        return (
          <NotesList
            notes={notes}
            onCreateNote={handleNoteCreate}
            onEditNote={handleNoteEdit}
            onDeleteNote={handleNoteDelete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderActiveTab()}
      </Layout>

      <EventDialog
        isOpen={eventDialog.isOpen}
        onClose={() => setEventDialog({ isOpen: false })}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        event={eventDialog.event}
        selectedDate={eventDialog.selectedDate}
      />

      <TodoDialog
        isOpen={todoDialog.isOpen}
        onClose={() => setTodoDialog({ isOpen: false })}
        onSave={handleTodoSave}
        onDelete={handleTodoDelete}
        todo={todoDialog.todo}
      />

      <NoteDialog
        isOpen={noteDialog.isOpen}
        onClose={() => setNoteDialog({ isOpen: false })}
        onSave={handleNoteSave}
        onDelete={handleNoteDelete}
        note={noteDialog.note}
      />
    </>
  );
};

export default Index;
