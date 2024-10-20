import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateActionValue } from '../redux/spritesSlice';
import { GO_TO, MOVE_STEPS, TURN_DEGREES } from '../constants/sidebarBlocks.js';

const ActionInput = ({ action, index }) => {
    const dispatch = useDispatch();
    const textSegments = action.text.split('__'); 
    const activeSpriteId = useSelector((state) => state.sprites.selectedSpriteId); 
    const activeSprite = useSelector((state) => 
        state.sprites.sprites.find(sprite => sprite.id === activeSpriteId)
    ); 
    
    const spriteCurrentAction = activeSprite.actions[index]; 

    const determineInputHandlers = () => {
        switch (action.type) {
            case MOVE_STEPS:
                return [(value) => dispatch(updateActionValue({ index, field: 'steps', value }))];
            case TURN_DEGREES:
                return [(value) => dispatch(updateActionValue({ index, field: 'degree', value }))];
            case GO_TO:
                return [
                    (value) => dispatch(updateActionValue({ index, field: 'x', value })),
                    (value) => dispatch(updateActionValue({ index, field: 'y', value }))
                ];
            default:
                return [];
        }
    };

    const inputHandlers = determineInputHandlers();

    return (
        <div>{textSegments.map((segment, segmentIndex) => ( 
            <React.Fragment key={segmentIndex}>
                {segment}
                {segmentIndex < textSegments.length - 1 && inputHandlers[segmentIndex] && (
                    <input
                        type="number"
                        className="w-16 mx-1 px-2 py-1 text-black rounded border border-blue-300"
                        value={
                            action.type === MOVE_STEPS ? spriteCurrentAction.payload.steps :
                                action.type === TURN_DEGREES ? spriteCurrentAction.payload.degree :
                                    action.type === GO_TO ? (segmentIndex === 0 ? spriteCurrentAction.payload.x : spriteCurrentAction.payload.y) :
                                        ''
                        }
                        onChange={(e) => inputHandlers[segmentIndex](e.target.valueAsNumber)} 
                    />
                )}
            </React.Fragment>
        ))}</div>
    );
};

export default ActionInput;
