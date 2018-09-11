import { uport } from "../../../util/connectors.js";
import { browserHistory } from "react-router";
import Cookies from "js-cookie";

export const USER_LOGGED_IN = "USER_LOGGED_IN";
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport
      .requestCredentials({
        requested: ["name", "avatar", "phone", "country"]
      })
      .then(credentials => {
        dispatch(userLoggedIn(credentials));
        console.log(credentials);

        // Used a manual redirect here as opposed to a wrapper.
        // This way, once logged in a user can still access the home page.

        // localStorage.setItem(
        //   "uPortUserCredentials",
        //   JSON.stringify(credentials)
        // );

        // Cookies.set("uPortUserCredentials", credentials);
        localStorage.setItem(
          "uPortUserCredentials",
          JSON.stringify(credentials)
        );
        console.log(Cookies.getJSON("uPortUserCredentials"));
        // console.log(JSON.parse(localStorage.getItem("uPortUserCredentials")));

        var currentLocation = browserHistory.getCurrentLocation();

        if ("redirect" in currentLocation.query) {
          return browserHistory.push(
            decodeURIComponent(currentLocation.query.redirect)
          );
        }

        return browserHistory.push("/dashboard");
      });
  };
}
