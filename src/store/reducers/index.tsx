import headerReducer from './header';
import userReducer from './user';

const reducer = {
  user: userReducer,
  header: headerReducer,
};

export default reducer;
