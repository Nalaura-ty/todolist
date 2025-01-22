import { Task } from "@prisma/client";
import { FC, Dispatch, SetStateAction, useState } from "react";
import { boolean } from "zod";
import { api } from "~/utils/api";


// interface TaskModalProps {
//     setModalOpen: Dispatch<SetStateAction<boolean>>
//     setTask: Dispatch<SetStateAction<Task[]>>
// }

export default function TaskModal({ setModalOpen, setTask }) {
    
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { mutate: addTask } = api.task.create.useMutation({
        onSuccess(item) {
        setTask((prev) => [...prev, item])
        },
      });


    return( 
    <div className='absolute inset-0 flex items-center justify-center bg-black/75'>
        <div className='space-y-4 bg-white p-3'>

          <input
            type='text'
            value={title}
            placeholder="Title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            className='w-full shadow-sm text-xl font-semibold placeholder-black border-b-2 border-transparent focus:outline-none focus:border-black'
          />

        <input
            type='text'
            value={description}
            placeholder="Description..."
            onChange={(e) => setDescription(e.target.value)}
            className='w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50'
          />
          <div className='grid grid-cols-2 gap-8'>
            <button
              type='button'
              onClick={() => setModalOpen(false)}
              className='rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600'>
              Cancel
            </button>
            <button
              type='button'
              onClick={() => {
                addTask({ title: title, description: description })
                setModalOpen(false)
              }}
              className='rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600'>
              Add
            </button>
          </div>
        </div>
      </div>
)
    
}