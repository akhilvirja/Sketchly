import { axiosInstance } from "../lib/axios";

export interface Room {
  id: number;
  slug: string;
  createdAt: string;
  adminId?: string;
}

export interface CreateRoomResponse {
  success: boolean;
  message: string;
  data: {
    roomId: number;
  };
}

export interface GetRoomResponse {
  success: boolean;
  message?: string;
  data: {
    room: Room;
  };
}

export interface GetUserRoomsResponse {
  success: boolean;
  data: {
    rooms: Room[];
  };
}

export const roomService = {
  /**
   * Create a new room with a unique name/slug.
   */
  createRoom: async (name: string): Promise<number> => {
    const response = await axiosInstance.post<CreateRoomResponse>("/room", {
      name,
    });
    return response.data.data.roomId;
  },

  /**
   * Retrieve room details by either slug or numeric room ID.
   */
  getRoomDetails: async (slugOrId: string): Promise<Room | null> => {
    try {
      const response = await axiosInstance.get<GetRoomResponse>(`/room/${slugOrId}`);
      return response.data.data.room;
    } catch {
      return null;
    }
  },

  /**
   * Fetch all rooms created by the current user.
   */
  getUserRooms: async (): Promise<Room[]> => {
    try {
      const response = await axiosInstance.get<GetUserRoomsResponse>("/room");
      return response.data.data.rooms || [];
    } catch {
      return [];
    }
  },
};

export const createRoom = roomService.createRoom;
export const getRoomDetails = roomService.getRoomDetails;
export const getUserRooms = roomService.getUserRooms;

export default roomService;
