import {useState, useMemo} from 'react'
import './App.css'
import  useDebouncedEffect  from  'use-debounced-effect';
import cloneDeep from 'lodash.clonedeep';

import Card from "./components/Card.tsx";
import GameContext from "./context/GameContext.ts";
import {generateRandomSet} from "./util/GameUtils.ts";

function App() {
  const [initalSet, setInitialSet] = useState(generateRandomSet());
  const [turnNumber, setTurnNumber] = useState(1);
  const [cardA,setCardA] = useState<number[]>([]);
  const [cardB,setCardB] = useState<number[]>([]);
  const cardAIsSet = useMemo(()=>cardA.length===2,[cardA]);
  const cardBIsSet = useMemo(()=>cardB.length===2,[cardB]);
  const cardAValue = useMemo(()=>(cardAIsSet?initalSet[cardA[0]][cardA[1]]:null),[cardA]);
  const cardBValue = useMemo(()=>(cardBIsSet?initalSet[cardB[0]][cardB[1]]:null),[cardB]);
  const playTurn = (x:number,y:number)=> {
      if(initalSet[x][y]==="") return;
      if(cardAIsSet && cardBIsSet) return;
      if(turnNumber%2==1) {
          setCardA([x,y]);
      } else {
          setCardB([x,y]);
      }
      setTurnNumber(turnNumber+1);
  };

    useDebouncedEffect(()=>{
        if(cardAIsSet && cardBIsSet){
            if(cardAValue===cardBValue){
                const currentState = cloneDeep(initalSet);
                currentState[cardA[0]][cardA[1]]="";
                currentState[cardB[0]][cardB[1]]="";
                setInitialSet(currentState);
            }
                setCardA([]);
                setCardB([])
        }
    },2000,[cardAIsSet,cardBIsSet]);

  return (
    <GameContext.Provider value={{playTurn,cardA,cardB}}>
        <div className={"flex flex-col"}>
            {
                initalSet.map((row,indexX)=>

                    <div className={"flex flex-row"} key={`row${indexX}`}>
                        {row.map((contents,indexY)=><Card text={contents} x={indexX} y={indexY}/>)
                        }
                </div>)
            }
        </div>
    </GameContext.Provider>
  )
}

export default App
