import {
  ADD_CHARACTER,
  DELETE_CHARACTER,
  ADD_CHARACTER_FAVOURITE,
  DELETE_CHARACTER_FAVOURITE,
  FILTER,
  ORDER,
} from "./actions";

const initialState = {
  allCharacters: [],
  allCharactersFavourite: [],
  myFavorites: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHARACTER:
      return {
        ...state,
        allCharacters: [...state.allCharacters, action.payload],
      };
    case DELETE_CHARACTER:
      const newAllCharacters = state.allCharacters.filter(
        (element) => element.id !== action.payload
      );
      const newAllCharactersFavourite = state.allCharactersFavourite.filter(
        (element) => element.id !== action.payload
      );
      const newFavoritesA = state.myFavorites.filter(
        (element) => element.id !== action.payload
      );
      return {
        ...state,
        allCharacters: [...newAllCharacters],
        allCharactersFavourite: [...newAllCharactersFavourite],
        myFavorites: [...newFavoritesA],
      };
    case ADD_CHARACTER_FAVOURITE:
      return {
        ...state,
        myFavorites: [...state.allCharactersFavourite, action.payload],
        allCharactersFavourite: [
          ...state.allCharactersFavourite,
          action.payload,
        ],
      };
    case DELETE_CHARACTER_FAVOURITE:
      const newFavoritesB = state.myFavorites.filter(
        (element) => element.id !== action.payload
      );
      return {
        ...state,
        myFavorites: [...newFavoritesB],
        allCharactersFavourite: [...newFavoritesB],
      };
    case FILTER:
      const copiaAllCharactersFavouriteFilter = [
        ...state.allCharactersFavourite,
      ];
      return {
        ...state,
        myFavorites: copiaAllCharactersFavouriteFilter.filter(
          (element) => element.gender === action.payload
        ),
      };
    case ORDER:
      const copiaAllCharactersFavouriteOrder = [
        ...state.allCharactersFavourite,
      ];
      if (action.payload === "Ascendente") {
        return {
          ...state,
          myFavorites: copiaAllCharactersFavouriteOrder.sort(
            (elementA, elementB) => elementA.id - elementB.id
          ),
        };
      } else if (action.payload === "Descendente") {
        return {
          ...state,
          myFavorites: copiaAllCharactersFavouriteOrder.sort(
            (elementA, elementB) => elementB.id - elementA.id
          ),
        };
      } else {
        break;
      }
    default:
      return { ...state };
  }
}
