import Card from '../../components/Card';
import CardFilter from './CardFilter';
import { IQuizList } from '../../@types/quizList';
import { ITag } from '../../@types/tag';
import './styles.scss';

interface QuizProps {
  quizList: IQuizList[]
  tagsList: ITag[]
}

function Quiz({ quizList, tagsList }: QuizProps) {
  return (
    <div className="quiz-list">
      <div className="quiz-list__container">
        <div className="quiz-list__filter">
          <p className="quiz-list__text">
            Recherche

          </p>
          <div className="filter__search">
            <input type="text" placeholder="Rechercher un quiz" className="filter__search-input" />
            <button type="button" className="filter__search-btn">
              Rechercher
            </button>
          </div>
        </div>
        <div className="quiz-list__filter">
          <p className="quiz-list__text">Catégories</p>
          {tagsList && (
          <div className="tags-list">
            {tagsList.map((tag) => (
              <CardFilter key={tag.id} id={tag.id} label={tag.name} />
            ))}
          </div>
          )}
        </div>
        <div className="quiz-list__filter">
          <p className="quiz-list__text">Difficulté</p>
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
