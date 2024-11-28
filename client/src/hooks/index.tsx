import { useEffect, useState } from "react";
import axios from "axios";

export function useRandomQuote() {
  const [quote, setQuote] = useState<{ text: string; author: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await axios.get("https://type.fit/api/quotes");
        const quotes = response.data;

        if (quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * quotes.length);
          const randomQuote = quotes[randomIndex];
          setQuote(randomQuote);
        } else {
          setError("No quotes available");
        }
      } catch (error) {
        setError("Error fetching random quote");
        console.error("Error fetching random quote:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, []);

  return { quote, loading, error };
}
