import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [text, setText] = useState('');
  const [dueAt, setDueAt] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    onAddTodo(trimmed, dueAt);
    setText('');
    setDueAt('');
  };

  return (
    <form className="row g-3 mb-4" onSubmit={handleSubmit}>
      <div className="col-12 col-md-6">
        <label htmlFor="todo-text" className="form-label fw-semibold">
          새 할일
        </label>
        <input
          id="todo-text"
          type="text"
          className="form-control"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="할일 내용을 입력하세요"
        />
      </div>

      <div className="col-12 col-md-4">
        <label htmlFor="todo-due" className="form-label fw-semibold">
          마감 시간
        </label>
        <input
          id="todo-due"
          type="datetime-local"
          className="form-control"
          value={dueAt}
          onChange={(event) => setDueAt(event.target.value)}
        />
      </div>

      <div className="col-12 col-md-2 d-grid align-self-end">
        <button type="submit" className="btn btn-primary">
          추가
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
