import { Connect, SimpleSigner } from "uport-connect";
import { SigningKey } from "../keys/uportkeys.js";

export let uport = new Connect("INK", {
  clientId: "2ouosXPNBs1vL8QhpMoASBE3xvG7qNicJPg",
  network: "rinkeby",
  signer: SimpleSigner(SigningKey)
});
export const web3 = uport.getWeb3();
