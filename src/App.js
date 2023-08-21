import { useState } from "react";
import { Menu, TaskList, TaskDetails, CreateNewView } from "./components";

function App() {
  const [taskObj, setTaskObj] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [taskDetailsIsOpen, setTaskDetailsIsOpen] = useState(false);

  return (
    <div className="App">
      <Menu />
      <TaskList
        setTaskObj={setTaskObj}
        taskList={taskList}
        setTaskList={setTaskList}
        setTaskDetailsIsOpen={setTaskDetailsIsOpen}
      />
      {taskDetailsIsOpen ? (
        <TaskDetails
          taskObj={taskObj}
          setTaskList={setTaskList}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      ) : (
        <CreateNewView setTaskDetailsIsOpen={setTaskDetailsIsOpen} />
      )}
    </div>
  );
}

export default App;
