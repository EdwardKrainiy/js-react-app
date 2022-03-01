import "src/elements/productsContent.scss";
import "../assets/images/minecraftGameImage.jpg";
import "../assets/images/counterStrikeGameImage.jpg";
import "../assets/images/overwatchGameImage.jpg";
import "../assets/images/fallout4GameImage.jpg";
import "../assets/images/battlefield1GameImage.jpg";
import "../assets/images/battlefield5GameImage.jpg";
import "../assets/images/untilDawnGameImage.jpg";
import "../assets/images/manOfMedanGameImage.jpg";
import "../assets/images/dyingLight2GameImage.jpg";
import "../assets/images/theBidingOfIsaacGameImage.jpg";
import "./searchBar.scss";
import IGame from "../util/IGame";

interface IProps {
  onChange: (value: string) => void;
  defaultValue: string;
  games: IGame[];
}

function SearchBar({ onChange, defaultValue, games }: IProps) {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const searchFieldValue = event.currentTarget.value;
    onChange(searchFieldValue);
  };

  return (
    <div className="search-field-div">
      <input className="search-field" placeholder="Search" value={defaultValue} type="text" onChange={handleChange} />
      <div className="search-bar-found-games">
        {games
          ? games.map((game) => (
              <div className="found-game-text" role="button" onMouseDown={() => alert(game.gameName)} tabIndex={0}>
                {game.gameName}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default SearchBar;
