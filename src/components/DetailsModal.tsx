import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { api } from "~/utils/api";

interface DetailsModalProps {
  taskId: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const DetailsModal: FC<DetailsModalProps> = ({ taskId, setModalOpen }) => {
  const { data, error, isLoading } = api.task.getDetails.useQuery({
    id: taskId, 
  },);

  console.log("API Data:", data, taskId);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/75">
      <div className="space-y-4 bg-white p-3">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600"
        >
          X
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{data?.title}</h2>
        <p>{data?.description}</p>
        <p>Status: {data?.completed ? "Completed" : "Incomplete"}</p>
        <p>Created At: {new Date(data?.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DetailsModal;
