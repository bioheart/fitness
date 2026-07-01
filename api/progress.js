export default async function handler(req, res) {
  const url = process.env.bioheartfitnessprogress_KV_REST_API_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.bioheartfitnessprogress_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(500).json({ error: "Vercel KV or Upstash environment variables are not configured." });
  }

  const kvKey = "workout_progress";

  if (req.method === "GET") {
    try {
      const response = await fetch(`${url}/get/${kvKey}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        return res.status(500).json({ error: "Failed to fetch from Vercel KV" });
      }
      const data = await response.json();
      // Upstash returns { result: "string_value" }
      const value = data.result ? JSON.parse(data.result) : {};
      return res.status(200).json(value);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const body = req.body;
      const response = await fetch(`${url}/set/${kvKey}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        return res.status(500).json({ error: "Failed to save to Vercel KV" });
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
