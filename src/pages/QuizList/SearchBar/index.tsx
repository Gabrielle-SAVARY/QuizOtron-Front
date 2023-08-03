import React, { useState } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
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

  //* Permet de supprimer les accents d'une chaîne de caractères
  const removeAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  //* Filtre les quiz en fonction de la recherche
  const search = (quizArray: IQuizList[], userQuery: string[]) => {
    if (userQuery.length === 0) {
      return quizArray;
    }
    // Préparation de la requête utilisateur: suppression des accents, espaces et mise en minuscule
    const normalizedQuery = userQuery.map((keyword) => removeAccents(keyword.trim().toLowerCase()));
    // Pour chaque mot clé non vide, on filtre sur les quiz
    // on filtre en supprimant les accents, espaces et en mettant en minuscule
    // Si le mot clé est présent dans un champs du quiz, on retourne le quiz
    return quizArray.filter(
      (quiz) => normalizedQuery.some(
        (keyword) => keyword !== '' && (
          removeAccents(quiz.title.toLowerCase()).includes(keyword)
          || removeAccents(quiz.description.toLowerCase()).includes(keyword)
          || removeAccents(quiz.level.name.toLowerCase()).includes(keyword)
          || quiz.tags.some((tag) => removeAccents(tag.name.toLowerCase()).includes(keyword))
          || removeAccents(quiz.author.pseudo.toLowerCase()).includes(keyword)
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
        <form action="submit" onSubmit={handleSubmitSearch} className="search-filter__searchbar__form">
          <input
            type="text"
            placeholder="Rechercher un quiz"
            className="search-filter__searchbar__form__text-input"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit" className="search-filter__searchbar__form__btn">
            <PiMagnifyingGlassBold size="24px" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
