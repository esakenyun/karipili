import { formatRupiah } from "@/helpers/currencyHelper";
import { convertToStars } from "@/helpers/formatHelper";
import Link from "next/link";
import { BsPersonCircle, BsStar } from "react-icons/bs";

export default function UserPrompt({ data }) {
  return(
  <>
    {data.map((item, index) => (
      <div key={index} className="flex gap-2 lg:gap-3 justify-start my-5">
      <div>
        <BsPersonCircle className="text-3xl lg:text-5xl text-warm-300" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs lg:text-lg font-bold text-primary-50">{item.title}</p>
        <p className="flex text-yellow-500">{convertToStars(item.rating)}</p>
        <label className="text-primary-50 font-semibold">Description</label>
        <p className="text-xs lg:text-sm text-justify w-fit rounded-lg">
         {item.description}
        </p>
        <p className="text-xs lg:text-sm text-justify w-fit rounded-lg">
        <span className="text-primary-50 font-semibold">Skills : </span>{item.skills}
        </p>
        <p><span className="font-bold text-red-500">{formatRupiah(item.salary_min)}</span> - <span className="font-bold text-green-500">{formatRupiah(item.salary_max)}</span></p>
      </div>
    </div>
    ))}
  </>
  );
}
