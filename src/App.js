import React from 'react';

import Background from './components/Background';
import Settings from './components/Settings';
import Board from './components/Board';

function App() {
    const [gameOptions, setGameOptions] = React.useState(null);

    const startGame = options => {
        setGameOptions(options);
    };

    const restartGame = () => {
        setGameOptions(null);
    };

    return (
        <>
            <Background />
            <h1>Memory Game</h1>
            {!gameOptions ? (
                <Settings startGame={startGame} />
            ) : (
                <Board gameOptions={gameOptions} restartGame={restartGame} />
            )}
        </>
    );
}

export default App;
