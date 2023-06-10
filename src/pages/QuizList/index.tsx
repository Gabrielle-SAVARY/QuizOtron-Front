import { useEffect, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import Card from '../../components/Card';
import CardFilter from './CardFilter';
import SearchBar from './SearchBar';
import { IQuizList } from '../../@types/quizList';
import { ILevel } from '../../@types/level';
import { ITag } from '../../@types/tag';
import './styles.scss';

interface QuizProps {
  quizList: IQuizList[]
  tagsList: ITag[]
  levelsList: ILevel[]
  /*   userFavoritesQuiz: IQuizList[];
  setUserFavoritesQuiz: (userFavoritesQuiz: IQuizList[]) => void; */
  addQuizToFavorite: (quizId: number) => void;
}

function Quiz({
  quizList, tagsList, levelsList, addQuizToFavorite,
}: QuizProps) {
  //* STATE
  // Toggle l'affichage des filtres (au click du bouton)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  // Stocke les id des catégories et des niveaux sélectionnés
  const [categoriesId, setCategoriesId] = useState<number[]>([]);
  const [levelsId, setLevelsId] = useState<number[]>([]);
  // Stocke les quiz filtrés par catégories et par niveaux
  const [categoriesQuiz, setCategoriesQuiz] = useState<IQuizList[]>([]);
  const [levelsQuiz, setLevelsQuiz] = useState<IQuizList[]>([]);
  // Stocke tous les quiz filtrés sans doublons
  const [quizFilter, setQuizFilter] = useState<IQuizList[]>(quizList);
  // Stocke les filtres sélectionnés
  const [selectedFilters, setSelectedFilters] = useState<{ type: string; id: number }[]>([]);

  //* Toggle l'affichage des filtres
  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const filteredQuiz = isFilterOpen ? 'quiz-filtered quiz-filtered--open' : 'quiz-filtered';

  //* Reset les filtres au click du bouton
  const handleResetFilter = () => {
    setCategoriesId([]);
    setLevelsId([]);
    setSelectedFilters([]);
  };

  //* Vérifie si le filtre est déjà présent dans le tableau: si oui, retourne true
  const isFilterInArray = (
    array: { type: string; id: number }[],
    obj: { type: string; id: number },
  ): boolean => array.some((item) => item.type === obj.type && item.id === obj.id);

  //* Récupère les id des catégories et des niveaux sélectionnés et les stocke dans les states
  const handleSelectedFilter = (id: number, type: string) => {
    // Stocke le filtre sélectionné dans un objet
    const filter = { type, id };

    // Vérifie si le filtre est déjà présent dans le tableau:
    // si oui, le retire du state
    // si non, l'ajoute au state
    if (isFilterInArray(selectedFilters, filter)) {
      setSelectedFilters(selectedFilters.filter((item) => !(item.type === type && item.id === id)));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }

    if (type === 'tag') {
      // quand on reclique sur le filtre de la catégorie, on la retire du state
      if (categoriesId.includes(id)) {
        setCategoriesId(categoriesId.filter((categoryId) => categoryId !== id));
      } else {
        // quand on clique sur le filtre de la catégorie, on l'ajoute au state
        setCategoriesId([...categoriesId, id]);
      }
    } else if (type === 'level') {
      if (levelsId.includes(id)) {
        setLevelsId(levelsId.filter((levelId) => levelId !== id));
      } else {
        setLevelsId([...levelsId, id]);
      }
    }
  };

  useEffect(() => {
    //* Stocke dans le tableau les quiz correspondants aux id des catégories/tags sélectionnées
    const filterCategoryQuiz = (): IQuizList[] => {
      // Si catégoriesId n'est pas vide
      // on filtre les quiz dans quizList dont les tag.id retourne true
      // Si vide: on retourne un tableau vide
      if (categoriesId.length !== 0) {
        return quizList.filter(
          (quiz) => quiz.tags.some((tag) => categoriesId.includes(tag.id)),
        );
      }
      return [];
    };
    //* Stocke dans le tableau les quiz correspondants aux id des niveaux/levels sélectionnées
    const filterLevelQuiz = (): IQuizList[] => {
      if (levelsId.length !== 0) {
        return quizList.filter((quiz) => levelsId.includes(quiz.level.id));
      }
      return [];
    };
    //* Met à jour les states de categoriesQuiz et levelsQuiz avec les données filtrées
    setCategoriesQuiz(filterCategoryQuiz());
    setLevelsQuiz(filterLevelQuiz());
  }, [categoriesId, levelsId, quizList]);

  //* Mise à jour des quiz filtrés
  useEffect(() => {
    const updateFilteredQuiz = () => {
      // Si aucun filtre n'est sélectionné, afficher tous les quiz
      if (categoriesId.length === 0 && levelsId.length === 0) {
        setQuizFilter(quizList);
      } else {
        // On déclare le tableau qui va contenir les quiz filtrés
        let allFilteredQuiz: IQuizList[] = [];

        // On fait le lien entre les filtres des niveaux et des catégories
        if (categoriesId.length === 0 || levelsId.length === 0) {
          // Si un seul type de filtre est sélectionné (tags ou levels)
          // on stocke les quiz correspondants au type sélectionné
          allFilteredQuiz = [...categoriesQuiz, ...levelsQuiz];
        } else if (categoriesId.length !== 0 && levelsId.length !== 0) {
          // Si les deux types de filtres sont sélectionnés
          // on filtre les quiz de levelsQuiz pour récupérer les quiz
          // dont les catégories sont présentes dans categoriesId
          allFilteredQuiz = levelsQuiz.filter(
            (quiz) => quiz.tags.some((tag) => categoriesId.includes(tag.id)),
          );
        }
        // Mise à jour du state avec les quiz filtrés (sans doublon)
        setQuizFilter(allFilteredQuiz);
      }
    };
    updateFilteredQuiz();
  }, [categoriesId.length, levelsId.length, quizList, categoriesQuiz, levelsQuiz, categoriesId]);

  return (
    <div className="quiz-list">
      <div className="quiz-list__container">
        <SearchBar
          quizList={quizList}
          setQuizFilter={setQuizFilter}
        />
        <button type="button" onClick={handleFilter} className="filter__btn">
          Filtrer les quiz
          <TuneIcon />
        </button>
        <div className={filteredQuiz}>
          <button type="button" onClick={handleResetFilter} className="reset__btn">
            Effacer les filtres
          </button>
          <div className="quiz-list__filter">
            <h2 className="quiz-list__text">Catégories</h2>
            {tagsList && (
            <div className="card-filter tags-list">
              {tagsList.map((tag) => (
                <CardFilter
                  key={tag.id}
                  cardType="tag"
                  id={tag.id}
                  label={tag.name}
                  onClick={() => handleSelectedFilter(tag.id, 'tag')}
                  isFilterInArray={isFilterInArray}
                  selectedFilters={selectedFilters}
                />
              ))}
            </div>
            )}
          </div>
          <div className="quiz-list__filter">
            <p className="quiz-list__text">Difficulté</p>
            {levelsList && (
              <div className="card-filter levels-list">
                {levelsList.map((level) => (
                  <CardFilter
                    key={level.id}
                    cardType="level"
                    id={level.id}
                    label={level.name}
                    onClick={() => handleSelectedFilter(level.id, 'level')}
                    isFilterInArray={isFilterInArray}
                    selectedFilters={selectedFilters}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <h1 className="quiz-list__title">Liste des quiz</h1>
      {quizFilter && (
        <div className="quiz-list__items">
          {quizFilter.map((quiz) => (
            <Card
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              thumbnail={quiz.thumbnail}
              author={quiz.author.pseudo}
              level={quiz.level.name}
              tags={quiz.tags}
/*               userFavoritesQuiz={userFavoritesQuiz}
              setUserFavoritesQuiz={setUserFavoritesQuiz} */
              addQuizToFavorite={addQuizToFavorite}
            />
          ))}
        </div>
      )}

    </div>

  );
}

export default Quiz;
