type FavoriteState = {
  favoriteNews: string[];
};
const initialState: FavoriteState = {
  favoriteNews: []
}

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      if (!state.favoriteNews.includes(action.payload)) {
        const updatedState = {
          ...state,
          favoriteNews: [...state.favoriteNews, action.payload],
        };
        localStorage.setItem('favoriteNews', JSON.stringify(updatedState.favoriteNews));
        return updatedState;
      }
      return state;
    case 'REMOVE_FROM_FAVORITES':
      const updatedState = {
        ...state,
        favoriteNews: state.favoriteNews.filter((id) => id !== action.payload),
      };
      localStorage.setItem('favoriteNews', JSON.stringify(updatedState.favoriteNews));
      return updatedState;
    default:
      return state;
  }
};

export default favoriteReducer;
