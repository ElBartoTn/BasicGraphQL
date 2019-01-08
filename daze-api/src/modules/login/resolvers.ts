import { ResolverMap } from "../../types/graphql.utils";
import { GQL } from "../../types/schema";
import { User } from "../../entity/User";
// import { formatYupError } from "../../utils/formatYupError";
import * as ResultCode from "../../utils/resultCodeEnum";
import * as errorMessages from "../../utils/errorMessages";
import * as successMessages from "../../utils/successMessages";
import * as bcrypt from "bcryptjs";

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "bye"
  },
  Mutation: {
    login: async (
      _: any,
      { email, password }: GQL.ILoginOnMutationArguments
    ) => {
      const user = await User.findOne({ where: { email } });
      const errorResponse = [
        {
          path: "user",
          message: errorMessages.invalidLogin,
          resultCode: ResultCode.ResultCodeEnum.Failed
        }
      ];
      if (!user) {
        return errorResponse;
      }
      //FIXME ZIed: Uncomment when we make email validation work
      /*if (!user.isValidated) {
        return [
          {
            path: "user",
            message: errorMessages.notValidatedAccount,
            resultCode: ResultCode.ResultCodeEnum.UserNotValidated
          }
        ];
      }*/

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return errorResponse;
      }

      return [
        {
          path: "User Loged in",
          message: successMessages.userLogedIn,
          resultCode: ResultCode.ResultCodeEnum.Success
        }
      ];
    }
  }
};
