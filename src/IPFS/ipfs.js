const IPFS = require("ipfs");
const node = new IPFS("localhost", "5001", { protocol: "http" });
export default node;
