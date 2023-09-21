import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import Header from "../Header";
import fav from "../../images/fav.svg";
import notFav from "../../images/notFav.svg";
import notFav2 from "../../images/notFav2.svg";
import boxes from "../../images/boxes.svg";
import "./News.css";

function News() {
  const [favoriteNews, setFavoriteNews] = useState(() => {
    const existingFavoriteNews = localStorage.getItem('favoriteNews');
    return existingFavoriteNews ? JSON.parse(existingFavoriteNews) : [];
  });
  const [filterSelected, setFilterSelected] = useState("recent");
  const [visibleNews, setVisibleNews] = useState(10);
  const [visibleFavoriteNews, setVisibleFavoriteNews] = useState(9);
  const {news, isLoading, error} = useFetch(
    'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100'
  );

  const handleButtonClick = (index: number) => {
    window.open(news.items[index].link, "_blank");
  };

  const handleFavoriteClick = (id: number) => {
    setFavoriteNews((prevFavoriteNews: any) => {
      if (prevFavoriteNews.includes(id)) {
        return prevFavoriteNews.filter((item: number) => item !== id);
      } else {
        return [...prevFavoriteNews, id];
      }
    });
  };

  const handleFilterClick = (tabName: any) => {
    setFilterSelected(tabName);
  };

  const handleShowMoreClick = () => {
    if (filterSelected === "recent") {
      setVisibleNews((prevCount) => prevCount + 9);
    } else if (filterSelected === "favorite") {
      setVisibleFavoriteNews((prevCount) => prevCount + 9);
    }
  };

  useEffect(() => {
    localStorage.setItem("favoriteNews", JSON.stringify(favoriteNews));
  }, [favoriteNews]);

  const calculateData = (publishedData: string) => {
    const currDate = new Date();
    const dateSliced = publishedData.split(" ");
    const [slicedDate, slicedHour] = dateSliced;
    const [day, month, year] = slicedDate.split("/");
    const [hour, minute, second] = slicedHour.split(":");
    const publishedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
    const differenceInMilliseconds = currDate.getTime() - publishedDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };


  return (
    <div>
      <Header />
      {news.items && news.items.length > 0 && (
        <div>
          <section id="mostRecentNews">
            {news.items[0].imagens && (
              <img
                src={news.items[0].imagens.image_intro}
                alt="Imagem da notícia"
              />
            )}
            <div id="infoFirstNews">
              <div id="firstPartNews">
                <h3>Notícia mais recente</h3>
                <button
                  onClick={() => handleFavoriteClick(news.items[0].id)}
                  data-testid="favoriteButton"
                >
                  {favoriteNews.includes(news.items[0].id) ? (
                      <img src={fav} alt="Favoritado" />
                    ) : (
                      <img src={notFav2} alt="Não Favoritado" />
                  )}
                </button>
              </div>
              <div id="secondPartNews">
                <h2>{news.items[0].titulo}</h2>
                <p>{news.items[0].introducao}</p>
              </div>
              <div id="thirdPartNews">
                <p>
                  {calculateData(news.items[0].data_publicacao)} dias atrás
                </p>
                <button
                  onClick={() => handleButtonClick(0)}
                  className="redirectButton"
                  data-testid="redirectButton"
                >
                  Leia a notícia aqui
                </button>
              </div>
            </div>
          </section>

          <div id="middleBar">
            <section>
              <button
                  className={filterSelected === "recent" ? "selected" : "notSelected"}
                  onClick={() => handleFilterClick("recent")}
                >
                  Mais Recentes
                </button>
                <button
                  className={filterSelected === "favorite" ? "selected" : "notSelected"}
                  id="favoriteFilter"
                  onClick={() => handleFilterClick("favorite")}
                >
                  Favoritas
                </button>
            </section>
            <img src={ boxes } alt="boxes" />
          </div>  

          <div id="cardsDiv">
            {filterSelected === "recent" ? (
              news.items.slice(1, visibleNews).map((item: any, index: number) => (
                <div key={item.id} className="cards">
                  <div className="content1">
                    <h2>{item.titulo}</h2>
                    <p>{item.introducao}</p>
                  </div>
                  <div className="content2">
                    <p>
                      {calculateData(item.data_publicacao)} dias atrás
                    </p>
                    <button
                      onClick={() => handleButtonClick(index + 1)}
                      className="redirectButton"
                    >
                      Leia a notícia aqui
                    </button>
                  </div>
                  <button
                    onClick={() => handleFavoriteClick(item.id)}
                    className="favoriteButton"
                  >
                    {favoriteNews.includes(item.id) ? (
                      <img src={fav} alt="Favoritado" />
                    ) : (
                      <img src={notFav} alt="Não Favoritado" />
                    )}
                  </button>
                </div>
              ))
            ) : favoriteNews.length === 0 ? (
              <h1 id="noneFavoriteNews">Você ainda não tem notícias favoritas.</h1>
            ) : (
              favoriteNews.slice(0, visibleFavoriteNews).map((id: number, index: number) => {
                const item = news.items.find((newsItem: any) => newsItem.id === id);
                if (!item) return null;
                return (
                  <div key={item.id} className="cards">
                  <div className="content1">
                    <h2>{item.titulo}</h2>
                    <p>{item.introducao}</p>
                  </div>
                  <div className="content2">
                    <p>
                      {calculateData(item.data_publicacao)} dias atrás
                    </p>
                    <button
                      onClick={() => handleButtonClick(index + 1)}
                      className="redirectButton"
                    >
                      Leia a notícia aqui
                    </button>
                  </div>
                  <button
                    onClick={() => handleFavoriteClick(item.id)}
                    className="favoriteButton"
                  >
                    {favoriteNews.includes(item.id) ? (
                      <img src={fav} alt="Favoritado" />
                    ) : (
                      <img src={notFav} alt="Não Favoritado" />
                    )}
                  </button>
                </div>
                );
              })
            )}
          </div>
          {(filterSelected === "recent" && visibleNews < news.items.length) ||
          (filterSelected === "favorite" && visibleFavoriteNews < favoriteNews.length) ? (
            <div id="showMoreDiv">
              <button
                onClick={handleShowMoreClick}
                id="showMoreButton"
              >
                Mais Notícias
              </button>
            </div>
          ) : null}
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default News;
