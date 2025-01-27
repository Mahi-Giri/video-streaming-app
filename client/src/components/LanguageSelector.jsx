import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../redux/languageSlice";
import {  FaGlobe } from "react-icons/fa";
const LanguageSelector = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((store) => store.language);
  // console.log(language)

  return (<>
  <label className="block text-white mb-1 font-medium">
                        <FaGlobe className="inline-block mr-2 text-green-500" />
                        Select Language
                    </label>
    <select value={language} onChange={(e) => dispatch(setLanguage(e.target.value))} className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 bg-black/60">
       <option value="en">English</option>
  <option value="hi">Hindi (हिन्दी)</option>
  <option value="te">Telugu (తెలుగు)</option>
  <option value="es">Spanish (Español)</option>
  <option value="fr">French (Français)</option>
  <option value="de">German (Deutsch)</option>
  <option value="it">Italian (Italiano)</option>
    </select>
    </>
  );
};

export default LanguageSelector;
