import apiConnector from "../apiConnector";

export const uploadFile = async (file) => {
  try {
    const response = await apiConnector.post("/upload", file);
    console.log(response.data);
  } catch (error) {
    console.log("ERROR IN UPLOADING FILE :: ", error);
  }
};
