import { createSlice } from '@reduxjs/toolkit';
import allSprites, { SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants/sprites';

const initialState = {
    sprites: [allSprites[0]],
    selectedSpriteId: allSprites[0].id,
    showCollisionAnimation: false,
    collisionHandled: false,
};

const spritesSlice = createSlice({
    name: 'sprites',
    initialState,
    reducers: {
        addSprite: (state, action) => {
            const newSprite = {
                id: action.payload.id,
                name: action.payload.name,
                position: { x: 0, y: 0 },
                rotation: 0,
                actions: [],
            };
            state.sprites.push(newSprite);
            state.selectedSpriteId = newSprite.id;
        },

        selectSprite: (state, action) => {
            state.selectedSpriteId = action.payload;
        },

        removeSprite: (state, action) => {
            // Filter out the sprite with the matching ID
            state.sprites = state.sprites.filter(sprite => sprite.id !== action.payload);
        },

        addActionToSprite: (state, action) => {
            const { spriteId, actionType, actionText, payload } = action.payload;
            const sprite = state.sprites.find((sprite) => sprite.id === spriteId);
            if (sprite) sprite.actions.push({ type: actionType, text: actionText, payload });
        },

        move: (state, action) => {
            const { steps, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x += Math.cos((sprite.rotation * Math.PI) / 180) * steps;
                sprite.position.y -= Math.sin((sprite.rotation * Math.PI) / 180) * steps;
            }
        },

        goTo: (state, action) => {
            const { x, y, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x = x;
                sprite.position.y = y;
            }
        },

        rotate: (state, action) => {
            const { degree, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) sprite.rotation += degree;
        },

        deleteAction: (state, action) => {
            const { index } = action.payload;
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId);
            if (sprite) sprite.actions.splice(index, 1);
        },

        toggleCollision: (state, action) => {
            const { showCollisionAnimation } = action.payload;
            if (showCollisionAnimation && state.sprites.length > 2) {
                state.sprites = state.sprites.slice(0, 2);
            }
            state.showCollisionAnimation = showCollisionAnimation;
        },

        checkCollisionAndSwap: (state, action) => {
            const { spriteId1, spriteId2 } = action.payload;
            const sprite1 = state.sprites.find((s) => s.id === spriteId1);
            const sprite2 = state.sprites.find((s) => s.id === spriteId2);

            const hasCollisionOccurred = (sprite1, sprite2) => {
                const { x: x1, y: y1 } = sprite1.position;
                const { x: x2, y: y2 } = sprite2.position;
                return !(x1 > x2 + SPRITE_WIDTH || x1 + SPRITE_WIDTH < x2 || y1 > y2 + SPRITE_HEIGHT || y1 + SPRITE_HEIGHT < y2);
            };

            if (hasCollisionOccurred(sprite1, sprite2) && state.showCollisionAnimation) {
                [sprite1.actions, sprite2.actions] = [sprite2.actions, sprite1.actions];
                state.showCollisionAnimation = false;
                state.collisionHandled = true;
            }
        },

        resetCollisionHandled: (state) => {
            state.collisionHandled = false;
        },

        updateActionValue: (state, action) => {
            const { index, field, value } = action.payload;
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId);
            if (sprite) sprite.actions[index].payload[field] = value;
        },
    },
});

export const {
    addSprite,
    selectSprite,
    removeSprite, // Export the remove action
    addActionToSprite,
    move,
    goTo,
    rotate,
    deleteAction,
    toggleCollision,
    checkCollisionAndSwap,
    resetCollisionHandled,
    updateActionValue,
} = spritesSlice.actions;

export default spritesSlice.reducer;
