import { Task } from "@prisma/client";
import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { boolean } from "zod";
import { api } from "~/utils/api";


// interface TaskModalProps {
//     setModalOpen: Dispatch<SetStateAction<boolean>>
//     setTask: Dispatch<SetStateAction<Task[]>>
// }

export default function TaskModal({ setModalOpen, setTask }) {
    
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<string>("Work");
    const [categories, setCategories] = useState<{ id: string; name: string; }[]>([])

    const { data: categoriesData, isError: isTaskError } = api.category.getCategory.useQuery();

    useEffect(() => {
      if (categoriesData) {
        setCategories(categoriesData);
      }
    }, [categoriesData]);

    const { mutate: addTask } = api.task.create.useMutation({
        onSuccess(item) {
        setTask((prev) => [...prev, item])
        },
        onError(error) {
          console.error("Error adding task:", error.message);
          alert("Failed to add task. Please try again later.");
        },
      });

    return(
      <div className="absolute inset-0 flex items-center justify-center bg-black/75">
        <div className="space-y-6 bg-white p-6 shadow-lg rounded-xl relative max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Task</h2>
          <input
            type='text'
            value={title}
            placeholder="Title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-medium placeholder-gray-400 border-b-2 border-gray-300 focus:outline-none focus:border-violet-500 transition"
          />

        {/* mudei para o mais adequado, devido a varias linhas */}
        <textarea
            value={description}
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 p-2 text-sm placeholder-gray-400 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-300 transition"
          />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-300"
        >
          {categories?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

          <div className="flex justify-end gap-4">
            <button
              type='button'
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 transition"
              >
              Cancel
            </button>
            <button
              type='button'
              onClick={() => {
                //console.log(category.toString())
                addTask({ title: title, description: description, category: category.toString() })
                setModalOpen(false)
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-violet-500 rounded-lg shadow-sm hover:bg-violet-600 transition"
              >
              Add
            </button>
          </div>
        </div>
      </div>
)
    
}