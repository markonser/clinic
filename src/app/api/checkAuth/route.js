import {decode, verify} from "jsonwebtoken";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

const MAX_AGE = 60 * 60 * 24 * 30;
const secret = process.env.JWT_SECRET;

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get('token');

  if (!token) {
    return NextResponse.json({
      message: 'Unauthorized'
    }, {status: 401});
  }

  const value = token.value;
  const {id, fio, role} = decode(value, secret);

  try {
    verify(value, secret);
    return NextResponse.json({
      user: {
        id, fio, role
      },
      message: 'auth OK'
    }, {status: 200});
  } catch (error) {
    return NextResponse.json({
      message: 'Error auth('
    }, {status: 401});
  }
}