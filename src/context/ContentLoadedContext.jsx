import React, { createContext, useContext, useState } from 'react';

const ContentLoadedContext = createContext({
  markAsLoaded: () => {},
  isContentLoaded: false
});

export const useContentLoaded = () => {
  return useContext(ContentLoadedContext);
};

export const ContentLoadedProvider = ({ children }) => {
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const markAsLoaded = () => {
    setIsContentLoaded(true);
  };

  return (
    <ContentLoadedContext.Provider value={{ markAsLoaded, isContentLoaded }}>
      {children}
    </ContentLoadedContext.Provider>
  );
};

export default ContentLoadedContext;
