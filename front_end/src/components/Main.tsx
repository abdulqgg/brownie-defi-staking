import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"

export const Main = () => {
    
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"

    return (<div>Hi!</div>)
}