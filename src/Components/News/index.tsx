import React, { useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import Header from "../Header";
// import { useSelector, useDispatch } from "react-redux";
// import { addToFavorites, removeFromFavorites } from "../../redux/actions/favoriteActions";

type FavoriteState = number[]; 

function News() {
  const [favoriteNews, setFavoriteNews] = React.useState([]);
  // const favoriteNews = useSelector((state: FavoriteState) => state);
  // const dispatch = useDispatch();
  const {news, isLoading, error} = useFetch(
    'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100'
  );

  const handleButtonClick = (index) => {
    window.open(news.items[index].link, "_blank");
  };

  const handleFavoriteClick = (id) => {
    setFavoriteNews((prevFavoriteNews: any) => {
      if (prevFavoriteNews.includes(id)) {
        return prevFavoriteNews.filter((item) => item !== id);
      } else {
        return [...prevFavoriteNews, id];
      }
    });
  };
  // const handleFavoriteClick = (id) => {
  //   if (favoriteNews.includes(id)) {
  //     dispatch(removeFromFavorites(id));
  //   } else {
  //     dispatch(addToFavorites(id));
  //   }
  // };

  useEffect(() => {
    localStorage.setItem("favoriteNews", JSON.stringify(favoriteNews));
  }, [favoriteNews]);

  const calculateData = (publishedData) => {
    const dataAtual = new Date();
    const dateSliced = publishedData.split(" ");
    const [slicedDate, slicedHour] = dateSliced;
    const [day, month, year] = slicedDate.split("/");
    const [hour, minute, second] = slicedHour.split(":");
    const publishedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
    const differenceInMilliseconds = dataAtual.getTime() - publishedDate.getTime();
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