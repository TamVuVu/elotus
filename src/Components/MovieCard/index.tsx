import { useDispatch } from "react-redux";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ConfigContext } from "../../Contexts";
import { IMovie } from "../../types";
import moment from "moment";

type MovieCardPropsType = {
  movie: IMovie;
  className?: string;
};
const { Meta } = Card;

export const MovieCard = ({ movie, className }: MovieCardPropsType) => {
  const navigate = useNavigate();
  const { imageConfig } = useContext(ConfigContext);

  return (
    <Card
      className={"" + className}
      onClick={() => navigate("../movies/" + movie.id)}
      hoverable
      cover={
        <img
          alt="example"
          src={
            imageConfig.base_url +
            imageConfig.backdrop_sizes[2] +
            movie.backdrop_path
          }
        />
      }
      loading={false}
      title
    >
      <Meta
        avatar={
          <label>
            Rating: <br />
            {movie.vote_average}
          </label>
        }
        title={movie.title}
        description={
          "Relealse Date: " + moment(movie.release_date).format("DD MMM YYYY")
        }
      />
    </Card>
  );
};
