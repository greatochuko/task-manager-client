import { useState, useEffect } from "react";
import axios from "axios";

function TaskDetails({ setTaskList, taskObj, isEdit, setIsEdit }) {
  const [newTodo, setNewTodo] = useState(null);
  const [task, setTask] = useState("");

  useEffect(() => {
    async function createTask() {
      try {
        await axios.post(
          "http://localhost:5000/task",
          {
            ...newTodo,
            isDone: false,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const getRes = await axios.get("http://127.0.0.1:5000/task");
        setTaskList(getRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (newTodo !== null) {
      createTask();
    }
  }, [newTodo, setTaskList]);

  async function handleCreateTask(e) {
    e.preventDefault();
    setNewTodo({ task: task });
    setTask("");
  }

  function handleEdit(e) {
    e.preventDefault();
    setIsEdit(true);
  }

  return (
    <div className="task-details">
      <h2>Task:</h2>
      <form action="#" method="post" onSubmit={handleCreateTask}>
        {/* <label>Title</label> */}
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Title"
          required
        />
        {taskObj && (
          <input type="text" name="id" value={taskObj._id} disabled />
        )}
        {/* <label>Description</label> */}
        <textarea
          name="description"
          id="task-description"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <div className="category">
          <label>Category</label>
          <select name="category" id="">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <div className="buttons">
          <button className="delete-btn">Delete Task</button>
          {isEdit ? (
            <button className="save-btn" type="submit">
              Save Changes
            </button>
          ) : (
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskDetails;
