export const validateCheck = async (token: any) => {
  const valite = true;
  if (!valite || !token) {
    return false;
  }
  return true;
};

export async function authMiddleware(req: Request) {
  const token = await req.headers.get("authorization")?.split(" ")?.[1];
  console.log(token);
  return { isvalid: validateCheck(token) };
}
