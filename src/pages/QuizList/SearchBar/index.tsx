import { useState } from 'react';
import { IQuizList } from '../../../@types/quizList';
import './styles.scss';

interface SearchBarProps {
  quizList: IQuizList[]
  setQuizFilter: (quiz: IQuizList[]) => void

}

function SearchBar({ quizList, setQuizFilter }: SearchBarProps) {
  //* Stocke la valeur de l'input = requête utilisateur
  const [query, setQuery] = useState<string[]>([]);

  //* Récupère la valeur de l'input et la stock dans le state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value.split(' ');
    // Si l'input est vidé par l'utilisateur (state à ['']), on remet le state à tableau vide
    if (inputText.length === 1 && inputText[0] === '') {
      setQuery([]);
    } else {
      setQuery(inputText);
    }
  };

  //* Filtre les quiz en fonction de la recherche
  //* Permet d'ignorer un mot clé si il est supprimé de la recherche (string vide)
  // Pour chaque quiz, on supprime les espaces pour chaque keyword du tableau query
  // Si le mot clé n'est pas vide : on fait la recherche
  // On vérifie pour chaque critère du quiz si le mot clé est présent
  // Si oui (renvoie true): on retourne le quiz
  // Si le mot clé est vide: on ne fait pas de recherche pour ce mot clé
  const search = (quizArray: IQuizList[], userQuery: string[]) => {
    if (userQuery.length === 0) {
      return quizArray;
    }
    return quizArray.filter(
      (quiz) => userQuery.some(
        (keyword) => keyword.trim() !== '' && (
          quiz.title.toLowerCase().includes(keyword.toLowerCase())
          || quiz.description.toLowerCase().includes(keyword.toLowerCase())
          || quiz.level.name.toLowerCase().includes(keyword.toLowerCase())
          || quiz.tags.some((tag) => tag.name.toLowerCase().includes(keyword.toLowerCase()))
          || quiz.author.pseudo.toLowerCase().includes(keyword.toLowerCase())
        ),
      ),
    );
  };

  //* Soumet la recherche et met à jour le state des quiz filtrés
  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuizFilter(search(quizList, query));
  };

  return (
    <div className="search-filter">
      <div className="search-filter__searchbar">
        <form action="submit" onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder="Rechercher un quiz"
            className="search-filter__searchbar__text"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit" className="search-filter__searchbar__btn">
            Rechercher
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
