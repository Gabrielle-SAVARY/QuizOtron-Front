import { useState, useEffect } from 'react';
import { IQuizList } from '../../@types/quizList';
import Card from '../../components/Card';
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
  // STATE Stocke un quiz aléatoire
  const [randomQuiz, setRandomQuiz] = useState<IQuizList>({
    id: 0,
    title: '',
    description: '',
    thumbnail: '',
    level_id: 0,
    user_id: 0,
    level: {
      name: '',
      id: 0,
    },
    author: {
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
    <div className="home__bg">
      <div className="home">
        <h1 className="home__title">
          Prenez une pause, faite un quiz sur Quiz&apos;O&apos;Tron!
        </h1>
        <p className="home__description">
          Bienvenue sur notre site de quiz, l&apos;endroit idéal pour mettre à
          l&apos;épreuve vos connaissances et vous divertir! Que vous soyez un
          passionné de trivia, un amateur de culture générale ou simplement à la
          recherche d&apos;une façon amusante de tester vos compétences, notre
          site de quiz est fait pour vous.
        </p>
        <p className="home__description">
          Plongez dans notre vaste collection de quiz stimulants couvrant une
          multitude de sujets passionnants. Que ce soit l&apos;histoire, la
          science, la géographie, le cinéma, la musique, le sport ou bien
          d&apos;autres domaines, vous trouverez ici des quiz qui éveilleront
          votre curiosité et vous permettront d&apos;en apprendre davantage.
        </p>
        <p className="home__description">
          Nous proposons des quiz adaptés à tous les niveaux, que vous soyez
          débutant ou expert. Vous pouvez choisir parmi des quiz à choix
          multiples, des questions ouvertes, des images à deviner, et bien plus
          encore. Mettez vos méninges à l&apos;épreuve et défiez vos amis pour
          voir qui obtiendra le meilleur score.
        </p>
        <p className="home__description">
          Notre site de quiz est conçu pour offrir une expérience conviviale et
          intuitive. Vous pouvez créer un compte pour suivre votre progression,
          enregistrer vos scores et accéder à des fonctionnalités exclusives.
        </p>
        <p className="home__description">
          Que vous cherchiez à vous divertir, à apprendre de nouvelles choses ou
          à relever des défis intellectuels, notre site de quiz est là pour
          vous. Préparez-vous à tester vos connaissances, à découvrir des faits
          fascinants et à vous amuser en vous plongeant dans l&apos;univers
          captivant des quiz.
        </p>
        <p className="home__description">
          Rejoignez-nous dès maintenant et commencez votre aventure passionnante
          avec les quiz les plus captivants du web!
        </p>
      </div>
      <div className="home__dailyquiz">
        <h2 className="home__subtitle">Quiz du jour!</h2>
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

      </div>

    </div>
  );
}

export default Home;
