import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { FaRegCopy } from "react-icons/fa6";
import { uploadFile } from "../utils/api";
import { Loading } from "../components/Loading";
import { toast } from "sonner";

interface FileFormat {
  createdAt: string;
  filename: string;
  format: string;
  secure_url: string;
  size: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const Home = () => {
  const [fileDetails, setFileDetails] = useState<FileFormat | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        setIsLoading(true);
        const res = await uploadFile(file);
        setFileDetails(res);
        toast.success("File Uploaded Sucessfully !!");
      } catch (error) {
        toast.error("Error Uploading File !!");
        console.error("Error uploading file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const copyLink = () => {
    toast.success("Link Copied !!");
    if (fileDetails) {
      navigator.clipboard.writeText(fileDetails?.secure_url);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="app-container flex justify-center items-center ">
          <div className="circle rounded-full"></div>
          <div className="circle1 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 h-screen flex justify-center items-center ">
        <div className="flex justify-center p-8 rounded-md bg-white/20 backdrop-blur gap-10 shadow-lg">
          <div className="space-y-1 text-center border-2 border-gray-200 border-dashed rounded-2xl  p-10">
            <div className="flex flex-col justify-center items-center text-gray-200">
              <label
                htmlFor="fileInput"
                className="relative cursor-pointer rounded-full font-medium border-2 p-2"
              >
                <span>
                  <HiPlus size={40} />
                </span>
                <input
                  id="fileInput"
                  name="fileInput"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="py-2">or drag and drop</p>
              <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center text-center text-gray-200 capitalize text-xl">
              <p>Let travel your files free !</p>
              <Loading />
            </div>
          ) : fileDetails === null ? (
            <div className="flex items-center text-center text-gray-200 capitalize text-xl">
              <p>Let travel your files free !</p>
            </div>
          ) : (
            <div className=" text-gray-200 p-4">
              <p>File Name : {fileDetails?.filename}</p>
              <div className="flex items-center justify-center py-3">
                <input
                  value={fileDetails?.secure_url}
                  type="text"
                  disabled
                  className="bg-blue-300 px-3 h-9 rounded-md text-white"
                />
                <button
                  className="p-2 px-4 rounded-md bg-sky-400 text-white ml-3"
                  onClick={copyLink}
                >
                  <FaRegCopy size={21} />
                </button>
              </div>
              <p className="pb-1">Size : {fileDetails?.size}</p>
              <p>Format : {fileDetails?.format}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
