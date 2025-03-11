import React, { useState } from "react"; // Import React and the useState hook 
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap styles for UI
import "./App.css"; // custom CSS for additional styles

function App() {
    // Declare state variables to manage text input and analysis report
    const [text, setText] = useState(""); // Text input state
    const [report, setReport] = useState(null); // Report state to hold analysis result

    // Function to analyze the text input when the 'Analyze' button is clicked
    const analyzeText = () => {
        // If no text is entered or text only contains whitespace, clear the report
        if (!text.trim()) {
            setReport(null); 
            return;
        }

        // break text submision down into array of substrings based on delimiter (".")
        const wordArray = text.split('.')
        //Returns array with empty/whitespace only sentences removed
        const sentences = wordArray.filter(sentence => sentence.trim().length > 0);
        //Returns length of sentences array (total number of sentences)
        const totalSentences = sentences.length;


        //Convert text submission to lower case
        const lowerText = text.toLocaleLowerCase();

        //Replace punctuation with spaces and split into words 
        const words = lowerText.replace(/[^\w\s]/g, '').split(/\s+/);

        //object to store word counts
        const wordFrequency = {};

        //loop through words and count frequency of each word
        words.forEach(word => {
          if (word) { //skip empty strings
            if(!wordFrequency[word]) {
              wordFrequency[word] = 1;
            } else {
              wordFrequency[word] += 1;
            }
          }
        });

        setReport({totalSentences, wordFrequency})
      } 

    return (
        // Use flexbox to stack the elements vertically and center them horizontally
        <div className="container d-flex flex-column align-items-center">
            <h1 className="text-center mb-4">Text Analyzer</h1> {/* Main title */}
            
            <div className="col-md-8"> {/* Set a width of 8 columns for the textarea on medium screens */}
                {/* Textarea for user input */}
                <textarea 
                    className="form-control text-center" // Bootstrap form control class for styling
                    value={text} // Bind the textarea value to the state variable 'text'
                    onChange={(e) => setText(e.target.value)} // Update 'text' state on change
                    placeholder="Enter text here..." // Placeholder text
                    rows="6" // Set the number of visible rows for the textarea
                />
            </div>

            {/* Button that triggers the text analysis */}
            <button className="btn btn-dark mt-3" onClick={analyzeText}>
                Analyze {/* Button text */}
            </button>

            {/* If report is generated, display the analysis report */}
            {report && (
                <div className="report mt-4 p-3 border rounded bg-light text-center col-md-8">
                    {/* Report section */}
                    <h2>Analysis Report</h2>
                    <p><strong>Total Sentences:</strong> {report.totalSentences}</p>
                    <h3>Word Frequency:</h3>
                    {/* List the word frequency */}
                    <ul className="list-group text-start">
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
