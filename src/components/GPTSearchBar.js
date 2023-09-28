import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { SUPPORT_LANG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../store/configSlice";
import openai from "../utils/openai";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 10 movies,comma seperated like the example result given ahead.Example Result : Jawan,Kushi,OG,Skanda,Leo,Salar ";
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="pt-[11%] w-screen flex justify-center">
      <select
        className="cursor-pointer absolute z-10 bg-gray-700 px-4 py-[11px] rounded-lg right-72 top-6 text-white"
        onChange={handleLanguageChange}
      >
        {SUPPORT_LANG.map((lang) => (
          <option key={lang.identifier} value={lang.identifier}>
            {lang.name}
          </option>
        ))}
      </select>

      <form
        className="bg-black w-1/2 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-9"
          placeholder={lang[language].gptSearchPlaceHolder}
        />
        <button
          className="px-4 py-2 bg-red-800 rounded-lg col-span-3 m-4"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
