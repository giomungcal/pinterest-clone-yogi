import { useAppContext } from "@/app/context/AppContext";
import React from "react";
import FolderEmpty from "./FolderEmpty";
import FolderIcon from "./FolderIcon";

const PinFolder = ({ folderName }) => {
  const { savedPins, navigateTo } = useAppContext();

  const urlForFolder = "profile/" + encodeURIComponent(folderName);

  return (
    <div
      onClick={() => navigateTo(urlForFolder)}
      className="w-[250px] flex flex-col justify-items-start p-2 cursor-pointer mb-4"
    >
      {savedPins[folderName].length ? (
        <FolderIcon folderName={folderName} />
      ) : (
        <FolderEmpty />
      )}
      <h3 className="text-lg font-semibold mt-1">{folderName}</h3>
      <p className="text-xs">{savedPins[folderName].length} pins</p>
    </div>
  );
};

export default PinFolder;
