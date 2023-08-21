const Task = ({ task, setTaskId }) => {
  function handleTaskId() {
    setTaskId(task._id);
  }

  function handleDelete() {
    return;
  }
  return (
    <div className="task" onClick={handleTaskId}>
      <input type="checkbox" />
      <p>
        {task.item}{" "}
        <span title="delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </span>
      </p>
    </div>
  );
};

export default Task;
