import axios from "axios";
import { useEffect, useState } from "react";

function Task({ task, setTaskObj, setTaskList }) {
  const [deleteId, setDeleteId] = useState(null);

  function handleTaskId() {
    setTaskObj(task);
  }

  useEffect(() => {
    async function deleteTask() {
      try {
        await axios.delete(`http://localhost:5000/task/${deleteId}`);
        const getRes = await axios.get("http://127.0.0.1:5000/task");
        setTaskList(getRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (deleteId) {
      deleteTask();
    }
  }, [deleteId, setTaskList]);

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
