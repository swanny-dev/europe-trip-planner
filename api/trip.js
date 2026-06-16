const tripId = process.env.TRIP_ID || "europe-2027";

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return {
    "apikey": key,
    "authorization": `Bearer ${key}`,
    "content-type": "application/json"
  };
}

function requireEnv(response) {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return true;
  response.status(503).json({ error: "Supabase is not configured yet" });
  return false;
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "string") return JSON.parse(body);
  return body;
}

module.exports = async function handler(request, response) {
  if (!requireEnv(response)) return;

  const baseUrl = process.env.SUPABASE_URL.replace(/\/$/, "");
  const rowUrl = `${baseUrl}/rest/v1/trip_state?id=eq.${encodeURIComponent(tripId)}`;

  if (request.method === "GET") {
    const result = await fetch(`${rowUrl}&select=payload&limit=1`, {
      headers: supabaseHeaders()
    });
    if (!result.ok) return response.status(result.status).json({ error: "Could not load trip" });
    const rows = await result.json();
    if (!rows.length) return response.status(404).json({ error: "No shared trip yet" });
    return response.status(200).json(rows[0].payload);
  }

  if (request.method === "PUT") {
    try {
      const trip = parseBody(request.body);
      if (!Array.isArray(trip.destinations)) return response.status(400).json({ error: "Invalid trip" });
      const result = await fetch(`${baseUrl}/rest/v1/trip_state`, {
        method: "POST",
        headers: {
          ...supabaseHeaders(),
          "prefer": "resolution=merge-duplicates,return=minimal"
        },
        body: JSON.stringify({
          id: tripId,
          payload: trip,
          updated_at: new Date().toISOString()
        })
      });
      if (!result.ok) return response.status(result.status).json({ error: "Could not save trip" });
      return response.status(200).json({ ok: true });
    } catch {
      return response.status(400).json({ error: "Could not save trip" });
    }
  }

  response.setHeader("Allow", "GET, PUT");
  return response.status(405).end();
};
