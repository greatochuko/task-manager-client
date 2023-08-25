import { useState } from "react";
import {
  Menu,
  TaskList,
  EditView,
  CreateNewView,
  CreateView,
} from "./components";

function App() {
  const [taskObj, setTaskObj] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [taskDetailsIsOpen, setTaskDetailsIsOpen] = useState(false);

  return (
    <div className="App">
      <Menu />
      <TaskList
        setTaskObj={setTaskObj}
        taskList={taskList}
        setTaskList={setTaskList}
        setTaskDetailsIsOpen={setTaskDetailsIsOpen}
        setIsEdit={setIsEdit}
      />
      {taskDetailsIsOpen ? (
        isEdit ? (
          <EditView
            taskObj={taskObj}
            setTaskObj={setTaskObj}
            setTaskList={setTaskList}
            setTaskDetailsIsOpen={setTaskDetailsIsOpen}
          />
        ) : (
          <CreateView taskObj={taskObj} setTaskList={setTaskList} />
        )
      ) : (
        <CreateNewView
          setTaskDetailsIsOpen={setTaskDetailsIsOpen}
          setIsEdit={setIsEdit}
        />
      )}
    </div> 
  );
}

export default App;
