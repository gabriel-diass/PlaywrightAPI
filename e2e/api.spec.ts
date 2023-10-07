import { test, expect } from "@playwright/test";

test.describe("API Testing", () => {
  const baseURL = "https://bookstore.toolsqa.com";
  let userID = "6990cd93-e6a4-4452-a4da-ee62eeb54286";

  test("GET Books", async ({ request }) => {
    const response = await request.get(`${baseURL}/BookStore/v1/Books`);
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody.books[1]); //retorna o primeiro livro
    console.log(responseBody.books[1].title); //retorna o titulo do livro
  });

  test("1-POST new user", async ({ request }) => {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const user = `gab${randomNumber}`;

    const response = await request.post(`${baseURL}/Account/v1/User`, {
      data: {
        userName: user,
        password: "g@bSenha_123",
      },
    });

    expect(response.status()).toBe(201);
    const responseBody = JSON.parse(await response.text());
    expect(responseBody.username).toBe(user);
    userID = responseBody.userID;
  });

  test("2-DELETE user", async ({ request }) => {
    const response = await request.delete(
      `${baseURL}/Account/v1/User/${userID}`
    );
    const responseBody = JSON.parse(await response.text());
    // expect(response.status()).toBe(1200);
  });
});


//TODO - falta implementar reports
//todo - falta implementar o script para execucao