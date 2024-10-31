import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import { addTodo, deleteTodo, editTodo, toggleTodoCompletion } from "@/slice/todoSlice";
import TodoList from "@/components/organisms/TodoList";

const mockStore = configureMockStore();
const store = mockStore({
  todos: { todos: [{ id: "1", task: "Sample Task", completed: false }] },
});

describe("TodoList Component", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("renders the todo list and input field", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(getByPlaceholderText("Enter task")).toBeTruthy();
    expect(getByText("Sample Task")).toBeTruthy();
  });

  it("adds a new todo when the add button is pressed", () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "New Task");

    const addButton = getByText("Add Task");
    fireEvent.press(addButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(addTodo({ completed: false, task: "New Task" }));
  });

  it("deletes a todo when the delete button is pressed", () => {
    const { getByText, getAllByTestId } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const deleteButton = getAllByTestId("delete-button")[0];
    fireEvent.press(deleteButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(deleteTodo("1"));
  });

  it("toggles todo completion when the checkbox is pressed", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const checkbox = getAllByTestId("checkbox")[0];
    fireEvent.press(checkbox);

    const actions = store.getActions();
    expect(actions).toContainEqual(toggleTodoCompletion("1"));
  });

  it("edits a todo when the edit button is pressed", () => {
    const { getByPlaceholderText, getByText, getAllByTestId } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    const editButton = getAllByTestId("edit-button")[0];
    fireEvent.press(editButton);

    const input = getByPlaceholderText("Enter task");
    fireEvent.changeText(input, "Edited Task");

    const updateButton = getByText("Update Task");
    fireEvent.press(updateButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(editTodo({ id: "1", task: "Edited Task", completed: false }));
  });
});
