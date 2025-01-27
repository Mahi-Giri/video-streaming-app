import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const useTranslation = (text) => {
  const [translated, setTranslated] = useState(text);
  const {language }  = useSelector((store) => store.language);
  // console.log(language)

  useEffect(() => {
    const fetchTranslation = async () => {
      if (language === "en") {
        setTranslated(text);
        return;
      }

      const response = await fetch( `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`);
      if (!response.ok) throw new Error('Translation request failed');
      const data = await response.json();
      setTranslated(data.responseData.translatedText);
    };

    fetchTranslation();
  }, [text, language]); 

  return translated;
};

export default useTranslation;
