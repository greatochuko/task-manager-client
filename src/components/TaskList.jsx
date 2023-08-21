import { useEffect } from "react";
import Task from "./Task";

export default function TaskList({ setTaskId, taskList, setTaskList }) {
  useEffect(() => {
    async function getTaskList() {
      const url = "http://127.0.0.1:5000/task";
      const res = await fetch(url);
      const data = await res.json();
      setTaskList(data);
    }
    getTaskList();
    console.log("FEtch");
  }, [setTaskList]);
  return (
    <div className="task-list">
      <header>
        <h1>Today</h1>
        <button className="add-task-btn">
          <i className="fa-solid fa-plus"></i>
        </button>
      </header>
      {taskList.map((task) => {
        return <Task key={task._id} task={task} setTaskId={setTaskId} />;
      })}
    </div>
  );
}
