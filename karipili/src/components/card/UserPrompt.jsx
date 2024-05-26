import { BsPersonCircle } from "react-icons/bs";

export default function UserPrompt() {
  return (
    <>
      <div className="flex gap-2 lg:gap-3 justify-start">
        <div>
          <BsPersonCircle className="text-3xl lg:text-5xl text-warm-300" />
        </div>
        <div>
          <p className="text-xs lg:text-sm font-bold text-primary-50">You</p>
          <p className="text-xs lg:text-sm text-justify w-fit rounded-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
            Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
        </div>
      </div>
    </>
  );
}
