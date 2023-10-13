import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact } from './operations';
// Immutable Updates with Immer
import produce from 'immer';

export const contactInitialState = {
  items: null,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    deleteContact: (state, action) => {
      // Immutable Updates with Immer
      return produce(state, draftState => {
        draftState.items = draftState.items.filter(
          contact => contact.id !== action.payload
        );
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addMatcher(action => {
        action.endsWith('/pending');
      }, handlePending)
      .addMatcher(action => {
        action.endsWith('/rejected');
      }, handleRejected);
  },
});

export const { deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
