import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

// Define Zod schema
const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  userId: z.number().int().nullable(), // Allow userId to be null
  email: z.string().email(),
});

// Infer TypeScript type from Zod schema
type UserState = z.infer<typeof userSchema>;

const initialState: UserState = {
  username: '',
  userId: null, // This is now valid
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<unknown>) => {
      const result = userSchema.safeParse(action.payload);

      if (result.success) {
        const { username, userId, email } = result.data;
        state.username = username;
        state.userId = userId;
        state.email = email;
      } else {
        console.error('Invalid user data:', result.error.format());
      }
    },
    clearUser: (state) => {
      state.username = '';
      state.userId = null; // This is now valid
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
