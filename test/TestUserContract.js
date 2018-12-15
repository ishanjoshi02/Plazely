let UserContract = artifacts.require("./UserStore.sol");
let Instance;
contract("UserContract", accounts => {
  const UserData = [
    {
      email: "ishan@gmail.com",
      user_name: "ishan",
      first_name: "Ishan",
      last_name: "Joshi",
      password: "ishan1234",
      address: accounts[1]
    },
    {
      email: "neeraj@gmail.com",
      user_name: "neeraj",
      first_name: "Neeraj",
      last_name: "Lagwankar",
      password: "neeraj1234",
      address: accounts[2]
    },
    {
      email: "kishlaya@gmail.com",
      user_name: "kishlaya",
      first_name: "Kishlaya",
      last_name: "Kunj",
      password: "kishlaya1234",
      address: accounts[3]
    },
    {
      email: "ada@gmail.com",
      user_name: "ada",
      first_name: "Ada",
      last_name: "Lovelace",
      password: "ada1234",
      address: accounts[4]
    },
    {
      email: "alan@gmail.com",
      user_name: "alan",
      first_name: "Alan",
      last_name: "Turing",
      password: "alan1234",
      address: accounts[5]
    }
  ];

  it("should create UserContract Instance", () => {
    return UserContract.deployed().then(inst => {
      Instance = inst;
    });
  });

  it("Should create the users from userData", () => {
    UserData.forEach(user => {
      Instance.createUser(
        user.email,
        user.user_name,
        user.first_name,
        user.last_name,
        user.address,
        user.password,
        { from: user.address }
      );
    });
  });

  it("should get user count", () => {
    return Instance.getEmailCount
      .call()
      .then(response => console.log(response.toNumber()));
  });

  it("should get user with email " + UserData[0].email, () => {
    return Instance.getUser(UserData[0].email).then(response =>
      console.log(response)
    );
  });

  it("should allow user 1 to subscribe to user 2", () => {
    return Instance.addSubscriber(UserData[0].email, UserData[1].email).then(
      () => {
        Instance.getSubscriberCount(UserData[0].email).then(response =>
          console.log(response.toNumber())
        );
      }
    );
  });

  // The test below is going to output an error

  it("should not create a duplicate account", () => {
    return Instance.createUser(
      UserData[0].email,
      UserData[0].user_name,
      UserData[0].first_name,
      UserData[0].last_name,
      UserData[0].address,
      UserData[0].password,
      { from: UserData[0].address }
    ).then(response => console.log(response));
  });
});
