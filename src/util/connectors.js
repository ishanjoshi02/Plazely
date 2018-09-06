import { Connect, SimpleSigner } from 'uport-connect'
import { SigningKey } from '../keys/uportkeys.js'

export let uport = new Connect('Project INK', {
  clientId: '2oeiwzidKWH53oaX4eE1YMwM7jsdnF3TYJo',
  network: 'rinkeby',
  signer: SimpleSigner(SigningKey)
})
export const web3 = uport.getWeb3()
