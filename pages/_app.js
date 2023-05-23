import StaticMath from '../components/StaticMath/StaticMath'
import MathInput from '../components/MathInput/MathInput';
import { useState, useEffect } from 'react';
import '../public/styles/globals.css'
import { evaluateTex } from 'tex-math-parser';

export default function App(){

    const [memory, setMemory] = useState({});
    const [solutionShown, setSolutionShown] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null)
    

    const generateRandomQuestion = () => {
        const ticketNumbers = [      
          [3, 2, 1, 3],
          [5, 6, 7, 8],
          [1, 2, 3, 4]
        ]; // Example ticket numbers
        const ticketPrices = [
          [30, 26],
          [33, 35],
          [40, 41]
        ]; // Example ticket prices
    
        const ticketAnswer = [10, 20, 30];
      
        const randomIndex = Math.floor(Math.random() * ticketNumbers.length);
        
        const [
          value1,
          value2,
          value3,
          value4
        ] = ticketNumbers[randomIndex];
        const [totalCost1, totalCost2] = ticketPrices[randomIndex];
             
        const questions = [
          `A cinema sells adult tickets and child tickets. The total cost of ${value1} adult tickets and ${value2} child ticket is £${totalCost1}. The total cost of ${value3} adult ticket and ${value4} child tickets is £${totalCost2}. Work out the cost of an adult ticket and the cost of a child ticket.`,
          
          `${value1} kg of potatoes and ${value2} kg of carrots have a total cost of ${totalCost1}p. ${value3} kg of potatoes and ${value4}  kg of carrots have a total cost of ${totalCost2}p. Work out the total cost of 1 kg of potatoes and 1 kg of carrots.`,
    
          `The Singh family and the Peterson family go to the circus. The Singh family buy  ${value1} adult tickets and ${value2} child tickets. They pay £${totalCost1} for the tickets. The Peterson family buy ${value3}adult tickets and ${value4} child tickets. They pay £${totalCost2} for the tickets. Find the cost of each adult ticket and each child ticket.`,

          ` Paper clips are sold in small boxes and in large boxes. There is a total of ${totalCost1} paper clips in ${value1}  small boxes and ${value2}  large boxes. There is a total of ${totalCost2}paper clips in ${value3}  small boxes and ${value4}  large boxes. Work out the number of paper clips in each small box and in each large box. `
          
        ];
        setQuestion(questions[Math.floor(Math.random() * ticketNumbers.length)]);
        const newAnswer = `${ticketAnswer[randomIndex]}`;
        setAnswer(newAnswer);   
      };

    function addToMemory(newValue){
        setMemory((prev)=>{
            return {...prev, ...newValue}
        });
    } 
    
    function markingFunction(userInput){
        let inputValue;
        try{
            //the evaluateTex function takes a latex string as an input and returns the evaluation as a javascript number
            inputValue = evaluateTex(userInput).evaluated;
        }catch{
            return 0;
        }
        if (inputValue == answer) {
            return 1
        }else{
            return 0;
        }
    }

    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{maxWidth:'800px', width:'calc(100vw - 40px)', marginTop:'50px'}}>
                <StaticMath latex={`\\text{Question: ${question}}`} />
                <br/>
                <div generateRandomQuestion = {generateRandomQuestion}/>
                <button onClick={generateRandomQuestion}>New Question</button>                   
                <br/>
                <br/>
                {solutionShown ? <StaticMath latex={`\\text{Display the solution here: ${answer}}`} /> : ''}

                <br/>
                <br/>
                <MathInput buttons={['power', 'times']} markingFunction={markingFunction} memKey='mathinput1' memory={memory} setMemory={addToMemory} placeholder="Type your answer here!"/>
                <br/>

                <br/>
                <button  onClick={()=>{setMemory((prev)=>{return{...prev, feedbackShown:true}})}}>Check Answer</button>
                <br/>
                {!solutionShown ? <button style={{marginTop:'20px'}} onClick={()=>{setSolutionShown(true)}}>Show Solution</button> :''}
                {solutionShown ? <button style={{marginTop:'20px'}} onClick={()=>{setSolutionShown(false)}}>Hide Solution</button> : ''}
            </div>
        </div>
    );
}


