"use client";

import { Todo } from "@prisma/client";
import axios from "axios";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

interface CreateTodoProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const CreateTodo: FC<CreateTodoProps> = ({ todos, setTodos }) => {
  const [content, setContent] = useState<string>("");

  const onCreateTodo = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (!content || !token) return;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/todo`,
        {
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent("");

      setTodos([response.data, ...todos]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="bg-red-100" onSubmit={onCreateTodo}>
      <input
        className="input-style"
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input className="btn-style ml-2" type="submit" value="생성" />
    </form>
  );
};

export default CreateTodo;
