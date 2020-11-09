import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import marked from 'marked';
import './App.css';

export default function App() {
  // state
  const [markdown, setMarkdown] = useState('# sup');

  // functions
  function handleChange(e) {
    setMarkdown(e.target.value);
  }

  // render
  return (
    <div className='app'>
      <textarea value={markdown} onChange={handleChange} />
      {/* <div className='preview'>
        <h1>Render Markdown Here</h1>
        <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </div> */}
      <ReactMarkdown className='previewe' source={markdown} />
    </div>
  );
}
