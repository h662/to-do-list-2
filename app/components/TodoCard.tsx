"use client";

import { Todo } from "@prisma/client";
import axios from "axios";
import { FC, FormEvent, useState } from "react";

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: FC<TodoCardProps> = ({ todo }) => {
  const [isDone, setIsDone] = useState<boolean>(todo.isDone);
  const [editToggle, setEditToggle] = useState<boolean>(false);
  const [updateContent, setUpdateContent] = useState<string>(todo.content);
  const [content, setContent] = useState<string>(todo.content);

  const onIsDone = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await axios.put<Todo>(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}/is-done`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsDone(response.data.isDone);
    } catch (error) {
      console.error(error);
    }
  };

  const onEditToggle = () => {
    setEditToggle(!editToggle);
  };

  const onEdit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (!updateContent || updateContent === content || !token) return;

      const response = await axios.put<Todo>(
        `${process.env.NEXT_PUBLIC_URL}/api/todo/${todo.id}`,
        {
          content: updateContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditToggle(false);
      setContent(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="flex">
      {editToggle ? (
        <form onSubmit={onEdit}>
          <input
            className="input-style"
            type="text"
            value={updateContent}
            onChange={(e) => setUpdateContent(e.target.value)}
          />
          <input className="btn-style ml-2" type="submit" value="수정" />
        </form>
      ) : (
        <button
          className={`w-60 text-left truncate ${isDone && "line-through"}`}
          onClick={onIsDone}
        >
          {content}
        </button>
      )}
      <button className="btn-style ml-2" onClick={onEditToggle}>
        {editToggle ? "취소" : "수정"}
      </button>
      <button className="btn-style ml-2">삭제</button>
    </li>
  );
};

export default TodoCard;
