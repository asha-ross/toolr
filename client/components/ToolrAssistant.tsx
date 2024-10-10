import { SetStateAction, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';


function ToolrAssistant() {
  const [inputValue, setInputValue] = useState('');
  const [promptResponses, setpromptResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  
  const genAI = new GoogleGenerativeAI(
    "AIzaSyD9IZ4Or6PkU319Ctw92GGZzxi10oaNVH4"

    

  );
  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };
  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
  
      // Clear previous responses before setting new one
      setpromptResponses([]);
  
      const response = result.response;
      const text = response.text();
      console.log(text);
      setpromptResponses([text]); // Add only the new response
  
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong");
      setLoading(false);
    }
  };
    ;

  return (
    <div className="toolr-container">
      <div className='header-container'>
      <img src='/images/Hammer gif.gif' alt='hammer hitting head on floor' className='hammer-gif'/>
      <h1 className='header-text'>Hitting your head against a wall <br/> with what to do?</h1>
      <img src='/images/Hammer gif.gif' alt='hammer hitting head on floor' className='hammer-gif-2'/>
      </div>
      <h2>Toolr is here to help!</h2>
    <div className="toolr-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="How can I help you today?"
          className="toolr-input"
        />
      </div>
      <div className="toolr-send-button-container">
        <button onClick={getResponseForGivenPrompt} className="toolr-send-button">Please help!</button>
      </div>
      <h2>Response below!</h2>
      <div className="toolr-reponse-container">
    {loading ? (
      <div className="text-center mt-3">
        <div className="spinner-border text-primary" role="status">
          {/* // This message is shown while your answer to your prompt is being generated */}
          <span className="visually-hidden">Thinking, thinking...</span>
       
        </div>
      </div>
    ) : (
      promptResponses.map((promptResponse, index) => (
        <div key={index} className='toolr-reponse'>
          {/* //the latest response shown in bold letters */}
          <div className="toolr-input-response">{promptResponse}</div>
     
        </div>
      ))
    )}
  </div>
  </div>
  
  );

}
export default ToolrAssistant;