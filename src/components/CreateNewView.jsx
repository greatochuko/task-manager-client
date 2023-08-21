import React from "react";

export default function CreateNewView({ setTaskDetailsIsOpen }) {
  return (
    <div className="create-new-view">
      <button
        onClick={() =>
          setTaskDetailsIsOpen((curr) => {
            return !curr;
          })
        }
      >
        Create New <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
