import {memo, useContext} from "react";
import GameContext from "../context/GameContext.ts";

const Card = memo(({text, x,y}:{text:string;x:number;y:number;})=>{

    const {playTurn, cardA, cardB} = useContext(GameContext);
    const isCardReveled = (cardA?.length===2&&cardA[0]===x&&cardA[1]===y) || (cardB?.length===2&&cardB[0]===x&&cardB[1]===y);
    const handleClick = ()=>{
        if(!isCardReveled){
            playTurn(x,y);
        }
    };

    return(
        text===""? <div key={`row${x}column${y}`} className={"text-xl m-1 p-2 w-[40px] flex text-center items-center justify-center"}>&nbsp;</div>: <div key={`row${x}column${y}`} onClick={handleClick} className={"text-xl m-1 p-2 border-2 rounded w-[40px] flex text-center items-center justify-center"}>
            {isCardReveled?text:" "}
        </div>
    )
});

export default Card;