/**
 * netlify/functions/ocr.js — Netlify Functions
 * Same logic as Vercel api/ocr.js but uses Netlify handler format.
 *
 * Environment variables (set in Netlify dashboard → Site Settings → Env Vars):
 *   AZURE_VISION_ENDPOINT  e.g. https://YOUR-RESOURCE.cognitiveservices.azure.com
 *   AZURE_VISION_KEY       your Azure subscription key
 *
 * Frontend endpoint for Netlify: '/.netlify/functions/ocr'
 * (Change OCR_ENDPOINT in part5/index.html accordingly)
 */

exports.handler = async function (event) {
  // ── CORS ──────────────────────────────────────
  const corsHeaders = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  // ── Env vars ──────────────────────────────────
  const endpoint = process.env.AZURE_VISION_ENDPOINT;
  const key      = process.env.AZURE_VISION_KEY;

  if (!endpoint || !key) {
    return {
      statusCode: 500, headers: corsHeaders,
      body: JSON.stringify({ error: 'Server misconfigured. Contact admin.' })
    };
  }

  // ── Parse body ────────────────────────────────
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers: corsHeaders,
             body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const { image } = body;
  if (!image || typeof image !== 'string') {
    return { statusCode: 400, headers: corsHeaders,
             body: JSON.stringify({ error: 'Missing "image" field (base64 string).' }) };
  }

  if (image.length > 5_500_000) {
    return { statusCode: 413, headers: corsHeaders,
             body: JSON.stringify({ error: 'Image too large.' }) };
  }

  try {
    const imageBuffer = Buffer.from(image, 'base64');

    const azureUrl = `${endpoint.replace(/\/$/, '')}/computervision/imageanalysis:analyze` +
      `?features=read&language=en&api-version=2024-02-01`;

    const azureRes = await fetch(azureUrl, {
      method:  'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/octet-stream'
      },
      body: imageBuffer
    });

    if (!azureRes.ok) {
      const errText = await azureRes.text();
      console.error('[OCR] Azure error:', azureRes.status, errText);
      return { statusCode: 502, headers: corsHeaders,
               body: JSON.stringify({ error: `Azure error: ${azureRes.status}` }) };
    }

    const azureData = await azureRes.json();
    const pages = azureData?.readResult?.pages || [];
    const lines = [];

    for (const page of pages) {
      for (const line of (page.lines || [])) {
        const text = (line.content || '').trim();
        if (text) lines.push(text);
      }
    }

    return {
      statusCode: 200, headers: corsHeaders,
      body: JSON.stringify({ lines })
    };

  } catch (err) {
    console.error('[OCR] Error:', err);
    return { statusCode: 500, headers: corsHeaders,
             body: JSON.stringify({ error: 'OCR failed. Please try again.' }) };
  }
};
