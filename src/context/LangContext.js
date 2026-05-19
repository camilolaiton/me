import React, { createContext, useContext, useState } from 'react';

export const LangContext = createContext({ lang: 'en', setLang: () => {} });

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
