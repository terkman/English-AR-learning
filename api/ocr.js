/**
 * api/ocr.js — Vercel Serverless Function
 * Proxies image to Azure AI Vision Read OCR.
 *
 * Environment variables (set in Vercel dashboard):
 *   AZURE_VISION_ENDPOINT  e.g. https://YOUR-RESOURCE.cognitiveservices.azure.com
 *   AZURE_VISION_KEY       your Azure subscription key (32-char hex)
 *
 * Endpoint called: POST /computervision/imageanalysis:analyze?...
 * API version: 2024-02-01 (Azure AI Vision v4, Read OCR)
 */

export const config = { maxDuration: 30 }; // Vercel max 30s

export default async function handler(req, res) {
  // ── CORS headers ──────────────────────────────
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Env vars ──────────────────────────────────
  const endpoint = process.env.AZURE_VISION_ENDPOINT;
  const key      = process.env.AZURE_VISION_KEY;

  if (!endpoint || !key) {
    console.error('[OCR] Missing env vars: AZURE_VISION_ENDPOINT or AZURE_VISION_KEY');
    return res.status(500).json({ error: 'Server misconfigured. Contact admin.' });
  }

  // ── Parse request body ────────────────────────
  const { image } = req.body;
  if (!image || typeof image !== 'string') {
    return res.status(400).json({ error: 'Missing "image" field (base64 string).' });
  }

  // Validate rough base64 size (max ~4MB base64 ≈ ~3MB image)
  if (image.length > 5_500_000) {
    return res.status(413).json({ error: 'Image too large. Please use a smaller capture.' });
  }

  try {
    // ── Convert base64 → Buffer ───────────────────
    const imageBuffer = Buffer.from(image, 'base64');

    // ── Azure AI Vision v4 — Image Analysis (Read) ─
    // Docs: https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-read-api
    const azureUrl = `${endpoint.replace(/\/$/, '')}/computervision/imageanalysis:analyze` +
      `?features=read` +
      `&language=en` +
      `&api-version=2024-02-01`;

    const azureRes = await fetch(azureUrl, {
      method:  'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/octet-stream'
      },
      body: imageBuffer
    });

    if (!azureRes.ok) {
      const errBody = await azureRes.text();
      console.error('[OCR] Azure error:', azureRes.status, errBody);
      return res.status(502).json({
        error: `Azure OCR error: ${azureRes.status}. Check your endpoint and key.`
      });
    }

    const azureData = await azureRes.json();

    // ── Extract lines from response ───────────────
    // Azure v4 structure: result.readResult.pages[].lines[].content
    const pages = azureData?.readResult?.pages || [];
    const lines = [];

    for (const page of pages) {
      for (const line of (page.lines || [])) {
        const text = (line.content || '').trim();
        if (text) lines.push(text);
      }
    }

    return res.status(200).json({ lines, raw: azureData });

  } catch (err) {
    console.error('[OCR] Unexpected error:', err);
    return res.status(500).json({ error: 'OCR failed. Please try again.' });
  }
}
