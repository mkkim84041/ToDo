import { useMemo, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import TodoList from './components/TodoList';
import { toDateKey } from './utils/date';
import { loadTodos, saveTodos } from './utils/storage';

function App() {
  const [todos, setTodos] = useState(() => loadTodos());
  const [query, setQuery] = useState('');

  const commitTodos = (nextTodos) => {
    setTodos(nextTodos);
    saveTodos(nextTodos);
  };

  const handleAddTodo = (text, dueAt) => {
    const now = new Date();
    const nextTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      dueAt,
      createdAt: now.toISOString(),
      createdDateKey: toDateKey(now),
    };

    commitTodos([nextTodo, ...todos]);
  };

  const handleDeleteTodo = (id) => {
    const nextTodos = todos.filter((todo) => todo.id !== id);
    commitTodos(nextTodos);
  };

  const handleStartEdit = (id) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id !== id) {
        return { ...todo, isEditing: false, editText: '', editDueAt: '' };
      }

      return {
        ...todo,
        isEditing: true,
        editText: todo.text,
        editDueAt: todo.dueAt,
      };
    });

    setTodos(nextTodos);
  };

  const handleChangeDraft = (id, field, value) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id !== id || !todo.isEditing) {
        return todo;
      }

      if (field === 'text') {
        return { ...todo, editText: value };
      }

      if (field === 'dueAt') {
        return { ...todo, editDueAt: value };
      }

      return todo;
    });

    setTodos(nextTodos);
  };

  const handleSaveEdit = (id) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id !== id || !todo.isEditing) {
        return { ...todo, isEditing: false, editText: '', editDueAt: '' };
      }

      const nextText = (todo.editText || '').trim();
      if (!nextText) {
        return { ...todo, isEditing: false, editText: '', editDueAt: '' };
      }

      return {
        ...todo,
        text: nextText,
        dueAt: todo.editDueAt || '',
        isEditing: false,
        editText: '',
        editDueAt: '',
      };
    });

    commitTodos(nextTodos);
  };

  const filteredTodos = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return todos;
    }

    return todos.filter((todo) => todo.text.toLowerCase().includes(keyword));
  }, [todos, query]);

  const groupedTodos = useMemo(() => {
    const groupsByDate = filteredTodos.reduce((acc, todo) => {
      const dateKey = todo.createdDateKey || toDateKey(todo.createdAt);

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(todo);
      return acc;
    }, {});

    return Object.keys(groupsByDate)
      .sort((a, b) => {
        if (a === b) {
          return 0;
        }

        return a > b ? -1 : 1;
      })
      .map((dateKey) => ({
        dateKey,
        items: groupsByDate[dateKey],
      }));
  }, [filteredTodos]);

  return (
    <main className="app-shell py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <h1 className="h3 fw-bold mb-0">할일 앱</h1>
                  <span className="badge text-bg-primary rounded-pill">
                    전체 {todos.length}개
                  </span>
                </div>

                <TodoForm onAddTodo={handleAddTodo} />
                <SearchBar query={query} onChangeQuery={setQuery} />
                <TodoList
                  groups={groupedTodos}
                  onStartEdit={handleStartEdit}
                  onChangeDraft={handleChangeDraft}
                  onSaveEdit={handleSaveEdit}
                  onDelete={handleDeleteTodo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
