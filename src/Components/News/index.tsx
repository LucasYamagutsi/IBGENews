import React from "react";
import useFetch from "../../Hooks/useFetch";

function News() {
  const {news, isLoading, error} = useFetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100')
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // if (!news || !news.items || news.items.length === 0) {
  //   return <p>No news data available.</p>;
  // }

  const handleButtonClick = (index) => {
    window.open(news.items[index].link, "_blank");
  };

  return (
    <div>
      {news.items && news.items.length > 0 && (
        <div>
          <img
            src={news.items[0].imagens.image_intro}
            alt="Imagem da noticia"
          />
          <p>Notícia mais recente</p>
          <h2>{news.items[0].titulo}</h2>
          <p>{news.items[0].introducao}</p>
          <button onClick={() => handleButtonClick(0)}>Leia a notícia aqui</button>
        </div>
      ) }
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default News;