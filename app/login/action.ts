"use server";

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const eqaul: boolean = data.password == "12345";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    errors: !eqaul ? ["Wrong password"] : [],
    success: eqaul ? "Welcom back!" : "",
  };
}
