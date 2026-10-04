import { axiosInstance } from "../services";

export async function getExistingShapes(roomId: string) {
    try {
        const res = await axiosInstance.get(`chats/${roomId}`);
        const messages = res.data?.data?.messages || res.data?.messages || [];

        const shapes = messages
            .map((x: { message: string }) => {
                try {
                    const messageData = JSON.parse(x.message);
                    return messageData?.shape;
                } catch {
                    return null;
                }
            })
            .filter((shape: any) => Boolean(shape));

        return shapes;
    } catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}