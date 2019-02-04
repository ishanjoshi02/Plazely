const contract = require("truffle-contract");
const Web3 = require("web3");
const UserStoreArtifact = require("../contracts/UserStore.json");
const UserStore = contract(UserStoreArtifact);
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
async function getUserStoreInstance() {
  UserStore.setProvider(web3.currentProvider);
  return await UserStore.deployed().then(ins => {
    return ins;
  });
}
export function auth() {
  const index = document.cookie.indexOf("token");
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
    .then(res => {
      return {
        email,
        account: accounts[0],
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
    .then(res => {
      return {
        email,
        account: accounts[0],
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
  // Get error from return
  return {
    type: "LOGIN_USER",
    payload
  };
}
