import React from "react";
import lang from "../utils/languageConstants";
import { SUPPORT_LANG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../store/configSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="pt-[11%] w-screen flex justify-center">
      <select
        className="cursor-pointer absolute z-10 bg-blue-400 px-4 py-[11px] rounded-lg right-72 top-6"
        onChange={handleLanguageChange}
      >
        {SUPPORT_LANG.map((lang) => (
          <option key={lang.identifier} value={lang.identifier}>
            {lang.name}
          </option>
        ))}
      </select>

      <form className="bg-black w-1/2 grid grid-cols-12">
        <input
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[language].gptSearchPlaceHolder}
        />
        <button className="px-4 py-2 bg-red-800 rounded-lg col-span-3 m-4">
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
