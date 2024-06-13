import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader() {

    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } = useMoralis();

    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
            // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    return(
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0,6)}...{account.slice(account.length -4)} 
                </div>
            ) : (
                <button 
                    onClick={async () => {
                        await enableWeb3();
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected");
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    );


} //17:05:08