function SearchBar({ query, onChangeQuery }) {
  return (
    <div className="mb-4">
      <label htmlFor="todo-search" className="form-label fw-semibold">
        검색
      </label>
      <div className="input-group">
        <span className="input-group-text">할일</span>
        <input
          id="todo-search"
          type="text"
          className="form-control"
          value={query}
          onChange={(event) => onChangeQuery(event.target.value)}
          placeholder="할일 내용을 검색하세요"
        />
      </div>
    </div>
  );
}

export default SearchBar;
