import JWT_SECRET from "../secrets/jwt_secret";

const jwt = require("jsonwebtoken");

export default (state = {}, action) => {
  switch (action.type) {
    case "USER_AUTH": {
      return {
        ...state,
        login: {
          isAuth: !(action.payload.index === -1)
        }
      };
    }
    case "SIGNUP_USER": {
      if (action.payload.isAuth) {
        document.cookie = `token=${jwt.sign(action.payload.email, JWT_SECRET)}`;
        return {
          ...state,
          login: {
            ...action.payload,
            isAuth: true
          }
        };
      }
      return { ...state, login: action.payload };
    }
    case "LOGIN_USER": {
      if (action.payload.isAuth) {
        document.cookie = `token=${jwt.sign(action.payload.email, JWT_SECRET)}`;
        return {
          ...state,
          login: {
            ...action.payload,
            isAuth: true
          }
        };
      }
      return { ...state, login: action.payload };
    }
    case "SIGNOUT_USER": {
      // Delete  `token` cookie from storage
      return {
        ...state,
        login: {}
      };
    }
    default: {
      return state;
    }
  }
};
