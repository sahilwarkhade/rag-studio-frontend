import apiConnector, { API_BASE_URL } from "../apiConnector";

export const queryLLM = async (query, setMessages) => {
  try {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    let accumulated = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      accumulated += chunk;

      setMessages((prev) => {
        const newList = [...prev];
        newList[newList.length - 1] = {
          role: "assistant",
          content: accumulated,
        };
        return newList;
      });
    }
  } catch (error) {
    console.log("ERROR IN UPLOADING FILE :: ", error);
  }
};
