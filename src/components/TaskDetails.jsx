import { useState, useEffect } from "react";
import axios from "axios";

function TaskDetails({ setTaskList }) {
  const [newTodo, setNewTodo] = useState({});
  const [task, setTask] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCreated(false);
    }, 3000);
  }, []);

  function handleCreateTask(e) {
    e.preventDefault();
    setNewTodo({ task: task });
    setIsCreated(true);
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
        />
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
          <button className="save-btn" type="submit">
            Save Changes
          </button>
        </div>
      </form>
      {isCreated && (
        <TaskCreatedView newTodo={newTodo} setTaskList={setTaskList} />
      )}
    </div>
  );
}

function TaskCreatedView({ newTodo, setTaskList }) {
  useEffect(() => {
    async function createTask() {
      try {
        const res = await axios.post(
          "http://localhost:5000/task",
          {
            ...newTodo,
            isDone: false,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        console.log(res.data);
        const getRes = await axios.get("http://127.0.0.1:5000/task");
        setTaskList(getRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    console.log("New Todo: ", newTodo);

    createTask();
  }, [newTodo, setTaskList]);
  return (
    <div className="task-created">
      <h1>Task Created Successfully!</h1>
    </div>
  );
}

export default TaskDetails;
