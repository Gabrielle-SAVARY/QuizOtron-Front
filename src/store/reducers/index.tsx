import headerReducer from './header';
import quizReducer from './quiz';
import userReducer from './user';

const reducer = {
  user: userReducer,
  header: headerReducer,
  quiz: quizReducer,
};

export default reducer;
