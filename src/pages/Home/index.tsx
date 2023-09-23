import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { IQuizList } from '../../@types/quizList';
import Card from '../../components/Card';
import CardHome from '../../components/CardHome';
import home1 from '../../assets/img/home_img1.png';
import home2 from '../../assets/img/home_img2.png';
import home3 from '../../assets/img/home_img3.png';
import './styles.scss';

interface HomeProps {
  quizList: IQuizList[]
  userFavoritesQuiz: IQuizList[];
  addQuizToFavorite: (quizId: number) => void;
  deleteQuizToFavorite: (quizId: number) => void;
}

function Home({
  quizList, userFavoritesQuiz, addQuizToFavorite, deleteQuizToFavorite,
}: HomeProps) {
  //* STATE
  // Vérifie si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.user.isLogged);
  // Stocke un quiz aléatoire
  const [randomQuiz, setRandomQuiz] = useState<IQuizList>({
    id: 0,
    title: '',
    description: '',
    thumbnail: '',
    level: {
      id: 0,
      name: '',
    },
    author: {
      id: 0,
      pseudo: '',
    },
    tags: [],
  });

  useEffect(() => {
    //* Fonction pour récupérer un quiz aléatoire avec son id
    const getRandomQuiz = () => {
      // Si la liste de quiz est supérieure à 0
      if (quizList.length > 0) {
        // On récupère un index aléatoire
        const randomIndex = Math.floor(Math.random() * quizList.length);
        // On récupère le quiz correspondant à l'index aléatoire
        const newRandomQuiz = quizList[randomIndex];
        // On met à jour le state
        setRandomQuiz(newRandomQuiz);
      }
    };
    getRandomQuiz();
  }, [quizList]);

  return (
    <div className="home">
      <div className="home__hero">
        <div className="home__hero__description">
          <h1 className="home__hero__description__title">
            Prenez une pause, faite un quiz sur Quiz&apos;O&apos;Tron!
          </h1>
          <p className="home__hero__description__text">
            Bienvenue sur Quiz&apos;O&apos;Tron, l&apos;endroit idéal pour mettre à
            l&apos;épreuve vos connaissances et vous divertir !
          </p>
          <p className="home__hero__description__text">
            Que vous soyez un passionné de trivia,
            un amateur de culture générale ou vous avez simplement
            envi de combler l&apos;ennui, relevez le défi de répondre à nos quiz.
          </p>
        </div>
        <section className="home__hero__random-quiz">
          <div className="home__hero__random-quiz__container">
            {randomQuiz.id === 0
              ? (<p>Un problème est survenu, impossible d&apos;afficher le quiz</p>)
              : (
                <Card
                  id={randomQuiz.id}
                  title={randomQuiz.title}
                  thumbnail={randomQuiz.thumbnail}
                  level={randomQuiz.level.name}
                  author={randomQuiz.author.pseudo}
                  tags={randomQuiz.tags}
                  userFavoritesQuiz={userFavoritesQuiz}
                  addQuizToFavorite={addQuizToFavorite}
                  deleteQuizToFavorite={deleteQuizToFavorite}
                />
              )}
          </div>
        </section>
      </div>
      <section className="home__cards">
        <CardHome
          redirectLink="/liste-quiz"
          thumbnail={home1}
          imgAlt="dés avec des points d'interrogations"
          title="Choisissez un quiz dans notre liste"
          content="Sélectionner un quiz parmis les catégories et niveaux de diifficullté"
        />
        <CardHome
          redirectLink="/liste-quiz"
          thumbnail={home2}
          imgAlt="reprise du mot quiz du logo de Quiz'O'Tron "
          title="Amusez-vous et défiez vos connaissances"
          content="Essayer d'obtenir un score parfait en répondant aux 10 questions du quiz"
        />
        <CardHome
          redirectLink={isLogged ? '/profil' : '/connexion'}
          thumbnail={home3}
          imgAlt="symbole de connexion utilisateur"
          title="Connectez-vous à votre compte"
          content="Accédez à de nouvelles fonctionnalités et statistiques: quiz favoris, score utilisateur et historique"
        />
      </section>
    </div>
  );
}

export default Home;
