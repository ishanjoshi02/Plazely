import JWT_SECRET from "../secrets/jwt_secret";

var jwt = require("jsonwebtoken");

export default (state = {}, action) => {
  switch (action.type) {
    case "USER_AUTH": {
      return { ...state, login: action.payload };
    }
    case "SIGNUP_USER": {
      if (action.payload.error === "No error") {
        document.cookie = `token=${jwt.sign(action.payload, JWT_SECRET)}`;
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
      return { ...state, login: action.payload };
    }
    default: {
      return state;
    }
  }
};
