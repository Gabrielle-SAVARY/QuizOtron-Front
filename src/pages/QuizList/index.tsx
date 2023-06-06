import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import Card from '../../components/Card';
import CardFilter from './CardFilter';
import { IQuizList } from '../../@types/quizList';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import './styles.scss';

interface QuizProps {
  quizList: IQuizList[]
  tagsList: ITag[]
  levelsList: ILevel[]
}

function Quiz({ quizList, tagsList, levelsList }: QuizProps) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filteredQuizList = quizList.filter((quiz) => {
    if (selectedCategory && quiz.tags.some((tag) => tag.tag_id === selectedCategory)) {
      return true;
    }
    if (selectedLevel && quiz.level_id === selectedLevel) {
      return true;
    }
    return false;
  });

  const filteredQuiz = isFilterOpen ? 'quiz-filtered quiz-filtered--open' : 'quiz-filtered';

  return (
    <div className="quiz-list">
      <div className="quiz-list__container">
        <div className="quiz-list__filter">
          <h2 className="quiz-list__text">
            Recherche
          </h2>
          <div className="filter__search">
            <input type="text" placeholder="Rechercher un quiz" className="filter__search-input" />
            <button type="button" className="filter__search-btn">
              Rechercher
            </button>
          </div>
        </div>
        <button type="button" onClick={handleFilter} className="filter__btn">
          Filtrer les quiz
          <TuneIcon />
        </button>
        <div className={filteredQuiz}>
          <div className="quiz-list__filter">
            <h2 className="quiz-list__text">Catégories</h2>
            {tagsList && (
            <div className="card-filter tags-list">
              {tagsList.map((tag) => (
                <CardFilter key={tag.id} cardType="category" id={tag.id} label={tag.name} onClick={() => setSelectedCategory(Number(tag.id))} />
              ))}
            </div>
            )}
          </div>
          <div className="quiz-list__filter">
            <p className="quiz-list__text">Difficulté</p>
            {levelsList && (
              <div className="card-filter levels-list">
                {levelsList.map((level) => (
                  <CardFilter key={level.id} cardType="level" id={level.id} label={level.name} onClick={() => setSelectedLevel(Number(level.id))} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <h1 className="quiz-list__title">Liste des quiz</h1>
      {quizList && (
        <div className="quiz-list__items">
          {quizList.map((quiz) => (
            <Card
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              thumbnail={quiz.thumbnail}
              author={quiz.author.pseudo}
              level={quiz.level.name}
              tags={quiz.tags}
            />
          ))}
        </div>
      )}

    </div>

  );
}

export default Quiz;
