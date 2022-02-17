import axios from "axios";
const apiUrl = "http://localhost:8080/api";

export function addTask(task: { task: string }) {
  return axios.post(apiUrl, task);
}

export function updateTask(
  id: string,
  task: {
    completed: boolean;
  }
) {
  return axios.put(apiUrl, task, {
    params: {
      id,
    },
  });
}

export function deleteTask(id: string) {
  return axios.delete(apiUrl, {
    params: {
      id,
    },
  });
}

export function getTasks(param: string, firstFetch: boolean) {
  return axios.get(apiUrl, {
    params: {
      param,
      firstFetch,
    },
  });
}
