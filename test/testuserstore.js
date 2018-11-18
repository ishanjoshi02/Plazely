let UserStore = artifacts.require("UserStore");
let inst;
contract("UserStore", accounts => {
  UserStore.deployed().then(instance => (inst = instance));
  it("should contain one user in user store", () => {
    return inst.getEmailCount().then(res => console.log(res.toNumber()));
  });
  it("Should retrieve ishan's details", () => {
    return inst.getUser("ishanjoshi02@gmail.com").then(res => console.log(res));
  });
  it("Should retrieve mrunal's details", () => {
    return inst.getUser("goaroound@gmail.com").then(res => console.log(res));
  });
});
