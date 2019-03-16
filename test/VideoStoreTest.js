const VideoStore = artifacts.require("./VideoStore.sol");

contract("VideoStore", async accounts => {
  it("should upload video with metadata", async () => {
    const instance = await VideoStore.deployed();
    const id = await instance.addVideo(
      "Shaun of the Dead",
      "Shaun is a salesman whose life has no direction. However, his uneventful life takes a sudden turn when he has to singlehandedly deal with an entire community of zombies.",
      "Hash",
      "Tags",
      "Film",
      "ishanjoshi02@gmail.com",
      {
        from: accounts[0]
      }
    );
    console.log(
      (await instance.getVideoListCount.call({ from: accounts[0] })).toNumber()
    );
    await instance.addVideo(
      "Hot Fuzz",
      "Police officer Nicholas Angel is known to be the best across London. His seniors, who are jealous of his achievements, transfer him to a remote village where he encounters various challenges.",
      "Hash",
      "Tags",
      "Film",
      "ishanjoshi02@gmail.com",
      {
        from: accounts[0]
      }
    );
    console.log(
      (await instance.getVideoListCount.call({ from: accounts[0] })).toNumber()
    );
  });
  it("should return video from id", async () => {
    const instance = await VideoStore.deployed();
    const result = await instance.getVideo.call(1);
    console.log("All details");
    console.log(result);
    console.log("Video Title");
    console.log(result["title"]);
  });
});
