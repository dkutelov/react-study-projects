import React from 'react';

export default function GameState({
  gameState,
  userChoice,
  computerChoice,
  restartGame,
}) {
  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }

  return (
    <>
      {gameState && (
        <div className={`game-state ${gameState}`}>
          <div>
            <div className='game-state-content'>
              <p>{renderComponent(userChoice)}</p>
              {gameState === 'win' && <p>Congrats! You won!</p>}
              {gameState === 'lose' && <p>Sorry! You lost!</p>}
              {gameState === 'draw' && <p>You drew!</p>}
              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={() => restartGame()}>Play Again</button>
          </div>
        </div>
      )}
    </>
  );
}
