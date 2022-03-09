import "src/components/pages/page.scss";
import SearchBar from "@/elements/SearchBar";
import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import get from "@/util/GetRequest";
import GameCard from "./GameCard";
import "./homePageContent.scss";
import IGame from "../util/IGame";

function HomePage() {
  const [apiGames, setApiGames] = useState<IGame[]>([]);

  const initalRequest = async () => {
    const data = await get<IGame[]>("http://localhost:3000/games");
    setApiGames(data);
  };

  useEffect(() => {
    initalRequest();
  }, []);

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "");
  const [foundGames, setFoundGames] = useState<IGame[]>([]);

  const handleChange = (searchBarValue: string) => {
    setSearchTerm(searchBarValue);
  };

  const filterGames = () => {
    if (!searchTerm) {
      setFoundGames([]);
    } else {
      setFoundGames(apiGames.filter((game) => game.gameName.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  };

  useEffect(() => {
    filterGames();
  }, [searchTerm]);

  return (
    <div className="home-page-div">
      <SearchBar onChange={handleChange} defaultValue={searchTerm} games={foundGames} />
      <div className="game-platform-filter-div">
        <NavLink to="/products?platform=PC" className="category-button" id="PC">
          PC
        </NavLink>
        <NavLink to="/products?platform=XBox" className="category-button">
          XBox
        </NavLink>
        <NavLink to="/products?platform=PlayStation" className="category-button">
          PlayStation
        </NavLink>
      </div>
      <div className="recent-added-games-div">
        <p className="games-div-text">New games. Try it first</p>
        <div className="games-div">
          {apiGames
            .sort((a, b) => Date.parse(b.addingDate) - Date.parse(a.addingDate))
            ?.slice(0, 3)
            .map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
