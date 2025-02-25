import type { Task } from "@prisma/client";
import Head from "next/head";
import { useState, useEffect } from "react";
import TaskModal from "~/components/TaskModal";
import {HiX} from "react-icons/hi";

import { api } from "~/utils/api";
import DetailsModal from "~/components/DetailsModal";

export default function Home() {

  const [task, setTask] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenDetails, setModalOpenDetails] = useState<boolean>(false);
  const [idTask, setIdTask] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [Idcategory, setIdCategory] = useState<string>("");

  const { data: tasksData } = api.task.getAll.useQuery();
  
  useEffect(() => {
    if (tasksData) {
      setTask(tasksData);
    }
  }, [tasksData]);

  const { mutate: deleteTask} = api.task.delete.useMutation({
    onSuccess(data){
      setTask((prev) => prev.filter((item) => item.id !== data.id))
    },
    onError(error) {
      setErrorMessage("Failed to delete the task. Please try again.");
      console.error(error.message);
    },
  });

  const { mutate: toggleChecked } = api.task.toggleChecked.useMutation({
    onSuccess(ItemTask) {
      setTask((prev) =>
        prev.map((item) =>
          item.id === ItemTask.id
            ? { ...item, completed: ItemTask.completed }
            : item
        )
      );
    },
    onError(error) {
      setErrorMessage("Failed to update the task status. Please try again.");
      console.error(error.message); 
    },
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <>
      <Head>
        <title>To do list</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     {modalOpen && <TaskModal setModalOpen={setModalOpen} setTask={setTask}/>}

      {modalOpenDetails && <DetailsModal setModalOpen={setModalOpenDetails} taskId={idTask} categoryId={Idcategory}/>}
      
      <main className="mx-auto my-6 sm:my-12 max-w-xs sm:max-w-md md:max-w-3xl p-4 sm:p-6 bg-gray-50 shadow-lg rounded-lg">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 text-center sm:text-left">
        My To-Do List
      </h2>
          <button type="button" onClick={() => setModalOpen(true)} className="bg-violet-500 hover:bg-violet-600 text-white text-sm sm:text-base px-4 py-2 rounded-md shadow-md transition-all w-full sm:w-auto"
      >Add task</button>
        </div>

        <ul className="space-y-3 sm:space-y-1">
          {task?.map((item) => {
            const {id, title, completed, categoryId} = item
            return (
              <li key={id} className={`flex justify-between items-center bg-white shadow rounded-lg p-4 transition-all ${
              completed ? "opacity-75 line-through" : "opacity-100"
            }`}>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input type="checkbox"
                  className="h-4 w-4  text-violet-500 border-gray-300 rounded" 
                  checked={completed}
                  onChange={() =>{ toggleChecked({
                    id,
                    completed:!completed,
                  })} }/>
                  <span 
                  className="text-sm sm:text-base md:text-lg cursor-pointer hover:underline break-words"
                  onClick={() => { 
                    setIdCategory(categoryId ?? "");
                    setIdTask(id);
                    setModalOpenDetails(true);
                    }} >{title}</span>
                </div>
                <HiX onClick={() => deleteTask({id})} className="cursor-pointer text-lg  text-red-500 hover:text-red-600 transition-all" />
              </li>
              )}
          )}
        </ul>
      </main>
    </>
  );
}
