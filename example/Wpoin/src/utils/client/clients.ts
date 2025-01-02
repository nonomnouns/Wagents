import { createPublicClient, http } from 'viem'
import {whitechain,whitechainTest} from './chains'
import {mainnet} from 'viem/chains'



export const whiteClient = createPublicClient({ 
  chain: whitechain,
  transport: http()
})

export const whiteClientTest = createPublicClient({ 
  chain: whitechainTest,
  transport: http()
})


export const ethClient = createPublicClient({ 
    chain: mainnet,
    transport: http('https://eth.llamarpc.com')
  })


 