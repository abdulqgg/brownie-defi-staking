import { useEthers, useTokenBalance } from "@usedapp/core"
import { parse } from "path"
import { Token } from "../Main"
import {formatUnits} from "@ethersproject/units" 
import { BalanceMsg } from "../Balancemsg"

export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`Your un-staked ${name} balance`}
        tokenImgSrc={image}
        amount={formattedTokenBalance} />)
}