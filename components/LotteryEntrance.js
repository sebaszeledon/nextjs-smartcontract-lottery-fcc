import { useWeb3Contract, useMoralis } from "react-moralis";
import { contractAddresses, abi } from "../constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {

    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId = parseInt(chainIdHex);
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
    const [entranceFee, setEntranceFee] = useState("0");
    const [numPlayer, setNumPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");

    const dispatch = useNotification();

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee
    });

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    });

    useEffect(() => {
        if (isWeb3Enabled){
            //Try to read the raffle entrance fee
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString();
                const numPlayersFromCall = (await getNumberOfPlayers()).toString();
                const recentWinnerFromCall = await getRecentWinner();
                setEntranceFee(entranceFeeFromCall);
                setNumPlayers(numPlayersFromCall);
                setRecentWinner(recentWinnerFromCall);
            }
            updateUI();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification(tx);
    }

    const handleNewNotification = function() {
        dispatch({
            type: "info",
            message: "Transaction Completed!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    }

    return (
        <div className="p-5"> 
            <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
            { raffleAddress ? (
                <div>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick = {async function(){
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError : (error) => console.log(error)
                            });
                        }}
                    >
                        Enter Raffle!
                    </button>
                    <br></br><br></br>
                    <hr></hr><br></br>
                    Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                </div> 
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>//17:57:50
    )
}