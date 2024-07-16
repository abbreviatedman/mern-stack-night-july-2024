import React, { useState } from "react";
import { IconButton } from "@mui/material";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";

function Form({ addTodo, clearCompleted }) {
  const [formValue, setFormValue] = useState({
    content: "",
    isDone: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    addTodo(formValue);
    setFormValue({ content: "", isDone: false });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formValue.content}
        onChange={(e) =>
          setFormValue({ ...formValue, content: e.target.value })
        }
      />
      <IconButton variant="contained" onClick={clearCompleted}>
        <RemoveDoneIcon color="primary"></RemoveDoneIcon>
      </IconButton>
    </form>
  );
}

export default Form;
