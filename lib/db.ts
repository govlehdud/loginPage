import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

interface ILoginForm {
  email?: string;
  username?: string;
  password?: string;
}

async function test() {
  const token = await db.sMSToken.findUnique({
    where: {
      id: 1,
    },
    include: {
      user: true,
    },
  });
  console.log(token);
}

export async function createUser({ email, username, password }: ILoginForm) {
  // 1. 유저 정보 저장
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

export default db;
