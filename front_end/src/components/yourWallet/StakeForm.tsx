import { Token } from "../Main"
import { useEthers, useTokenBalance } from "@usedapp/core"
import {formatUnits} from "@ethersproject/units"

export interface StakeFormProps {
    token: Token
}

export const StateForm = ({ token }: StakeFormProps) => {
    const { address: fauTokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(fauTokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)): 0
}