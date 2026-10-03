import { axiosInstance } from "../services";

export async function getExistingShapes(roomId: string) {
    const res = await axiosInstance.get(`/chats/${roomId}`);
    const messages = res.data?.data?.messages || res.data?.messages || [];

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}