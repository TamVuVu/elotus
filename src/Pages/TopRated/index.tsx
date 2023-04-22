import { MovieCard, Spinner } from "../../Components";
import { HTTP_METHODS, appendApiKey } from "../../constant";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApiClient } from "../../Api";
import { Row, Col } from "antd";

import "./index.scss";

export const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const { config } = useSelector((state: any) => state);
  useEffect(() => {
    const getMovies = async () => {
      const res = await ApiClient(
        HTTP_METHODS.GET,
        appendApiKey("/movie/top_rated")
      );
      setMovies(res.results);
    };
    getMovies();
  }, []);

  if (config.isLoading) return <Spinner />;
  return (
    <div className="h-screen">
      <h1 className="mb-3">Top Rated</h1>
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
            {movies.map((movie: any) => (
              <Col key={movie.id} span={6} xl={6} md={8} sm={12} xs={24}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </main>
      </div>
    </div>
  );
};
