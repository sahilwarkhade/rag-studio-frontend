import apiConnector, { handleApiError } from "../apiConnector";

const DOCUMENT_ENDPOINTS = {
  GET_ALL_USER_DOCUMENTS: "/all/documents",
  GET_DOCUMENT_HISTORY: "/document/history/",
  DELETE_DOCUMENT: "/document/",
};

export const getAllUserDocuments = async (setDocuments) => {
  try {
    const response = await apiConnector.get(
      DOCUMENT_ENDPOINTS.GET_ALL_USER_DOCUMENTS
    );
    console.log(response);

    if (response?.success) {
      setDocuments(response?.allUserDocs);
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const getDocumentHistory = async (docId, setMessages) => {
  try {
    const response = await apiConnector.get(
      DOCUMENT_ENDPOINTS.GET_DOCUMENT_HISTORY + docId
    );
    if (response?.success) {
      if (response?.history) setMessages(response?.history);
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteDocument = async (docId) => {
  try {
    const response = await apiConnector.delete(
      DOCUMENT_ENDPOINTS.DELETE_DOCUMENT + docId
    );

    return response;
  } catch (error) {
    handleApiError(error);
  }
};
