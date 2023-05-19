import headerReducer from './header';
import quizCreateReducer from './quizCreate';
import userReducer from './user';

const reducer = {
  user: userReducer,
  header: headerReducer,
  quizCreate: quizCreateReducer,
};

export default reducer;
