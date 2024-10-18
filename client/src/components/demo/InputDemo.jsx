import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { MyChart } from "./ChartDemo1";
import axios from "axios";

export function InputDemo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const [totalTweets, setTotalTweets] = useState(null);
  const [positivePercentage, setPositivePercentage] = useState(null);
  const [negativePercentage, setNegativePercentage] = useState(null);
  const [neutralPercentage, setNeutralPercentage] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    console.log("User Input:", searchQuery);
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/variable", {
        searchQuery: searchQuery,
      });

      setResponseMessage(response.data.message);

      setTotalTweets(response.data.total);
      setPositivePercentage(response.data.positive_percentage);
      setNegativePercentage(response.data.negative_percentage);
      setNeutralPercentage(response.data.neutral_percentage);
    } catch (error) {
      console.error("Error during search:", error);
      setResponseMessage("An error occurred while searching.");
    }
  };

  return (
    <>
      <div className="mt-6 mb-4">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Dive Into the Data
          <span className="text-blue-600 dark:text-blue-500">
            {" "}
            Discover Key Trends in
          </span>{" "}
          Tweets.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-4">
          At TweetLense, we focus on unlocking insights from social media data,
          empowering users to analyze trends, conversations, and engagement on
          Twitter
        </p>
        <div className="flex flex-col gap-4 justify-center items-center sm:flex-row py-16 border-r border-b border-gray-600 rounded-3xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <Input
            type="text"
            placeholder="Search Tweets"
            value={searchQuery}
            onChange={handleInputChange}
            className="flex w-[80%] bg-white text-gray-500 rounded-xl sm:w-[30%] border border-gray-500 py-6"
          />
          <Button className="py-6" onClick={handleSearch}>
            Search
          </Button>
        </div>
        {responseMessage && (
          <p className="mt-4 text-lg text-blue-600">{responseMessage}</p>
        )}

        {totalTweets !== null && (
          <div className="mt-6">
            <p className="text-lg text-gray-700">
              Total Tweets Analyzed: {totalTweets}
            </p>
            <p className="text-lg text-green-600">
              Positive Sentiment: {(positivePercentage ?? 0).toFixed(2)}%
            </p>
            <p className="text-lg text-red-600">
              Negative Sentiment: {(negativePercentage ?? 0).toFixed(2)}%
            </p>
            <p className="text-lg text-gray-600">
              Neutral Sentiment: {(neutralPercentage ?? 0).toFixed(2)}%
            </p>
          </div>
        )}
        <MyChart
          total={totalTweets}
          positivePercentage={positivePercentage}
          negativePercentage={negativePercentage}
          neutralPercentage={neutralPercentage}
        />
      </div>
    </>
  );
}
