import { useEffect } from "react";
import Task from "./Task";
import axios from "axios";

export default function TaskList({
  setTaskObj,
  taskList,
  setTaskList,
  setTaskDetailsIsOpen,
  setIsEdit,
}) {
  useEffect(() => {
    async function getMovie() {
      const res = await axios.get("http://localhost:5000/task");
      setTaskList(res.data);
    }
    getMovie();
  }, [setTaskList]);

  function openCreateTaskView() {
    setTaskDetailsIsOpen(true);
    setTaskObj(null);
    setIsEdit(false);
  }

  return (
    <div className="task-list">
      <header>
        <h1>Today</h1>
        <button className="add-task-btn" onClick={openCreateTaskView}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </header>
      {taskList.map((task) => {
        return (
          <Task
            key={task._id}
            task={task}
            setTaskObj={setTaskObj}
            setTaskList={setTaskList}
            setTaskDetailsIsOpen={setTaskDetailsIsOpen}
            setIsEdit={setIsEdit}
          />
        );
      })}
    </div>
  );
}
