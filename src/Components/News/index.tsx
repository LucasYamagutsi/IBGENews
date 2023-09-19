import React, { useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import Header from "../Header";

function News() {
  const [favoriteNews, setFavoriteNews] = React.useState(() => {
    const existingFavoriteNews = localStorage.getItem('favoriteNews');
    return existingFavoriteNews ? JSON.parse(existingFavoriteNews) : [];
  });
  const {news, isLoading, error} = useFetch(
    'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100'
  );

  const handleButtonClick = (index) => {
    window.open(news.items[index].link, "_blank");
  };

  // const handleFavoriteClick = (id) => {
  //   setFavoriteNews((prevFavoriteNews: any) => {
  //     if (prevFavoriteNews.includes(id)) {
  //       const updatedFavoriteNews = prevFavoriteNews.filter((item) => item !== id);
  //       localStorage.setItem("favoriteNews", JSON.stringify(updatedFavoriteNews));
  //       return updatedFavoriteNews;
  //     } else {
  //       const updatedFavoriteNews = [...prevFavoriteNews, id];
  //       localStorage.setItem("favoriteNews", JSON.stringify(updatedFavoriteNews));
  //       return updatedFavoriteNews;
  //     }
  //   });
  // };
  const handleFavoriteClick = (id) => {
    setFavoriteNews((prevFavoriteNews: any) => {
      if (prevFavoriteNews.includes(id)) {
        return prevFavoriteNews.filter((item) => item !== id);
      } else {
        return [...prevFavoriteNews, id];
      }
    });
  };
  // useEffect(() => {
  //   const existingFavoriteNews = localStorage.getItem("favoriteNews");
  //   if (existingFavoriteNews) {
  //     const parsedExistingFavoriteNews = JSON.parse(existingFavoriteNews);
  //     const updatedFavoriteNews = [...parsedExistingFavoriteNews, ...favoriteNews];
  //     localStorage.setItem("favoriteNews", JSON.stringify(updatedFavoriteNews));
  //   } else {
  //     localStorage.setItem("favoriteNews", JSON.stringify(favoriteNews));
  //   }
  // }, [favoriteNews]);
  useEffect(() => {
    localStorage.setItem("favoriteNews", JSON.stringify(favoriteNews));
  }, [favoriteNews]);

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

  return (
    <div>
      <Header />
      {news.items && news.items.length > 0 && (
        <div>
          <img
            src={news.items[0].imagens.image_intro}
            alt="Imagem da noticia"
          />
          <h3>Notícia mais recente</h3>
          <h2>{news.items[0].titulo}</h2>
          <p>{news.items[0].introducao}</p>
          <p>
            Publicado a {calculateData(news.items[0].data_publicacao)} dias atrás
          </p>
          <button onClick={() => handleButtonClick(0)}>Leia a notícia aqui</button>
          <button onClick={() => handleFavoriteClick(news.items[0].id)}>Favoritar</button>

          <h3>Notícias recentes:</h3>
          <div>
            {news.items.slice(1).map((item, index) => (
              <div key={item.id}>
                <h2>{item.titulo}</h2>
                <p>{item.introducao}</p>
                <p>
                  Publicado a {calculateData(item.data_publicacao)} dias atrás
                </p>
                <button onClick={() => handleButtonClick(index + 1)}>Leia a notícia aqui</button>
                <button onClick={() => handleFavoriteClick(item.id)}>Favoritar</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default News;
