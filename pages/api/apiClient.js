// src/api/apiClient.js
import axios from "axios";

const apiBaseUrl = "https://ton-game-backend.onrender.com/";

const apiClient = axios.create({
  baseURL: apiBaseUrl, // API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const enterGameRoom = async (player, gameRoom) => {
  try {
    const response = await apiClient.post(
      `/api/game-status/enter-room`,
      player,
      gameRoom
    );
    // Wait for the response
    console.log("Enter the room successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error in entering the room:", error);
    throw error;
  }
};

export const leaveRoom = async (player, gameRoom) => {
  try {
    const response = await apiClient.post(
      `/api/game-status/leave-room`,
      player,
      gameRoom
    );
    // Wait for the response
    console.log("Leave the room successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error in leaving the room:", error);
    throw error;
  }
};

export const updateState = async (gameRoom) => {
  try {
    const response = await apiClient.post(
      `/api/game-status/leave-room`,
      player,
      gameRoom
    );
    // Wait for the response
    console.log("Leave the room successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error in leaving the room:", error);
    throw error;
  }
};
