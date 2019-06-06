import React from "react";
import ListOfMovies from "../ListOfMovies";
import NoFavouritesWarning from "../NoFavouritesWarning";

const localStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
};

const Feed = ({
  popularList,
  favouriteMovie,
  isFavourite,
  favouriteList,
  navOffset,
  rating,
  setRating,
  setWatched,
  match,
  history
}) => {
  return (
    <div
      style={{
        paddingTop: navOffset + 10,
        width: "100%",
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <div>
        {match.url === "/favourites" && !favouriteList.length && (
          <NoFavouritesWarning />
        )}
      </div>
      <div style={localStyles.container}>
        {match.url === "/popular" && popularList && !!popularList.length && (
          <ListOfMovies
            popularList={popularList}
            favouriteMovie={favouriteMovie}
            isFavourite={isFavourite}
            variant={match.params[0]}
            rating={rating}
          />
        )}
      </div>
      <div>
        {match.url === "/favourites" && !!favouriteList.length && (
          <ListOfMovies
            popularList={favouriteList}
            favouriteMovie={favouriteMovie}
            isFavourite={isFavourite}
            variant={match.params[0]}
            rating={rating}
            setRating={setRating}
            setWatched={setWatched}
            history={history}
          />
        )}
      </div>
    </div>
  );
};

export default Feed;
