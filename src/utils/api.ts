import axios from "axios";

const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:8000/api/file/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.file;
  } catch (error) {
    console.log(error);
  }
};

export { uploadFile };
