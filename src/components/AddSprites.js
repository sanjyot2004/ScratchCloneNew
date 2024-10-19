import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpriteCard from './SpriteCard';
import allSprites from '../constants/sprites';
import { addSprite, removeSprite } from '../redux/spritesSlice';

export const AddSprites = () => {
    const dispatch = useDispatch();
    const sprites = useSelector((state) => state.sprites.sprites);

    const availableSprites = useMemo(() => {
        return allSprites.filter((currSprite) => !sprites.find(s => s.id === currSprite.id));
    }, [sprites]);

    const [showModal, setShowModal] = useState(false);
    const [selectedSprite, setSelectedSprite] = useState({ id: null, name: null });

    const handleAddSprite = () => {
        if (selectedSprite.id) {
            dispatch(addSprite({ name: selectedSprite.name, id: selectedSprite.id }));
            setShowModal(false);
            setSelectedSprite({ id: null, name: null });
        }
    };

    const handleDeleteSprite = (id) => {
        console.log("Delete Sprite ID:", id); // Debugging to check if correct sprite id is passed
        dispatch(removeSprite(id));  // Ensure the sprite is deleted from Redux state
    };

    return (
        <>
            <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={() => setShowModal(true)}
            >
                Add Sprites
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-lg font-bold mb-4">Choose a Sprite</h2>
                        {availableSprites.length > 0 ? (
                            <div className="grid grid-cols-3 gap-4">
                                {availableSprites.map((sprite, index) => (
                                    <SpriteCard
                                        key={index}
                                        spriteName={sprite.name}
                                        selected={sprite.id === selectedSprite.id}
                                        onClick={() => setSelectedSprite({ id: sprite.id, name: sprite.name })}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>No New Sprites Available</div>
                        )}
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                                onClick={handleAddSprite}
                            >
                                Add Sprite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Added Sprites with Delete Button */}
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Added Sprites</h3>
                {sprites.length > 0 ? (
                    <div className="grid grid-cols-3 gap-5">
                        {sprites.map((sprite) => (
                            <div key={sprite.id} className="relative p-2 bg-gray-200 rounded-lg">
                                <SpriteCard 
                                    spriteName={sprite.name} 
                                    selected={false}
                                    onClick={() => console.log('Sprite selected:', sprite.name)} 
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the onClick of the card
                                        handleDeleteSprite(sprite.id); // Call the delete function directly
                                    }}
                                    className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No Sprites Added</div>
                )}
            </div>
        </>
    );
};
