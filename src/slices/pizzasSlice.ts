import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const APIpizzas = 'https://68ef6f02b06cc802829d6094.mockapi.io/items';

type PizzaType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
};

type PizzasState = {
  items: PizzaType[];
  loading: boolean;
  error: Error | null;
};

export const fetchPizzas = createAsyncThunk<PizzaType[], void, { rejectValue: Error }>(
  'pizzas/fetchAllPizzas',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<PizzaType[]>(APIpizzas);
      return res.data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);

const initialState: PizzasState = {
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
        state.error = action.payload ? action.payload : new Error('Failed to load pizzas');
        state.items = [];
      });
  },
});

export default pizzasSlice.reducer;
