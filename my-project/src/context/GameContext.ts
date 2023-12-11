import {createContext} from "react";

type GameContextValue = {
    playTurn:Function;
    cardA?:number[];
    cardB?:number[];
}

const GameContext = createContext<GameContextValue>({playTurn:()=>null});

export default GameContext;