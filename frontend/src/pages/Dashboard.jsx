import { useCallback, useEffect, useState } from 'react';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Spinner from '../components/common/Spinner';
import TaskCard from '../components/tasks/TaskCard';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskForm from '../components/tasks/TaskForm';
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from '../api/tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getTasks({
        status,
        page,
        limit: 8,
        search,
      });
      setTasks(res.data.tasks);
      setPagination({
        total: res.data.pagination.total,
        totalPages: res.data.pagination.totalPages,
      });
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [status, search, page]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchTasks, search]);

  const handleCreate = async (payload) => {
    await createTask(payload);
    setShowCreateModal(false);
    await fetchTasks();
  };

  const handleUpdate = async (payload) => {
    await updateTask(editingTask._id, payload);
    setEditingTask(null);
    await fetchTasks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await deleteTask(id);
    await fetchTasks();
  };

  const handleToggle = async (id) => {
    await toggleTask(id);
    await fetchTasks();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>My Tasks</h1>
          <p>{pagination.total} task{pagination.total !== 1 ? 's' : ''} total</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>+ New Task</Button>
      </div>

      <TaskFilters
        status={status}
        search={search}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {loading ? (
        <Spinner label="Loading tasks..." />
      ) : error ? (
        <p className="api-error">{error}</p>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Create your first task or adjust your filters.</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <Button
            variant="secondary"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <span>
            Page {page} of {pagination.totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {showCreateModal && (
        <Modal title="Create Task" onClose={() => setShowCreateModal(false)}>
          <TaskForm
            submitLabel="Create Task"
            onCancel={() => setShowCreateModal(false)}
            onSubmit={handleCreate}
          />
        </Modal>
      )}

      {editingTask && (
        <Modal title="Edit Task" onClose={() => setEditingTask(null)}>
          <TaskForm
            initialValues={editingTask}
            submitLabel="Update Task"
            onCancel={() => setEditingTask(null)}
            onSubmit={handleUpdate}
          />
        </Modal>
      )}
    </div>
  );
}
