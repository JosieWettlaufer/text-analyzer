import React, { useState } from "react"; // Import React and the useState hook 
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap styles for UI
import "./App.css"; // custom CSS for additional styles

function App() {
    // Declare state variables to manage text input and analysis report
    const [text, setText] = useState(""); // Text input state
    const [report, setReport] = useState(null); // Report state to hold analysis result

    // Function to analyze the text input when the 'Analyze' button is clicked
    const analyzeText = () => {
        // If no text is entered or text only contains whitespace, set the report to null
        if (!text.trim()) {
            setReport(null); 
            return;
        }

        //Calculates number of sentences

        // break text submision down into array of substrings based on delimiter (".")
        const wordArray = text.split('.')
        //Returns array with empty/whitespace strings removed
        const sentences = wordArray.filter(sentence => sentence.trim().length > 0);
        //Returns total number of sentences
        const totalSentences = sentences.length;


        //Cleans text for processing

        //Convert text submission to lower case
        const lowerText = text.toLocaleLowerCase();
        
        //Replace punctuation with spaces and split into words 
        //[^\w\s] = not letter/number/white space, /g = ensures all matching chars replaced with ''
        const words = lowerText.replace(/[^\w\s]/g, '');

        //splits array at every ' '
        const cleanedText = words.split(' ');

        //object to store word counts
        const wordFrequency = {};

        //loop through word array and count frequency of each word
        cleanedText.forEach(word => {
          if (word) { //skip empty strings
            if(!wordFrequency[word]) {
              wordFrequency[word] = 1;
            } else {
              wordFrequency[word] += 1;
            }
          }
        });

        //passes sentence count and wordFrequency to report
        setReport({ totalSentences, wordFrequency })
      } 

    return (
        // Use flexbox to stack the elements vertically and center them horizontally
        <div className="container d-flex flex-column align-items-center">
            <h1 className="text-center mb-4">Text Analyzer</h1>
            
            <div className="col-md-8"> 

                {/* Textarea for user input */}
                <textarea 
                    className="form-control"
                    value={text} // Bind the textarea value to the state variable 'text'
                    onChange={(e) => setText(e.target.value)} // Update 'text' state on change
                    placeholder="Enter text here."
                    rows="6" // Set the number of visible rows for the textarea
                />
            </div>

            {/* Submit Button */}
            <button className="btn btn-dark mt-3" onClick={analyzeText}>Submit </button>

            {/* If report is generated, display the analysis report by generating report HTML*/}
            {report != null && (
                <div className="report mt-4 p-3 border rounded bg-light text-center col-md-8">
                    {/* Report section */}
                    <h2>Analysis Report</h2>
                    <p><strong>Total Sentences:</strong> {report.totalSentences}</p>
                    <h3>Word Frequency:</h3>
                    {/* List the word frequency */}
                    <ul className="list-group text-start">
                        {/*Converts wordFrequency object into key:value pairs and iterates over each entry*/}
                        {Object.entries(report.wordFrequency).map(([word, count]) => (
                            <li key={word} className="list-group-item">
                                {/* List each word and its frequency */}
                                {word}: {count}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
  
}

// Export the App component so it can be used in other parts of the application
export default App;
