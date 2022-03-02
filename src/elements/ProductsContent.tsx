import { useEffect, useState } from "react";
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
import { useLocation, useSearchParams } from "react-router-dom";
import debounce from "debounce";
import GameCard from "./GameCard";
import loadingAnim from "../assets/images/loadingAnimation.svg";
import SearchBar from "./SearchBar";
import IGame from "../util/IGame";
import api from "../util/GetResponse";

function ProductsContent() {
  const [apiGames, setApiGames] = useState<IGame[]>([]);

  const initalRequest = async () => {
    const data = await api<IGame[]>("http://localhost:3000/games");
    setApiGames(data);
  };

  useEffect(() => {
    initalRequest();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "");
  const [groupTerm, setGroupTerm] = useState(searchParams.get("platform") ?? "");

  const filterGames = (games: IGame[]) => {
    if (!searchTerm && !groupTerm) {
      return games;
    }
    return games.filter(
      (game) =>
        game.platform.map((platform) => platform.toLowerCase()).includes(groupTerm.toLowerCase()) &&
        game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredGames = filterGames(apiGames);

  const [filteredList, setFilteredList] = useState<IGame[]>(filteredGames);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const searchAndFilterRequest = debounce(async () => {
    setIsLoading(true);
    const games = await api<IGame[]>("http://localhost:3000/games");
    let results: IGame[] = games;
    if (searchTerm && groupTerm) {
      results = filterGames(games);
    } else if (searchTerm) {
      results = games.filter((game) => game.gameName.toLowerCase().includes(searchTerm.toLowerCase()));
    } else if (groupTerm) {
      results = games.filter((game) =>
        game.platform.map((platform) => platform.toLowerCase()).includes(groupTerm.toLowerCase())
      );
    }
    setFilteredList(results);
    setIsLoading(false);
  }, 300);

  const handleChange = (searchBarValue: string) => {
    setSearchTerm(searchBarValue);
  };

  useEffect(() => {
    if (searchTerm) {
      searchParams.set("search", searchTerm);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);

    searchAndFilterRequest();
  }, [searchTerm]);

  useEffect(() => {
    if (groupTerm) {
      searchParams.set("platform", groupTerm);
    } else {
      searchParams.delete("platform");
    }
    setSearchParams(searchParams);

    searchAndFilterRequest();
  }, [groupTerm]);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") ?? "");
    setGroupTerm(searchParams.get("platform") ?? "");
  }, [location.search]);

  return (
    <div className="products-div">
      <SearchBar onChange={handleChange} defaultValue={searchTerm} games={[]} />

      <div className="game-list-div">
        <div>
          <p className="games-div-text">All games</p>
        </div>
        <div className="games-div">
          {isLoading ? (
            <img className="anim-icon" src={loadingAnim as string} alt="" />
          ) : (
            filteredList?.map((game) => <GameCard game={game} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsContent;
