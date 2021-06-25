import React, { createContext, useState } from 'react';

export const ContentContext = createContext();

export function ContentContextProvider (props) {
  const [content, setContent] = useState()
  const [topic, setTopic] = useState()

  const updateContent = (newContent) => {
    setContent(newContent)
  }

  const updateTopic = (newTopic) => {
      setTopic(newTopic)
}
    
  return (
    <ContentContext.Provider value={{content , updateContent, updateTopic, topic}}>
      {props.children}
    </ContentContext.Provider>
  )
}

