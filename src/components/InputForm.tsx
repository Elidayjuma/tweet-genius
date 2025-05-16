"use client";

import React, { useState, ChangeEvent } from "react";
import { generateTweets } from "@/actions/generate_tweets";
import QuestionCard from "./QuestionCard";

const InputForm: React.FC = () => {
    const CHAR_LIMIT = 2000;
    const WARNING_THRESHOLD = 1800;

    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [noOfTweets, setNoOfTweets] = useState<string>("");
    const [tweets, setTweets] = useState<string[]>([]);
    const [descWarning, setDescWarning] = useState(false);
    const [showForm, setShowForm] = useState(true);


    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value.slice(0, CHAR_LIMIT);
        setPrompt(input);
        setDescWarning(input.length >= WARNING_THRESHOLD);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        setTweets([]); // Clear previous questions

        if (!prompt.trim()) {
            setError("Please enter a prompt.");
            setLoading(false);
            return;
        }

        // Assuming the backend is updated to parse a text prompt into structured data
        const generatedTweets = await generateTweets(prompt, noOfTweets || "5");
        if (!generatedTweets.length) {
            setError("Failed to generate tweets. Try again.");
        } else {
            setTweets(generatedTweets);
            setShowForm(false);
        }

        setLoading(false);
    };

    return (
        <div>
            {showForm && (
                <div className="mx-auto max-w-4xl p-4">
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-col gap-4">
                            <div className="w-full">
                                <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Type your prompt here
                                </label>
                                <textarea
                                    id="job-description"
                                    value={prompt}
                                    onChange={handleDescriptionChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                                    placeholder="e.g., Generate a tweet about the latest tech trends."
                                    rows={15}
                                    required
                                />
                                <div className="text-xs flex justify-between">
                                    <span className="text-gray-500">{prompt.length}/{CHAR_LIMIT} characters</span>
                                    {descWarning && <span className="text-yellow-600">Approaching limit</span>}
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor="questions-number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Input the number of tweets to generate
                                </label>
                                <input
                                    type="number"
                                    id="questions-number"
                                    min={1}
                                    value={noOfTweets}
                                    max={10}
                                    placeholder="e.g., 10 "
                                    onChange={(e) => setNoOfTweets(e.target.value)}
                                    defaultValue={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                                />
                            </div>

                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                        >
                            {loading ? "Generating tweets" : "Generate tweets"}
                        </button>
                    </form>
                </div>
            )}
            {tweets.length > 0 && (
                <div>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowForm((prev) => !prev)}
                            className="text-blue-600 text-sm underline"
                        >
                            {showForm ? "Hide Form" : "Show Form"}
                        </button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-4">Generated Tweets:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tweets.map((tweet, index) => (
                                <div key={index} className="border rounded-xl p-4 shadow-sm bg-gray-50 relative">
                                    <p className="text-gray-800 mb-8">{tweet}</p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(tweet);
                                        }}
                                        className="absolute bottom-2 right-2 text-sm text-blue-600 hover:underline"
                                    >
                                        Copy
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default InputForm;
