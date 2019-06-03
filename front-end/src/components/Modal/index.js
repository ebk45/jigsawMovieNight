import React from "react";
import { IMG_PATH, COLLAPSIBLE_HEADER } from "../../config.js";
import closeButton from "../../images/closeButton.png";
import useMovie from "../../hooks/movie";
import CastSection from "../CastSection";
import useCollapsible from "../../hooks/collapsible";
import Collapsible from "../Collapsible";
import WatchedSection from "../WatchedSection";
import Review from "../Review";

const localStyles = {
  daddyDiv: {
    position: "absolute",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(0, 0, 0, 0.6)",
    overflowY: "scroll"
  },

  movieContainer: {
    width: "100%",
    height: "100%",
    maxWidth: 500,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    overflowY: "scroll",
    backgroundColor: "white",
    paddingBottom: 40
  },

  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    alignItems: "flex-start",
    padding: 15
  },

  closeButton: {
    height: 20,
    position: "absolute",
    right: 15,
    top: 15
  },

  movieImage: {
    height: 220,
    top: 15,
    left: 15,
    borderRadius: 5
  },

  movieDetails: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 16,
    height: 220
  },

  detailsList: {
    listStyle: "none",
    padding: 0,
    fontSize: 12,
    lineHeight: 1.5,
    margin: 0
  },

  movieTitle: {
    color: "black",
    fontSize: 22,
    marginTop: 0,
    letterSpacing: "2px"
  },

  movieOverview: {
    position: "relative",
    padding: 15,
    paddingTop: 0,
    fontSize: 15
  },

  lowerContainer: {
    position: "relative"
  },

  strong: {
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "1px"
  }
};

const Modal = props => {
  const { movie, loading, onUpdate } = useMovie(
    props.match.params.id,
    props.getFavourite
  );

  const { isOpen, setIsOpen } = useCollapsible();

  return movie ? (
    <div style={localStyles.daddyDiv}>
      <div style={localStyles.movieContainer}>
        <div style={localStyles.detailsContainer}>
          <img
            style={localStyles.closeButton}
            src={closeButton}
            onClick={props.history.goBack}
            alt={""}
          />
          <img
            style={localStyles.movieImage}
            src={`${IMG_PATH}${movie.poster_path}`}
            alt={movie.title}
          />
          <div style={localStyles.movieDetails}>
            <h2 style={localStyles.movieTitle}>{movie.title.toUpperCase()}</h2>
            <ul style={localStyles.detailsList}>
              <li>
                <strong style={localStyles.strong}>Release Date:</strong>{" "}
                {movie.release_date}
              </li>
              <li>
                <strong style={localStyles.strong}>Runtime:</strong>{" "}
                {movie.runtime} minutes
              </li>
              <li>
                <strong style={localStyles.strong}>Genre:</strong>{" "}
                {movie.genres[0].name}, {movie.genres[1].name}
              </li>
            </ul>
            {!!props.getFavourite(props.match.params.id) && (
              <WatchedSection
                movie={movie}
                setWatched={() => {
                  onUpdate();
                  props.setWatched(movie);
                }}
                createReview={props.createReview}
                review={props.review}
                deleteReview={props.deleteReview}
              />
            )}
          </div>
        </div>
        <div style={localStyles.lowerContainer}>
          <p style={localStyles.movieOverview}>{movie.overview}</p>
          <Collapsible
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text={COLLAPSIBLE_HEADER}
          >
            <CastSection castList={movie.cast} loading={loading} />
          </Collapsible>
          {movie.watched === true ? (
            <Review
              onReview={event => props.createReview(movie, event)}
              review={props.review}
              onDelete={() => props.deleteReview(movie)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
