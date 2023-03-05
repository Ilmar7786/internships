import { api } from "@/shared/api/instance";
import { User } from "@/entities/user.entity";

export const fetcherUserInfo = async () => api.get<User>('/users/info').then(data => data.data)
