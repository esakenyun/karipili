"use client";
import AIResponse from "@/components/card/AIResponse";
import UserPrompt from "@/components/card/UserPrompt";
import { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

export default function Prompt() {
  const textareaRef = useRef(null);
  const [value, setValue] = useState("");

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

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <>
      <div>
        <p className="p-2 w-fit text-2xl font-bold text-primary-50 border-b-2 border-primary-50 ">AI Prompt</p>
        <div className="py-10">
          <div className="flex justify-center">
            <p className="bg-secondary-100 text-xs text-primary-150 px-8 rounded-full font-bold">Your Chat</p>
          </div>
          <div className="absolute top-44 lg:top-48 pr-7 lg:left-[355px] lg:right-28 pb-36 lg:px-0 lg:pr-0">
            <UserPrompt />
            <div className="mt-5">
              <AIResponse />
            </div>
            <UserPrompt />
            <div className="mt-5">
              <AIResponse />
            </div>
            <UserPrompt />
            <div className="mt-5">
              <AIResponse />
            </div>
          </div>
          <div className="fixed bottom-9 pl-7 left-0 pr-7 w-full lg:pl-[355px] lg:pr-28">
            <div className="bg-secondary-50">
              <form className="flex items-center gap-2 rounded-2xl p-2 border border-primary-50 bg-primary-150">
                <textarea ref={textareaRef} name="prompt" id="prompt" onInput={handleInput} rows={1} className="rounded-2xl p-3 w-full bg-primary-150  resize-none focus:outline-none text-sm" placeholder="Message Karipili" />
                <button onClick={handleSubmit} type="button" className="rounded-md bg-primary-200 text-primary-150 p-2">
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
