export default async function handler(req, res) {
    // আপনার API Key এখানে নিরাপদ থাকবে
    const API_KEY = "1DSBIXIEEUC";
    const BASE_URL = "https://api.zebrasms.com/api/v1/publicapi";

    const { endpoint, range, sender } = req.query;

    try {
        let url = "";
        let options = {
            headers: {
                "MAuth": API_KEY,
                "Content-Type": "application/json"
            }
        };

        if (endpoint === "getnum") {
            url = `${BASE_URL}/getnum`;
            options.method = "POST";
            options.body = JSON.stringify({ range: range });
        } else if (endpoint === "getupdate") {
            url = `${BASE_URL}/getupdate`;
            options.method = "GET";
        } else if (endpoint === "liveaccess") {
            url = `${BASE_URL}/liveaccess${sender ? `?sender=${encodeURIComponent(sender)}` : ""}`;
            options.method = "GET";
        } else {
            return res.status(400).json({ error: "Invalid endpoint" });
        }

        const response = await fetch(url, options);
        const data = await response.json();

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "API connection failed", details: error.message });
    }
}
