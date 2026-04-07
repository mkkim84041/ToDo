import TodoItem from './TodoItem';
import { formatDateHeading } from '../utils/date';

function TodoList({ groups, onStartEdit, onChangeDraft, onSaveEdit, onDelete }) {
  if (!groups.length) {
    return (
      <div className="alert alert-secondary mb-0" role="status">
        표시할 할일이 없습니다.
      </div>
    );
  }

  return (
    <div className="d-grid gap-3">
      {groups.map((group) => (
        <section key={group.dateKey} className="card border-0 shadow-sm">
          <div className="card-header bg-primary-subtle d-flex justify-content-between align-items-center">
            <h2 className="h6 mb-0 fw-bold">{formatDateHeading(group.dateKey)}</h2>
            <span className="badge text-bg-light">{group.items.length}개</span>
          </div>
          <ul className="list-group list-group-flush">
            {group.items.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onStartEdit={onStartEdit}
                onChangeDraft={onChangeDraft}
                onSaveEdit={onSaveEdit}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default TodoList;
