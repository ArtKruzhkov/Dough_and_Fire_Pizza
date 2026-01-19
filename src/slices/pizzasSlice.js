import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchAllPizzas',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(APIpizzas);
      return res.data;
    } catch (error) {
      return rejectWithValue(error || 'Failed to load pizzas');
    }
  },
);

// export const fetchPizzaById = createAsyncThunk(
//   'pizzas/fetchPizzaById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`${APIpizzas}/${id}`);
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error || 'Failed to load pizza by id');
//     }
//   },
// );

const initialState = {
  items: [],
  loading: true,
  error: null,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

export default pizzasSlice.reducer;
