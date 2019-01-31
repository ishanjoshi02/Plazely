import getWeb3 from "../utils/getWeb3";

const contract = require("truffle-contract");
const Web3 = require("web3");
const UserStoreArtifact = require("../contracts/UserStore.json");
const UserStore = contract(UserStoreArtifact);

function getUserStoreInstance() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(`http://localhost:${7545}`)
  );
  UserStore.setProvider(web3.currentProvider);
  return UserStore.deployed();
}

export function auth() {
  return {
    type: "USER_AUTH",
    payload: {
      email: "ishanjoshi@gmail.com",
      name: "Ishan",
      lastname: "Joshi"
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
  let request = getUserStoreInstance().then(ins => {
    return ins.createUser
      .call(email, username, firstname, lastname, password, {
        from: "0x6e7C58E819a1D5547f2385c7A5341fb87295cFcD"
      })
      .then(res => {
        return res;
      });
  });
  const error = await request;
  return {
    type: "SIGNUP_USER",
    payload: {
      email: "ishanjoshi@gmail.com",
      name: "Ishan",
      lastname: "Joshi",
      error
    }
  };
}
export function login() {
  getUserStoreInstance().then(ins => {});

  return {
    type: "LOGIN_USER",
    payload: { email: "ishanjoshi@gmail.com", name: "Ishan", lastname: "Joshi" }
  };
}
