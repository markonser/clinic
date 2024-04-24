import {NextResponse} from "next/server";
import {serialize} from "cookie";

export async function GET(req, res) {
  const serialized = serialize('token', '', {
    httpOnly: true,
    // secure:
    sameSite: 'strict',
    maxAge: -1,
    path: '/'
  });

  return NextResponse.json({
    message: `Bye`
  }, {
    status: 200,
    headers: {'Set-Cookie': serialized}
  });

}