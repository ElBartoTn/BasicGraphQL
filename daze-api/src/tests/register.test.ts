import { request } from "graphql-request";
import { User } from "../entity/User";
import * as faker from "faker";
import * as ResultCode from "../utils/resultCodeEnum";
import * as errorMessages from "../utils/errorMessages";
import * as successMessages from "../utils/successMessages";
import { Connection } from "typeorm";
import { createTypeormConn } from "../utils/createTypeormConn";

const email = faker.internet.email();
const password = faker.internet.password();
const mutation = (e: string, p: string) => `
mutation {
  register(email: "${e}", password: "${p}"){
    path
    message
    resultCode
  }
}
`;
let conn: Connection;
beforeAll(async () => {
  conn = await createTypeormConn();
});
afterAll(async () => {
  conn.close();
});

// 0-Scenario
// 1-Test simple registration
// 2-Test registration with same email
// 3-Test registration with bad credential
jest.setTimeout(30000);
describe("Register user", async () => {
  // 1-Test simple registration
  it("Test registration", async () => {
    const newUserResponse = await request(
      process.env.TEST_HOST as string,
      mutation(email, password)
    );
    expect(newUserResponse).toEqual({
      register: [
        {
          path: "register user",
          message: successMessages.userAdded,
          resultCode: ResultCode.ResultCodeEnum.Success
        }
      ]
    });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  // 2-Test registration with same email
  it("Check duplicate email", async () => {
    const duplicateEmailResponse: any = await request(
      process.env.TEST_HOST as string,
      mutation(email, password)
    );
    expect(duplicateEmailResponse.register).toHaveLength(1);
    expect(duplicateEmailResponse.register[0]).toEqual({
      path: "email",
      message: errorMessages.duplicateEmail,
      resultCode: ResultCode.ResultCodeEnum.UserEmailExists
    });
  });

  // 3-Test registration with bad credential
  it("Check bad credential", async () => {
    // 3-1Test register with bad Email
    const badEmail: string = "ZN";
    const badEmailResponse: any = await request(
      process.env.TEST_HOST as string,
      mutation(badEmail, password)
    );
    expect(badEmailResponse).toEqual({
      register: [
        {
          path: "email",
          message: errorMessages.emailNotLongEnough,
          resultCode: null
        },
        {
          path: "email",
          message: errorMessages.inValidEmail,
          resultCode: null
        }
      ]
    });

    // 3-2 Test register with bad password
    const badPass: string = "ab";
    const badPassResponse: any = await request(
      process.env.TEST_HOST as string,
      mutation(email, badPass)
    );
    expect(badPassResponse).toEqual({
      register: [
        {
          path: "password",
          message: errorMessages.passwordNotLongEnough,
          resultCode: null
        }
      ]
    });

    // 3-3 Test register with bad email and bad password
    const badCredentialResponse: any = await request(
      process.env.TEST_HOST as string,
      mutation(badEmail, badPass)
    );
    expect(badCredentialResponse).toEqual({
      register: [
        {
          path: "email",
          message: errorMessages.emailNotLongEnough,
          resultCode: null
        },
        {
          path: "email",
          message: errorMessages.inValidEmail,
          resultCode: null
        },
        {
          path: "password",
          message: errorMessages.passwordNotLongEnough,
          resultCode: null
        }
      ]
    });
  });
});
