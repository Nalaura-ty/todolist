import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { api } from "~/utils/api";
import {HiX} from "react-icons/hi";

interface DetailsModalProps {
  taskId: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailsModal: FC<DetailsModalProps> = ({ taskId, setModalOpen }) => {
  const { data, error, isLoading } = api.task.getDetails.useQuery({
    id: taskId, 
  },);

  console.log("API Data:", data, taskId);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/75">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/75">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-red-600">Error on task details!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-6 shadow rounded-lg relative">

        <HiX onClick={() => setModalOpen(false)} className="absolute top-3 right-3 cursor-pointer text-lg text-red-500 hover:text-red-600 transition-all"
    />

        <h2 className="text-xl font-bold text-gray-800 mb-4">{data?.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{data?.description}</p>
        <p className="text-sm font-medium mb-2 ">Status:{" "}
        <span
            className={`${
              data?.completed ? "text-green-600" : "text-yellow-600"
            }`}
          >
             {data?.completed ? "Completed" : "Incomplete"}
          </span>
        </p>
        <p className="text-xs text-gray-500">Created At: {new Date(data?.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DetailsModal;
