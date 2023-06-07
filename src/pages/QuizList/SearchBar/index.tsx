import { useState } from 'react';
import { IQuizList } from '../../../@types/quizList';
import './styles.scss';

interface SearchBarProps {
  quizList: IQuizList[]
  setQuizFilter: (quiz:IQuizList[]) => void

}

function SearchBar({ quizList, setQuizFilter }: SearchBarProps) {
  const [query, setQuery] = useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value.split(' ');
    setQuery(inputText);
  };

  const search = (data:IQuizList[]) => data.filter(
    (item) => query.some(
      (keyword) => item.title.toLowerCase().includes(keyword.toLowerCase())
    || item.description.toLowerCase().includes(keyword.toLowerCase())
    || item.level.name.toLowerCase().includes(keyword.toLowerCase())
    || item.tags.some((tag) => tag.name.toLowerCase().includes(keyword.toLowerCase()))
    || item.author.pseudo.toLowerCase().includes(keyword.toLowerCase()),
    ),
  );

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuizFilter(search(quizList));
  };

  return (
    <div className="quiz-list__filter">
      <h2 className="quiz-list__text">
        Recherche
      </h2>
      <div className="filter__search">
        <form action="submit" onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder="Rechercher un quiz"
            className="filter__search-input"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit" className="filter__search-btn">
            Rechercher
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
