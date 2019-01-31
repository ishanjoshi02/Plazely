const contract = require("truffle-contract");
const Web3 = require("web3");
const UserStoreArtifact = require("../contracts/UserStore.json");
const UserStore = contract(UserStoreArtifact);
const web3 = new Web3(
  new Web3.providers.HttpProvider(`http://localhost:${7545}`)
);
async function getUserStoreInstance() {
  UserStore.setProvider(web3.currentProvider);
  console.log(web3.eth.getAccounts());
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
  const accounts = await web3.eth.getAccounts();
  let request = getUserStoreInstance().then(ins => {
    return ins.createUser
      .call(email, username, firstname, lastname, password, {
        from: accounts[0]
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
      error,
      accounts
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
