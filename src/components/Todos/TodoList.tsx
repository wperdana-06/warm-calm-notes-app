
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Calendar, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Todo } from '@/types';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (todoId: string) => void;
  onCreateTodo: () => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

const priorityIcons = {
  low: '🟢',
  medium: '🟡',
  high: '🔴'
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onCreateTodo,
  onEditTodo,
  onDeleteTodo
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const pendingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Todo List</h2>
        <Button onClick={onCreateTodo}>
          <Plus className="w-4 h-4 mr-2" />
          Add Todo
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          Pending ({pendingCount})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </Button>
      </div>

      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              {filter === 'all' ? 'No todos yet. Create your first one!' : 
               filter === 'pending' ? 'No pending todos. Great job!' :
               'No completed todos yet.'}
            </p>
          </Card>
        ) : (
          filteredTodos.map(todo => (
            <Card 
              key={todo.id} 
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                todo.completed ? 'opacity-75' : ''
              }`}
              onClick={() => onEditTodo(todo)}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => onToggleComplete(todo.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${
                    todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}>
                    {todo.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className={priorityColors[todo.priority]}>
                      <Flag className="w-3 h-3 mr-1" />
                      {todo.priority}
                    </Badge>
                    
                    {todo.dueDate && (
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(todo.dueDate), 'MMM d')}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="text-2xl">
                  {priorityIcons[todo.priority]}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
