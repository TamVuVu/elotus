import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HTTP_METHODS, appendApiKey } from "../../constant";
import { ApiClient } from "../../Api";
import { Image, Row, Col, Divider } from "antd";
import { ConfigContext } from "../../Contexts";
import { IMovie } from "../../types";
import { Spinner } from "../../Components";
import moment from "moment";
import { minutesToHhmm } from "../../utils";

import "./index.scss";

export const MoviesDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState<IMovie>({} as IMovie);
  const { imageConfig } = useContext(ConfigContext);
  const getImageUrl = (size: string, path: string) =>
    imageConfig.base_url + size + path;
  const { config } = useSelector((state: any) => state);

  const genres = movieDetails?.genres?.map((genre) => genre.name)?.join(", ");
  useEffect(() => {
    const getMovies = async () => {
      const res = await ApiClient(
        HTTP_METHODS.GET,
        appendApiKey("/movie/" + movieId)
      );

      setMovieDetails(res);
    };
    getMovies();
  }, [movieId]);

  if (config.isLoading) return <Spinner />;
  return (
    <div className="movie-details">
      <div
        className="banner flex no-wrap"
        style={{
          backgroundImage:
            "url(" +
            getImageUrl(
              imageConfig.backdrop_sizes[imageConfig.backdrop_sizes.length - 2],
              movieDetails.backdrop_path
            ) +
            ")",
        }}
      >
        <div className="banner-content w-full">
          <Row align={"middle"} gutter={24} wrap={false}>
            <Col span={6}>
              <Image
                className="w-full"
                src={
                  imageConfig.base_url +
                  imageConfig.poster_sizes[3] +
                  movieDetails.poster_path
                }
              />
            </Col>
            <Col span={18}>
              <section className="info text-white">
                <div>
                  <h2>
                    {movieDetails.title} (
                    {moment(movieDetails.release_date).format("YYYY")})
                  </h2>
                  <p>
                    {moment(movieDetails.release_date).format("DD MMM YYYY")} (
                    {movieDetails.production_countries?.[0]?.iso_3166_1})
                    <Divider type="vertical" className="bg-white" />
                    {genres}
                    <Divider type="vertical" className="bg-white" />
                    {minutesToHhmm(movieDetails.runtime)}
                  </p>
                  <div>{movieDetails.vote_average}</div>
                  <p className="font-bold">Overview</p>
                  <p>{movieDetails.overview}</p>
                </div>
              </section>
            </Col>
          </Row>
        </div>
      </div>

      <div className="body relative left-1/5" id="main">
        <main className="main"></main>
      </div>
    </div>
  );
};
