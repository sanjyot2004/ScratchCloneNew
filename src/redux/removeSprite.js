import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sprites: []
};

const spritesSlice = createSlice({
    name: 'sprites',
    initialState,
    reducers: {
        addSprite: (state, action) => {
            state.sprites.push(action.payload);
        },
        removeSprite: (state, action) => {
            state.sprites = state.sprites.filter(sprite => sprite.id !== action.payload);
        }
    }
});

export const { addSprite, removeSprite } = spritesSlice.actions;
export default spritesSlice.reducer;
