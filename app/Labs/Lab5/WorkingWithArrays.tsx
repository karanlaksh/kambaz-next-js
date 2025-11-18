"use client";
import React, { useState } from "react";
import { FormControl, Row, Col } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <Row className="mb-3">
        <Col xs={8}>
          <FormControl 
            id="wd-todo-id" 
            value={todo.id} 
            onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
          />
        </Col>
        <Col xs={4}>
          <a 
            id="wd-retrieve-todo-by-id" 
            className="btn btn-primary w-100" 
            href={`${API}/${todo.id}`}
          >
            Get Todo by ID
          </a>
        </Col>
      </Row>
      <hr />

      <h4>Filtering Array Items</h4>
      <a 
        id="wd-retrieve-completed-todos" 
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h4>Creating new Items in an Array</h4>
      <a 
        id="wd-create-todo" 
        className="btn btn-primary"
        href={`${API}/create`}
      >
        Create Todo
      </a>
      <hr />

      <h4>Deleting from an Array</h4>
      <Row className="mb-3">
        <Col xs={8}>
          <FormControl 
            id="wd-delete-todo-id" 
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
          />
        </Col>
        <Col xs={4}>
          <a 
            id="wd-delete-todo" 
            className="btn btn-danger w-100"
            href={`${API}/${todo.id}/delete`}
          >
            Delete Todo with ID = {todo.id}
          </a>
        </Col>
      </Row>
      <hr />

      <h4>Updating an Item in an Array</h4>
      <Row className="mb-3">
        <Col xs={2}>
          <FormControl 
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
          />
        </Col>
        <Col xs={6}>
          <FormControl 
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })} 
          />
        </Col>
        <Col xs={4}>
          <a 
            className="btn btn-primary w-100"
            href={`${API}/${todo.id}/title/${todo.title}`}
          >
            Update Todo
          </a>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={2}>
          <FormControl 
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
          />
        </Col>
        <Col xs={6}>
          <FormControl 
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })} 
          />
        </Col>
        <Col xs={4}>
          <a 
            id="wd-update-todo-description"
            className="btn btn-primary w-100"
            href={`${API}/${todo.id}/description/${todo.description}`}
          >
            Update Description
          </a>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={2}>
          <FormControl 
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })} 
          />
        </Col>
        <Col xs={6}>
          <div className="form-check mt-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={todo.completed}
              onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} 
            />
            <label className="form-check-label">
              Completed
            </label>
          </div>
        </Col>
        <Col xs={4}>
          <a 
            id="wd-update-todo-completed"
            className="btn btn-primary w-100"
            href={`${API}/${todo.id}/completed/${todo.completed}`}
          >
            Update Completed
          </a>
        </Col>
      </Row>

      <hr />
    </div>
  );
}