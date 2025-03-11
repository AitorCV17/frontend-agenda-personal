import { useQuery } from "react-query";
import axiosInstance from "../utils/axiosInstance";

export const useEvents = () => {
  return useQuery("events", async () => {
    const { data } = await axiosInstance.get("/events");
    return data;
  });
};
