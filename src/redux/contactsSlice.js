import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact } from './operations';
// Immutable Updates with Immer
import produce from 'immer';

export const contactInitialState = {
  items: null,
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    // addContact: ({ items }, action) => {
    //   const isExist = items.some(
    //     contact => contact.name === action.payload.name
    //   );
    //   if (!isExist) {
    //     items.push(action.payload);
    //   }
    // },
    deleteContact: (state, action) => {
      // Immutable Updates with Immer
      return produce(state, draftState => {
        draftState.items = draftState.items.filter(
          contact => contact.id !== action.payload
        );
      });
    },
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
