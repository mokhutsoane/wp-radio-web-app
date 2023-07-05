import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const formDataToSend = req.body;
  const apiUrl = process.env.API_URL;

  try {
    const response = new Request(`${apiUrl}`, {
      method: "POST",
      body: formDataToSend,

      redirect: "follow",
    });
    const data = await response.json();

    if (response) {
      return new Response(JSON.stringify(data.message ?? null), {
        status: 200,

        headers: {
          "content-type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify(data.message), {
        status: 500,

        headers: {
          "content-type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error("An error occurred while submitting the form", error);
    return new Response(
      JSON.stringify(`An error occurred while submitting the form ${error}`),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
