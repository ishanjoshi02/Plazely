let UserStore = artifacts.require("UserStore.sol");
contract("UserStore", accounts => {
  it("get emails", () => {
    return UserStore.deployed()
      .then(instance => {
        return instance.getEmailCount();
      })
      .then(res => console.log(res.toNumber()));
  });
});
