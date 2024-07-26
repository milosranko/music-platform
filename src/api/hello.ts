export function GET(request: Request) {
    return new Response(`Hello from ${process.env.OPTIMIZELY_CR_CLIENTID}`);
  }