export * from "./auth.service";
export { default as authService } from "./auth.service";
export * from "./room.service";
export { default as roomService } from "./room.service";
export {
  default as axiosInstance,
  apiV1,
  apiV2,
  createApiInstance,
  getBaseUrl,
  getToken,
  setToken,
  removeToken,
  TOKEN_STORAGE_KEY,
} from "../lib/axios";
export type { ApiVersion } from "../lib/axios";

import authService from "./auth.service";
export default authService;
