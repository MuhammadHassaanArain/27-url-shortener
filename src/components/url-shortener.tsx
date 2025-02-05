"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import axios from "axios";

const BITLY_API_URL = "https://api-ssl.bitly.com/v4/shorten";
const BITLY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN;
export default function URLShortenerComponent() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setShortUrl("");
    try {
      const response = await axios.post(
        BITLY_API_URL,
        {
          long_url: longUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${BITLY_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      setShortUrl(response.data.link);
    } catch (error) {
      setError("Failed to shorten the URL.  Please try again.");
      console.error(error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Successfully copied the Short URL!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-md w-full space-y-4 p-6 rounded-lg bg-background shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">URL Shortener</h1>
          <p className="text-muted-foreground">
            Paste your long URL and get a short, shareable link.
          </p>
        </div>
        {/* Form to input and submit the long URL */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              type="url"
              placeholder="Paste your long URL here"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="pr-16"
              required
            />
            <Button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2"
            >
              Shorten
            </Button>
          </div>
          {/* Display error message if any */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {/* Display the shortened URL and copy button */}
          {shortUrl && (
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Input
                  type="text"
                  value={shortUrl}
                  readOnly
                  className="cursor-pointer"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:bg-muted/50"
                onClick={handleCopy}
              >
                <CopyIcon className="w-5 h-5" />
                <span className="sr-only">Copy</span>
              </Button>
            </div>
          )}
        </form>
        <div className="text-gray-700 font-bold text-center">
          Created by Hassaan Arain
        </div>
      </div>
    </div>
  );
}
