import { formatDueAt } from '../utils/date';

function TodoItem({
  todo,
  onStartEdit,
  onChangeDraft,
  onSaveEdit,
  onDelete,
}) {
  return (
    <li className="list-group-item py-3">
      {todo.isEditing ? (
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              value={todo.editText}
              onChange={(event) => onChangeDraft(todo.id, 'text', event.target.value)}
              placeholder="수정할 내용을 입력하세요"
            />
          </div>
          <div className="col-12 col-md-4">
            <input
              type="datetime-local"
              className="form-control"
              value={todo.editDueAt}
              onChange={(event) => onChangeDraft(todo.id, 'dueAt', event.target.value)}
            />
          </div>
          <div className="col-12 col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => onSaveEdit(todo.id)}
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <strong className="d-block mb-1">{todo.text}</strong>
            <p className="mb-0 text-secondary small">마감: {formatDueAt(todo.dueAt)}</p>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => onStartEdit(todo.id)}
            >
              수정
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(todo.id)}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
