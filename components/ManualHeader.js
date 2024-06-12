import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader() {

    const {enableWeb3, account} = useMoralis();

    return(<div>
        {account ? (<div>Connected to {account.slice(0,6)}...{account.slice(account.length -4)} </div>) : (<button onClick={async () => {await enableWeb3()}}>Connect</button>)}
    </div>);

    
} //17:05:08