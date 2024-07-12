import axios from "axios";

export async function getRecommendations(minSalary, maxSalary, region, topN) {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_MODEL_API_URL + "/recommend", {
      salary_min: minSalary,
      salary_max: maxSalary,
      location: region,
      top_n: topN,
    });

    return response;
  } catch (error) {
    console.log(error.message);
    return { error: true, message: error.response?.data?.message || "An error occurred" };
  }
}