import React from "react";

export default function CreateNewView({ setTaskDetailsIsOpen, setIsEdit }) {
  return (
    <div className="create-new-view">
      <button
        onClick={() => {
          setTaskDetailsIsOpen(true);
          setIsEdit(false);
        }}
      >
        Create New <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
