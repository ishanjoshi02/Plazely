import TruffleContract from "truffle-contract";
import JWT_SECRET from "../secrets/jwt_secret";
const Web3 = require("web3");
const UserStoreArtifact = require("../contracts/UserStore.json");
const UserStore = TruffleContract(UserStoreArtifact);
const jwt = require("jsonwebtoken");
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
async function getUserStoreInstance() {
  UserStore.setProvider(web3.currentProvider);
  return await UserStore.deployed().then(ins => {
    return ins;
  });
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
// Helper functions end
export async function auth() {
  const index = document.cookie.indexOf("token");
  if (index !== -1) {
    const email = jwt.decode(readCookie(`token`), JWT_SECRET);
    // get user details
    const ins = await getUserStoreInstance();
    const retVal = await ins.getUser.call(email);
    console.log(retVal);
    return {
      type: "USER_AUTH",
      payload: {
        index,
        email: retVal.email,
        address: retVal.addr,
        name: retVal.name,
        username: retVal.username
      }
    };
  }
  return {
    type: "USER_AUTH",
    payload: {
      index
    }
  };
}
export async function signup({
  email,
  password,
  username,
  firstname,
  lastname
}) {
  const accounts = await web3.eth.getAccounts();
  const ins = await getUserStoreInstance();
  const payload = await ins
    .createUser(email, username, firstname, lastname, password, {
      from: accounts[0]
    })
    .then(async res => {
      const retVal = await ins.getUser.call(email);
      return {
        email: retVal.email,
        address: retVal.addr,
        name: retVal.name,
        username: retVal.username,
        isAuth: true
      };
    })
    .catch(e => {
      return {
        email,
        account: accounts[0],
        isAuth: false,
        error: e
      };
    });
  return {
    type: "SIGNUP_USER",
    payload
  };
}
export async function login({ email, password }) {
  const accounts = await web3.eth.getAccounts();
  const ins = await getUserStoreInstance();
  const payload = ins
    .authenticateUser(email, password, {
      from: accounts[0]
    })
    .then(async res => {
      const retVal = await ins.getUser.call(email);
      return {
        email: retVal.email,
        address: retVal.addr,
        name: retVal.name,
        username: retVal.username,
        isAuth: true
      };
    })
    .catch(e => {
      return {
        email,
        account: accounts[0],
        isAuth: false,
        error: e
      };
    });
  return {
    type: "LOGIN_USER",
    payload
  };
}
export function addVideo({}) {}
