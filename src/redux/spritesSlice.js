import { createSlice } from '@reduxjs/toolkit';
import allSprites, { SPRITE_HEIGHT, SPRITE_WIDTH } from '../constants/sprites';

const initialState = {
    sprites: [
        allSprites[0] // Initialize with the first sprite from the constants
    ],
    selectedSpriteId: allSprites[0].id, // Set initial selected sprite
    showCollisionAnimation: false,
    collisionHandled: false,
};

const spritesSlice = createSlice({
    name: 'sprites',
    initialState,
    reducers: {
        // Action to add a new sprite
        addSprite: (state, action) => {
            state.sprites.push({
                id: action.payload.id,
                name: action.payload.name,
                position: { x: 0, y: 0 }, // Default position
                rotation: 0, // Initial rotation
                actions: [], // Empty actions array
            });
            state.selectedSpriteId = action.payload.id; // Set newly added sprite as selected
        },
        // Action to update selected sprite
        selectSprite: (state, action) => {
            state.selectedSpriteId = action.payload;
        },
        // Add an action to a specific sprite
        addActionToSprite: (state, action) => {
            const { spriteId, actionType, actionText, payload } = action.payload;
            const sprite = state.sprites.find(sprite => sprite.id === spriteId);
            if (sprite) {
                sprite.actions.push({ type: actionType, text: actionText, payload });
            }
        },
        // Move the sprite by adjusting its position based on rotation and steps
        move: (state, action) => {
            const { steps, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x += Math.cos((sprite.rotation * Math.PI) / 180) * steps;
                sprite.position.y -= Math.sin((sprite.rotation * Math.PI) / 180) * steps;
            }
        },
        // Set sprite position directly to specific coordinates
        goTo: (state, action) => {
            const { x, y, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.position.x = x;
                sprite.position.y = y;
            }
        },
        // Rotate the sprite by a given degree
        rotate: (state, action) => {
            const { degree, spriteId } = action.payload;
            const sprite = state.sprites.find((s) => s.id === spriteId);
            if (sprite) {
                sprite.rotation += degree;
            }
        },
        // Remove an action from the sprite's actions list
        deleteAction: (state, action) => {
            const { index } = action.payload;
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId);
            if (sprite) {
                sprite.actions.splice(index, 1); // Remove action by index
            }
        },
        // Toggle collision animation and limit sprite count if enabled
        toggleCollision: (state, action) => {
            const { showCollisionAnimation } = action.payload;
            if (showCollisionAnimation && state.sprites.length > 2) {
                state.sprites = state.sprites.slice(0, 2); // Keep only two sprites
            }
            state.showCollisionAnimation = showCollisionAnimation;
        },
        // Check collision between two sprites and swap actions if they collide
        checkCollisionAndSwap: (state, action) => {
            const { spriteId1, spriteId2 } = action.payload;
            const sprite1 = state.sprites.find((s) => s.id === spriteId1);
            const sprite2 = state.sprites.find((s) => s.id === spriteId2);

            const hasCollisionOccurred = (sprite1, sprite2) => {
                const { x: x1, y: y1 } = sprite1.position;
                const { x: x2, y: y2 } = sprite2.position;
                const width = SPRITE_WIDTH;
                const height = SPRITE_HEIGHT;
                return !(x1 > x2 + width || x1 + width < x2 || y1 > y2 + height || y1 + height < y2);
            };

            if (hasCollisionOccurred(sprite1, sprite2) && state.showCollisionAnimation) {
                [sprite1.actions, sprite2.actions] = [sprite2.actions, sprite1.actions];
                state.showCollisionAnimation = false;
                state.collisionHandled = true;
            }
        },
        // Reset collision handled status
        resetCollisionHandled: (state) => {
            state.collisionHandled = false;
        },
        // Update the value of an action for a specific sprite
        updateActionValue: (state, action) => {
            const { index, field, value } = action.payload;
            const sprite = state.sprites.find((s) => s.id === state.selectedSpriteId);
            if (sprite) {
                sprite.actions[index].payload[field] = value;
            }
        },
    },
});

// Export actions for external use
export const {
    addSprite,
    selectSprite,
    updateActionValue,
    toggleCollision,
    resetCollisionHandled,
    deleteAction,
    checkCollisionAndSwap,
    goTo,
    move,
    rotate,
    addActionToSprite,
} = spritesSlice.actions;

// Export reducer as the default export
export default spritesSlice.reducer;
