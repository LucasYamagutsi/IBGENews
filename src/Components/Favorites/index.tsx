import React, { useEffect, useState } from "react";
import { NewsType } from "../../utils/types";
import useFetch from "../../Hooks/useFetch";
import Header from "../Header";
import "../News/News.css"

function Favorites() {
  const [filteredNews, setFilteredNews] = useState<Array<NewsType>>([]);
  const {news, isLoading, error} = useFetch(
    'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100'
  );
  const favoriteNewsString = localStorage.getItem('favoriteNews');
  const favoriteNewsIds = favoriteNewsString ? JSON.parse(favoriteNewsString) : [];

  useEffect(() => {
    if (news.items) {
      const filteredIdNews = news.items.filter((item) => favoriteNewsIds.includes(item.id));
  
      if (JSON.stringify(filteredIdNews) !== JSON.stringify(filteredNews)) {
        setFilteredNews(filteredIdNews);
      }
    }
  }, [favoriteNewsIds, news, filteredNews]); 

  const calculateData = (publishedData) => {
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
  const handleButtonClick = (index) => {
    window.open(news.items[index].link, "_blank");
  };

  useEffect(() => {
    const favoriteNewsString = localStorage.getItem('favoriteNews');
    const favoriteNewsIds = favoriteNewsString ? JSON.parse(favoriteNewsString) : [];
    
    if (news.items) {
      const filteredIdNews = news.items.filter((item) => favoriteNewsIds.includes(item.id));
  
      if (JSON.stringify(filteredIdNews) !== JSON.stringify(filteredNews)) {
        setFilteredNews(filteredIdNews);
      }
    }
  }, [news, filteredNews]);
  return (
    <div>
      <Header />
      <h2>Notícias Favoritas</h2>
      <div id="cardsDiv">
            {filteredNews.map((item, index) => (
              <div key={item.id} className="cards">
                <h2>{item.titulo}</h2>
                <p>{item.introducao}</p>
                <p>
                  Publicado a {calculateData(item.data_publicacao)} dias atrás
                </p>
                <button onClick={() => handleButtonClick(index + 1)}>Leia a notícia aqui</button>
              </div>
            ))}
          </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Favorites;