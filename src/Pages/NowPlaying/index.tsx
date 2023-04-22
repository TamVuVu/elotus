import { MovieCard, Spinner } from "../../Components";
import { HTTP_METHODS, appendApiKey } from "../../constant";

import "./index.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApiClient } from "../../Api";
import { Row, Col } from "antd";
import { IMovie } from "../../types";

export const NowPlaying = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { config } = useSelector((state: any) => state);
  // const LazyMovieCard = React.lazy(() => import('../../Components/MovieCard');)
  useEffect(() => {
    const getMovies = async () => {
      const res = await ApiClient(
        HTTP_METHODS.GET,
        appendApiKey("/movie/now_playing", "&language=en-US&page=1")
      );
      setMovies(res.results);
    };
    getMovies();
  }, []);
  console.log(movies);

  if (config.isLoading) return <Spinner />;
  return (
    <div className="h-screen">
      <h1 className="mb-3">Now Playing</h1>
      <div className="body relative" id="main">
        <main className="main">
          <Row
            wrap={true}
            justify={"center"}
            gutter={[
              { xl: 40, md: 24, sm: 16, xs: 8 },
              { xl: 40, md: 24, sm: 16, xs: 8 },
            ]}
          >
            {movies.map((movie: IMovie) => (
              <Col key={movie.id} span={6} xl={6} md={8} sm={12} xs={24}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          {/* <footer className="p-3 border-t-2 absolute bottom-0 w-4/5">
            {config.elements.length > 0 && config.currentIndex >= 0 ? (
              config.elements[config.currentIndex]?.["component"] ===
              ElementTypes.BUTTON ? (
                <div>
                  <label>Button Text</label>
                  <br />
                  <input
                    placeholder=""
                    value={
                      config.elements[config.currentIndex]?.props?.text
                        ? config.elements[config.currentIndex]?.props?.text
                        : ""
                    }
                    // onChange={(e) =>
                    //   dispatch(changeProps(["text", e.target.value]))
                    // }
                    className="border border-width-1 border-solid border-black"
                  />
                  <br />
                  <label>Alert Message</label>
                  <br />
                  <input
                    value={
                      config.elements[config.currentIndex]?.props?.message
                        ? config.elements[config.currentIndex]?.props?.message
                        : ""
                    }
                    // onChange={(e) =>
                    //   dispatch(changeProps(["message", e.target.value]))
                    // }
                    className="border border-width-1 border-solid border-black"
                  />
                </div>
              ) : (
                <div>
                  <label>Paragraph Text</label>
                  <br />
                  <input
                    className="border border-width-1 border-solid border-black"
                    value={
                      config.elements[config.currentIndex]?.props?.message
                        ? config.elements[config.currentIndex]?.props?.message
                        : ""
                    }
                    // onChange={(e) =>
                    //   dispatch(changeProps(["message", e.target.value]))
                    // }
                  />
                </div>
              )
            ) : (
              ""
            )}
          </footer> */}
        </main>
      </div>
    </div>
  );
};
