"use client"
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  
  return (
    <ListGroupItem className="d-flex align-items-center">
      <Button 
        onClick={() => dispatch(addTodo(todo))}
        className="btn btn-success me-2"
        id="wd-add-todo-click">
        Add
      </Button>
      <Button 
        onClick={() => dispatch(updateTodo(todo))}
        className="btn btn-warning me-2"
        id="wd-update-todo-click">
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        placeholder="Enter todo title"
      />
    </ListGroupItem>
  );
}