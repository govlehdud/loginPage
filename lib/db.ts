import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

interface ILoginForm {
  email?: string;
  username?: string;
  password?: string;
}

interface IUpdateForm {
  id: number;
  email?: string;
  username?: string;
  bio?: string;
}

export async function createUser({ email, username, password }: ILoginForm) {
  if (!email || !username || !password) {
    throw new Error("필수 필드가 누락되었습니다");
  }

  const data = {
    email,
    username,
    password,
    bio: "",
  };

  // 2. select 조건으로 유저 정보 저장
  const user = await db.user.create({
    data,
    select: { id: true },
  });

  // 3. 결과 반환
  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

export async function updateUser({ id, email, username, bio }: IUpdateForm) {
  if (!email || !username || !bio) {
    throw new Error("필수 필드가 누락되었습니다");
  }

  const data = {
    id,
    username,
    email,
    bio,
  };

  // 2. select 조건으로 유저 정보 저장
  const user = await db.user.update({
    where: { id },
    data,
  });

  console.log(user);

  // 3. 결과 반환
  const result = {
    success: Boolean(user),
    data: user,
  };

  return result;
}

export default db;
