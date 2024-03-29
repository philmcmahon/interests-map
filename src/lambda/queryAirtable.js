import fetch from "node-fetch";

const { AIRTABLE_API_KEY } = process.env;
if (!AIRTABLE_API_KEY || AIRTABLE_API_KEY.length < 5) {
  console.error(
    "Missing environment variable: AIRTABLE_API_KEY. You need to set this variable."
  );
}

exports.handler = (event, context, callback) => {
  const { id } = event.queryStringParameters;

  const baseUrl = "https://api.airtable.com/v0/apprDuIO0HcYP2PbT/Interests";
  const url = id ? `${baseUrl}/${id}` : baseUrl;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(res),
      });
    })
    .catch((error) => {
      console.error(error);
      callback(error, { statusCode: 500 });
    });
};
