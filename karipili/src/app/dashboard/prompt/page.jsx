"use client";
import AIResponse from "@/components/card/AIResponse";
import UserPrompt from "@/components/card/UserPrompt";
import { getRecommendations } from "@/helpers/promptHelper";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

export default function Prompt() {
  const textareaRef = useRef(null);
  const [value, setValue] = useState("");
  const [minSalary, setMinSalary] = useState([1, 1000000]);
  const [maxSalary, setMaxSalary] = useState([1000000, 10000000]);
  const [region, setRegion] = useState("");
  const [data, setData] = useState([]);
  const [topN, setTopN] = useState(5);

  const handleInput = (event) => {
    const textarea = textareaRef.current;
    setValue(event.target.value);
    textarea.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const maxHeight = 4 * lineHeight;
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const removeCommaAndDot = (value) => {
    return value.replace(/[,\.]/g, '');
  };
  
  const changeMinSalary = (event) => {
    const sanitizedValue = removeCommaAndDot(event.target.value);
    setMinSalary(sanitizedValue);
  };
  
  const changeMaxSalary = (event) => {
    const sanitizedValue = removeCommaAndDot(event.target.value);
    setMaxSalary(sanitizedValue);
  };

  const changeRegion = (event) => {
    setRegion(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await getRecommendations(minSalary, maxSalary, region, topN);
    setData(response.data);
  };

  return (
    <>
      <div>
        <p className="p-2 w-fit text-2xl font-bold text-primary-50 border-b-2 border-primary-50 ">Job Recommendation</p>
        <div className="py-10">
          <div className="flex justify-center">
            <p className="bg-secondary-100 text-xs text-primary-150 px-8 rounded-full font-bold">List Job Recommendation</p>
          </div>
          <div className="absolute top-44 lg:top-48 pr-7 lg:left-[355px] lg:right-28 pb-36 lg:px-0 lg:pr-0">
          <UserPrompt data={data} />
          </div>
          <div className="fixed bottom-9 pl-7 left-0 pr-7 w-full lg:pl-[355px] lg:pr-28">
            <div className="bg-secondary-50">
              <form className="flex items-center gap-2 rounded-2xl p-2 border border-primary-50 bg-primary-150">
                {/* <textarea ref={textareaRef} name="prompt" id="prompt" onInput={handleInput} rows={1} className="rounded-2xl p-3 w-full bg-primary-150  resize-none focus:outline-none text-sm" placeholder="Message Karipili" /> */}

                <div className="w-full">
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    <div className="flex flex-col items-center ">
                      <h3 className="mb-1 font-semibold">Range Salary</h3>
                      <div>
                        <input onChange={changeMinSalary} type="number" className="border border-secondary-150 w-20 md:w-32 mx-2 rounded-lg p-1 text-sm placeholder:text-sm" placeholder="1,000,000" step={1000000} min={0} />
                        <span>-</span>
                        <input onChange={changeMaxSalary} type="number" className="border border-secondary-150 w-20 md:w-32 mx-2 rounded-lg p-1 text-sm placeholder:text-sm" placeholder="10,000,000" step={1000000} min={0} />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Select Region</h3>
                      <select onChange={changeRegion} name="region" id="region" className="border border-secondary-200 p-1 rounded-md" defaultValue="" required>
                        <option value="" disabled>
                          select region
                        </option>
                        <option value="USA">USA</option>
                        <option value="Australia">Australia</option>
                        <option value="Europe">Europe</option>
                      </select>
                    </div>
                    {/* <label htmlFor="Range">
                      Range Salary <span className="text-xs">from</span>
                      <input type="number" className="border border-secondary-200 w-20 md:w-32 mx-2 rounded-lg p-1 placeholder:text-sm" placeholder="1,000,000" />
                      <span className="text-xs">to</span>
                      <input type="number" className="border border-secondary-200 w-20 md:w-32 mx-2 rounded-lg p-1 placeholder:text-sm" placeholder="10,000,000" />
                    </label>
                    <label htmlFor="Select Region" className="mt-2">
                      Select Region
                      <select name="region" id="region" className="bg-white border border-black rounded-md ml-3 w-fit p-1">
                        <option value="US">US</option>
                        <option value="Australia">Australia</option>
                        <option value="Asia">Asia</option>
                      </select>
                    </label> */}
                  </div>
                </div>
                <button onClick={handleSubmit} type="submit" className="rounded-md bg-primary-200 text-primary-150 p-2 hover:bg-green-500">
                  <IoSend />
                </button>
              </form>
            </div>
          </div>
          <div className="fixed bottom-0 w-full left-0 bg-secondary-50 text-secondary-50 py-2 text-sm flex justify-center pr-1 lg:pr-0 lg:pl-44">Karipili | System Career Recommendation</div>
        </div>
      </div>
    </>
  );
}
