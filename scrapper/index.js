import Cheerio from "cheerio";
import { chromium } from "playwright";
import fs from "fs";
import { writeFile, mkdir } from "fs/promises";

const getCurrentDateTimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

const writeToFile = async (fileName, data) => {
  try {
    const dateTimeString = getCurrentDateTimeString();
    const filePath = `output/${dateTimeString}/${fileName}`;

    await mkdir(`output/${dateTimeString}`, { recursive: true });

    await writeFile(filePath, data);
    console.log("Data has been written to file successfully.");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};

function extractSkillsAsString(str) {
  const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");

  const skillsOnly = withoutTags.replace("Skills:", "").trim();
  return skillsOnly;
}

function parseSalary(salary) {
  let salary_min = 0;
  let salary_max = 0;

  const perHourMatch = salary.match(/£(\d+(\.\d{1,2})?) Per hour/i);
  const fcfaPerHourMatch = salary.match(/FCFA (\d+(\.\d{1,2})?) Per hour/i);
  const annualMatch = salary.match(/£(\d+)K/i);
  const rangeMatch = salary.match(/£(\d+)K - £(\d+)K/i);

  if (perHourMatch) {
    salary_min = parseFloat(perHourMatch[1]) * 8 * 21 * 12;
    salary_max = salary_min + salary_min * 0.3;
  } else if (fcfaPerHourMatch) {
    salary_min = parseFloat(fcfaPerHourMatch[1]) * 8 * 21 * 12;
    salary_max = salary_min + salary_min * 0.3;
  } else if (rangeMatch) {
    salary_min = parseFloat(rangeMatch[1]) * 1000;
    salary_max = parseFloat(rangeMatch[2]) * 1000;
  } else if (annualMatch) {
    salary_min = parseFloat(annualMatch[1]) * 1000;
    salary_max = salary_min + salary_min * 0.3;
  }

  salary_min *= 20876;
  salary_max *= 20876;

  return { salary_min, salary_max };
}

function parseHtmlToJson(html) {
  const jobListings = [];
  const errorListings = [];
  const $ = Cheerio.load(html);

  $('li[data-test="jobListing"]').each((i, element) => {
    const job = {};
    job.title = $(element).find('[data-test="job-title"]').text().trim();
    job.description = $(element)
      .find('[data-test="descSnippet"]')
      .find("div")
      .eq(0)
      .text()
      .trim();
    job.url = $(element).find('[data-test="job-title"]').attr("href");

    const company = $(element)
      .find("div")
      .eq(0)
      .find("div")
      .eq(0)
      .find("div")
      .eq(0)
      .find("div")
      .eq(0)
      .find("div")
      .eq(0)
      .find("div")
      .eq(1)
      .find("span")
      .eq(0)
      .text()
      .trim();

    const com = parseFloat(company);
    if (isNaN(com)) {
      if (company === "") {
        job.company = "Hidden for privacy reasons";
        job.rating = "0.0";
      } else {
        job.company = company;
        job.rating = $(element)
          .find("div")
          .eq(0)
          .find("div")
          .eq(0)
          .find("div")
          .eq(0)
          .find("div")
          .eq(0)
          .find("div")
          .eq(0)
          .find("div")
          .eq(1)
          .find("div")
          .eq(0)
          .find("span")
          .eq(0)
          .text()
          .trim();
      }
    } else {
      job.company = "Hidden for privacy reasons";
      job.rating = "0.0";
    }

    job.skills = extractSkillsAsString(
      $(element)
        .find('[data-test="descSnippet"]')
        .find("div")
        .eq(1)
        .text()
        .trim()
    );

    job.location = "Europe"; //$(element).find('[data-test="emp-location"]').text().trim();

    const salary = parseSalary(
      $(element).find('[data-test="detailSalary"]').text().trim()
    );

    job.salary_min = salary.salary_min;
    job.salary_max = salary.salary_max;

    if (salary.salary_min === 0) {
      errorListings.push(job);
    } else {
      jobListings.push(job);
    }
  });

  return [jobListings, errorListings];
}

function randomDelay(minSeconds, maxSeconds) {
  const delay = Math.random() * (maxSeconds - minSeconds) + minSeconds;
  return new Promise((resolve) => setTimeout(resolve, delay * 1000));
}

const app = async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  let jobs = [];
  let docs = "";

  try {
    await page.goto(
      "https://www.glassdoor.co.uk/Job/tech-jobs-SRCH_KO0,4.htm",
      {
        waitUntil: "domcontentloaded",
      }
    );

    for (let i = 0; i < 30; i++) {
      try {
        await page
          .getByRole("button", {
            name: /Show more jobs/i,
          })
          .click();

        docs = await page.getByLabel("Jobs List").innerHTML();
        jobs = parseHtmlToJson(docs);
      } catch (e) {
        await writeToFile(`jobs.json`, JSON.stringify(jobs, null, 2));
        await writeToFile(`jobs.html`, docs);
      }
      await randomDelay(5, 10);
    }
  } catch (error) {
    await writeToFile(`jobs.json`, JSON.stringify(jobs, null, 2));
    await writeToFile(`jobs.html`, docs);
    console.error("An error occurred:", error.message);
  } finally {
    await page.close();
    await browser.close();
  }
};

// Function to convert JSON to CSV
function jsonToCsv(jsonArray) {
  if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
    throw new Error("Invalid JSON array");
  }

  const keys = Object.keys(jsonArray[0]);
  const csvRows = [];

  // Add the headers
  csvRows.push(keys.join(","));

  // Add the rows
  jsonArray.forEach((obj) => {
    const values = keys.map((key) => {
      const escapedValue = (
        "" + (obj[key] !== null && obj[key] !== undefined ? obj[key] : "")
      ).replace(/"/g, '""'); // Escape double quotes
      return `"${escapedValue}"`; // Wrap in double quotes
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}

// Function to write CSV string to a file
function writeCsvFile(filePath, csvString) {
  fs.writeFileSync(filePath, csvString, "utf-8");
}

// const jobs0 = parseHtmlToJson(
//   fs.readFileSync("output/2024-07-01_19-47-00/jobs.html", "utf8")
// );

const jobs1 = parseHtmlToJson(
  fs.readFileSync("output/2024-07-01_21-06-58/jobs.html", "utf8")
);

(async () => {
  await writeToFile(`jobs.json`, JSON.stringify(jobs1[0], null, 2));
})();
