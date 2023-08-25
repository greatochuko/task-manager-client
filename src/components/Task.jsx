import axios from "axios";
import { useEffect, useState } from "react";

function Task({
  task,
  setTaskObj,
  setTaskList,
  setTaskDetailsIsOpen,
  setIsEdit,
}) {
  const [deleteId, setDeleteId] = useState(null);

  function handleTaskId() {
    setTaskObj(task);
    setIsEdit(true);
    setTaskDetailsIsOpen(true);
  }

  useEffect(() => {
    async function deleteTask() {
      try {
        await axios.delete(`http://localhost:5000/task/${deleteId}`);
        const getRes = await axios.get("http://127.0.0.1:5000/task");
        setTaskList(getRes.data);
        setTaskDetailsIsOpen(false);
        setTaskObj(null);
      } catch (err) {
        console.error(err);
      }
    }
    if (deleteId) {
      deleteTask();
    }
  }, [deleteId, setTaskList, setTaskDetailsIsOpen, setTaskObj]);

  async function handleDelete(e) {
    e.stopPropagation();
    setDeleteId(task._id);
    const getRes = await axios.get("http://127.0.0.1:5000/task");
    setTaskList(getRes.data);
  }
  return (
    <div className="task" onClick={handleTaskId}>
      <input type="checkbox" />
      <p>
        {task.item}
        <span title="delete" onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
        </span>
      </p>
    </div>
  );
}

export default Task;
