import { Container, IconButton, Typography } from "@mui/material";
import { Delete, Cancel } from "@mui/icons-material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function Todo({ todo, markComplete, index, deleteOne }) {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid white",
    borderRadius: "5px",
    height: "100%",
  };

  return (
    <Container style={containerStyle}>
      <IconButton
        onClick={() => markComplete(index)}
        style={{ color: "#50fa7b" }}
      >
        {todo.isDone ? <Cancel></Cancel> : <TaskAltIcon></TaskAltIcon>}
      </IconButton>

      <Typography
        variant="h5"
        style={
          todo.isDone
            ? {
                textDecoration: "line-through",
                color: "gray",
              }
            : {}
        }
      >
        {todo.content}
      </Typography>

      <IconButton style={{ color: "#ff5555" }} onClick={() => deleteOne(index)}>
        <Delete></Delete>
      </IconButton>
    </Container>
  );
}

export default Todo;
