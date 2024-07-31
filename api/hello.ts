export function GET(request: Request) {
    return new Response(process.env?.OPTIMIZELY_SAAS_SINGLE_KEY);
  }