export default function TaskFilters({ status, search, onStatusChange, onSearchChange }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="task-filters">
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`filter-tab ${status === filter.value ? 'active' : ''}`}
            onClick={() => onStatusChange(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <input
        type="search"
        className="search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
