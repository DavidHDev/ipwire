import './App.scss';
import React, { useState } from 'react';
import { Header } from './components/header/Header';
import { InputBox } from './components/input/InputBox';
import { ContentBox } from './components/content/ContentBox';

function App() {

  const [content, setContent] = useState([])
  const [country, setCountry] = useState([])

  return (
    <div className="app">
      <Header></Header>
      <InputBox setContent={setContent} setCountry={setCountry}></InputBox>
      <ContentBox content={content} country={country}></ContentBox>
    </div>
  );
}

export default App;
