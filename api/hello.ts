export function GET(request: Request) {
    return new Response(process.env?.OPTIMIZELY_CG_SINGLEKEY);
  }