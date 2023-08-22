import { useState, useEffect } from "react";
import axios from "axios";

function EditView({ setTaskList, taskObj, setTaskObj, setTaskDetailsIsOpen }) {
  const [editedTodo, setEditedTodo] = useState(null);
  const [task, setTask] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  useEffect(() => {
    if (taskObj) {
      setTask(taskObj.item);
    }
  }, [taskObj]);

  useEffect(() => {
    async function createTask() {
      try {
        await axios.patch(
          `http://localhost:5000/task/${taskObj._id}`,
          editedTodo,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const getRes = await axios.get("http://127.0.0.1:5000/task");
        setTaskList(getRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (editedTodo !== null) {
      createTask();
    }
  }, [editedTodo, setTaskList, taskObj]);

  useEffect(() => {
    async function deleteTask() {
      try {
        await axios.delete(`http://localhost:5000/task/${taskIdToDelete}`);
        console.log("Task deleted successfully");
        const getRes = await axios.get("http://127.0.0.1:5000/task");
        setTaskList(getRes.data);
      } catch (err) {
        console.log("Error");
        console.error(err);
      }
    }
    if (taskIdToDelete) {
      deleteTask();
      setTaskDetailsIsOpen(false);
      setTaskObj(null);
      setTask("");
    }
  }, [setTaskDetailsIsOpen, setTaskList, setTaskObj, taskIdToDelete]);

  async function handleEditTask(e) {
    e.preventDefault();
    setEditedTodo({ item: task });
    setTask("");
  }

  async function handleDeleteTask(e) {
    e.preventDefault();
    setTaskIdToDelete(taskObj._id);
  }

  function handleEdit(e) {
    e.preventDefault();
    setCanEdit(true);
  }

  return (
    <div className="task-details">
      <h2>Task:</h2>
      <form action="#" method="post" onSubmit={handleEditTask}>
        {/* <label>Title</label> */}
        <input
          type="text"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Title"
          required
          disabled={!canEdit}
          autoComplete="off"
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
          disabled={!canEdit}
        ></textarea>
        <div className="category">
          <label>Category</label>
          <select name="category" id="">
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <div className="buttons">
          <button className="delete-btn" onClick={handleDeleteTask}>
            Delete Task
          </button>
          {canEdit ? (
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

export default EditView;
