const STORAGE_KEY = 'study04-todos';

function normalizeTodo(item) {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const id = typeof item.id === 'string' ? item.id : '';
  const text = typeof item.text === 'string' ? item.text : '';
  const dueAt = typeof item.dueAt === 'string' ? item.dueAt : '';
  const createdAt = typeof item.createdAt === 'string' ? item.createdAt : '';
  const createdDateKey =
    typeof item.createdDateKey === 'string' ? item.createdDateKey : '';

  if (!id || !text || !createdAt || !createdDateKey) {
    return null;
  }

  return {
    id,
    text,
    dueAt,
    createdAt,
    createdDateKey,
  };
}

export function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeTodo).filter(Boolean);
  } catch (error) {
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    // Storage quota or browser policy issues are ignored for this study project.
  }
}
