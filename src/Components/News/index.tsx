import React, { useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import Header from "../Header";
import notFav from "../../images/notFav.svg"
import fav from "../../images/fav.svg"
import teste from "../../images/teste.jpg"
import "./News.css";

function News() {
  const [favoriteNews, setFavoriteNews] = React.useState(() => {
    const existingFavoriteNews = localStorage.getItem('favoriteNews');
    return existingFavoriteNews ? JSON.parse(existingFavoriteNews) : [];
  });
  const [filterSelected, setFilterSelected] = React.useState("recent");
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

  const handleTabClick = (tabName: any) => {
    setFilterSelected(tabName);
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
            <img
              // src={news.items[0].imagens.image_intro}
              src={teste}
              alt="Imagem da noticia"
            />
            <div id="infoFirstNews">
              <div id="firstPartNews">
                <h3>Notícia mais recente</h3>
                <button onClick={() => handleFavoriteClick(news.items[0].id)}>
                  {favoriteNews.includes(news.items[0].id) ? (
                      <img src={fav} alt="Favoritado" />
                    ) : (
                      <img src={notFav} alt="Não Favoritado" />
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
                >
                  Leia a notícia aqui
                </button>
              </div>
            </div>
          </section>

          <div id="middleBar">
            <button onClick={() => handleTabClick("recent")}>Mais Recentes</button>
            <button onClick={() => handleTabClick("favorites")}>Favoritas</button>
          </div>  

          <div id="cardsDiv">
            {filterSelected === "recent" ? (
              news.items.slice(1).map((item: any, index: number) => (
                <div key={item.id} className="cards">
                  <div id="content1">
                    <h2>{item.titulo}</h2>
                    <p>{item.introducao}</p>
                  </div>
                  <div id="content2">
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
                    id="favoriteButton"
                  >
                    {favoriteNews.includes(item.id) ? (
                      <img src={fav} alt="Favoritado" />
                    ) : (
                      <img src={notFav} alt="Não Favoritado" />
                    )}
                  </button>
                </div>
              ))
            ) : (
              favoriteNews.map((id: number, index: number) => {
                const item = news.items.find((newsItem: any) => newsItem.id === id);
                if (!item) return null;
                return (
                  <div key={item.id} className="cards">
                  <div id="content1">
                    <h2>{item.titulo}</h2>
                    <p>{item.introducao}</p>
                  </div>
                  <div id="content2">
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
                    id="favoriteButton"
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
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default News;
