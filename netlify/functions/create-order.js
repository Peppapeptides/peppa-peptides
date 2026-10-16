const PRODUCTS = {
  product1: { name: "Product 1", price: 150 },
  product2: { name: "Product 2", price: 185 },
  product3: { name: "Product 3", price: 250 },
  product4: { name: "Product 4", price: 110 },
};

exports.handler = async (event) => {
  const siteUrl = process.env.SITE_URL;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const paypalBase =
    process.env.PAYPAL_ENV === "live"
      ? "https://api-m.paypal.com"
      : "https://api-m.sandbox.paypal.com";

  const reply = (statusCode, data) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!siteUrl || !clientId || !clientSecret) {
    return reply(500, {
      error: "PayPal checkout is not configured yet.",
    });
  }

  try {
    // PayPal returns the customer here after approval.
    if (event.httpMethod === "GET") {
      const orderId = event.queryStringParameters?.token;

      if (!orderId) {
        return {
          statusCode: 302,
          headers: { Location: siteUrl },
          body: "",
        };
      }

      const tokenResponse = await fetch(
        ⁠ ${paypalBase}/v1/oauth2/token ⁠,
        {

