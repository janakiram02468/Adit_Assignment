import Button from '../common/Button';

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <article className={`task-card ${task.status}`}>
      <div className="task-card-main">
        <label className="task-checkbox">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggle(task._id)}
          />
          <span className="checkmark" />
        </label>

        <div className="task-content">
          <h3 className={task.status === 'completed' ? 'completed' : ''}>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <div className="task-meta">
            <span className={`badge badge-${task.status}`}>{task.status}</span>
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <Button variant="secondary" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(task._id)}>
          Delete
        </Button>
      </div>
    </article>
  );
}
