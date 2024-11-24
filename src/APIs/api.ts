import axiosInstance from './axios';

// Fetch users
export const fetchUsers = async () => {
  const { data } = await axiosInstance.get('/users');
  return data;
};

// Create a new user
// api.ts
export const createUser = async (newUser: { name: string }) => {
    const { data } = await axiosInstance.post('/users', newUser);
    return data;
  };
  
  export const updateUser = async (userId: string, updatedInfo: { name?: string }) => {
    const { data } = await axiosInstance.put(`/users/${userId}`, updatedInfo);
    return data;
  };
  
