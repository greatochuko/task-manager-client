import { useState } from "react";
import { Menu, TaskList, TaskDetails } from "./components";

function App() {
  const [taskId, setTaskId] = useState();
  const [taskList, setTaskList] = useState([]);

  return (
    <div className="App">
      <Menu />
      <TaskList
        setTaskId={setTaskId}
        taskList={taskList}
        setTaskList={setTaskList}
      />
      <TaskDetails taskId={taskId} setTaskList={setTaskList} />
    </div>
  );
}

export default App;
