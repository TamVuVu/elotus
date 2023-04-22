import { Input, List, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiClient } from "../../Api";
import { HTTP_METHODS, appendApiKey } from "../../constant";
import { IMovie } from "../../types";

import "./index.scss";

export const Header = () => {
  const { Search } = Input;

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<IMovie[]>([]);
  const navigate = useNavigate();
  const suffix = (
    <label
      className="cursor-pointer"
      style={{
        fontSize: 16,
        color: "#ccc",
      }}
      onClick={() => {
        setSearchValue("");
      }}
    >
      {searchValue ? "x" : ""}
    </label>
  );

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onHandleSearch = async (value: string) => {
    setIsSearching(true);
    try {
      const res = await ApiClient(
        HTTP_METHODS.GET,
        appendApiKey("/search/movie", "&query=" + value),
        {
          options: { isTriggerLoading: false },
        }
      );
      setSearchedMovies(res.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setSearchedMovies([]);
    }
  }, [searchValue]);

  return (
    <header
      className="flex p-3 border-b-2 justify-between mb-5 flex-wrap relative"
      style={{ backgroundColor: "rgba(3,37,65)" }}
    >
      <nav className="flex justify-center md:justify-start xl:justify-center md:w-100 gap-3">
        <Link to={"/"}>
          <Typography className="p-1 text-white">Home</Typography>
        </Link>
        <Link to={"now-playing"}>
          <Typography className="p-1 text-white">Now Playing</Typography>
        </Link>
        <Link to={"top-rated"}>
          <Typography className="p-1 text-white">Top Rated</Typography>
        </Link>
      </nav>
      <div className="flex gap-3 w-full xl:w-6/12 md:w-6/12 sm:w-6/12">
        <Search
          value={searchValue}
          onChange={onHandleChange}
          loading={isSearching}
          onSearch={() => onHandleSearch(searchValue)}
          enterButton="Search"
          suffix={suffix}
        />
      </div>
      <div className="search-movies-results absolute w-full">
        {searchedMovies.length > 0 ? (
          <div className="w-full bg-white">
            <List
              className="searched-list px-3"
              itemLayout="horizontal"
              dataSource={searchedMovies}
              renderItem={(movie) => (
                <List.Item
                  className="cursor-pointer hover:text-red p-3"
                  onClick={() => {
                    navigate("../movies/" + movie.id);
                    setSearchedMovies([]);
                  }}
                >
                  <List.Item.Meta title={movie.title} />
                </List.Item>
              )}
            ></List>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
