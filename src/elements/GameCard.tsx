interface IGame {
  game: {
    id: number;
    gameName: string;
    description: string;
    platform: string[];
    price: number;
    addingDate: string;
    image: string;
  };
}

function GameCard({ game }: IGame) {
  return (
    <div role="button" className="game-card-div" key={game.id} onMouseDown={() => alert("Got it!")} tabIndex={0}>
      <img className="game-image-div" src={game.image} alt="" />
      <li className="game-card-text">
        Game: <span>{game.gameName}</span>
      </li>
      <li className="game-card-text">
        Description: <span>{game.description}</span>
      </li>
      <li className="game-card-text">
        Platforms: <span>{game.platform.join(", ")}</span>
      </li>
      <li className="game-card-text">
        Price: <span>${game.price}</span>
      </li>
    </div>
  );
}

export default GameCard;
