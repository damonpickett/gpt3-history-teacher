import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutPut, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const headerSubtitle = "Experience history through AI powered storytelling";
  const typingDelay = 75;

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index < headerSubtitle.length) {
        setTypingText(typingText + headerSubtitle[index]);
        index++;
        setTimeout(type, typingDelay);
      } else {
        setIsTyping(false);
      }
    };

    type();
  }, []);

  return (
    <div className="root">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        ></link>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron&family=Source+Code+Pro:wght@200;300;400&family=VT323&display=swap" rel="stylesheet"></link>
        <title>GPT-3 Writer | buildspace</title>
      </Head>

      {/* CONTAINER */}
      <div className="container">
        {/* HEADER */}
        <div className="header">
          <div className="header-title standard-div-padding fade-in">
            <h1>HiStoryteller</h1>
          </div>
          {isTyping ? (
                <div className="header-subtitle standard-div-padding typing-effect" text={headerSubtitle}><h2>{headerSubtitle}</h2></div>
              ) : ( <div className="header-subtitle standard-div-padding"><h2>{headerSubtitle}</h2></div>)}
        </div>
        {/*  */}

        {/* PROMPT CONTAINER */}
        <div className="prompt-container">
          <textarea
            placeholder="insert your prompt here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>

          {/* OUTPUT */}
          {apiOutPut && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3 className="typing-effect">Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutPut}</p>
              </div>
            </div>
          )}
        </div>
        {/*  */}
      </div>
      {/*  */}

      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
