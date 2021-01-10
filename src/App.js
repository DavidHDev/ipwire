import './App.scss';
import React, { useState } from 'react';
import { Header } from './components/header/Header';
import { InputBox } from './components/input/InputBox';
import { ThemeSwitch } from './components/themeswitch/ThemeSwitch';
import { ContentBox } from './components/content/ContentBox';

function App() {

  const [content, setContent] = useState([])

  return (
    <div className="app">
      <Header></Header>
      <InputBox setContent={setContent}></InputBox>
      <ContentBox content={content}></ContentBox>
    </div>
  );
}

export default App;
