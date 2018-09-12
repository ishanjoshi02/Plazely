import { Connect, SimpleSigner } from "uport-connect";
import { SigningKey } from "../keys/uportkeys.js";

export let uport = new Connect("INK", {
  clientId: "your key",
  network: "rinkeby",
  signer: SimpleSigner(SigningKey)
});
export const web3 = uport.getWeb3();

//after adding your cliendId rename this file to connectors.js
