import { Token, useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, Contract, utils } from "ethers"
import { useEffect, useState } from "react"

export const useStakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const TokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(TokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    // aprove
    const {send: approveErc20Send, state:approveErc20State} = 
        useContractFunction(erc20Contract, "approve", {
            transactionName: "Aprove ERC20 transfer"
        })
    const approveAndStake = (amount: string) => {
        return approveErc20Send(TokenFarmAddress, amount)
    }
    //const [state, setState] = useState(approveErc20State)

    const { send: stakeSend, state: stakeState} = useContractFunction(
        tokenFarmContract, "stakeTokens", {
            transactionName: "Stake Tokens",
        })
    
    const [amountToStake, setAmountToStake] = useState("0")
    
    // useEffect
    useEffect(() => {
        if(approveErc20State.status === "Success") {
            stakeSend(amountToStake, tokenAddress)
        }

    }, [approveErc20State])

    // stake tokens

    return { approveAndStake, approveErc20State }

}