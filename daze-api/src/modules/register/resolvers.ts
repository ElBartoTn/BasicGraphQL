import { ResolverMap } from "../../types/graphql.utils";
import { GQL } from "../../types/schema";
import * as yup from "yup";
import { User } from "../../entity/User";
import * as ResultCode from "../../utils/resultCodeEnum";
import * as errorMessages from "../../utils/errorMessages";
import * as successMessages from "../../utils/successMessages";
import { formatYupError } from "../../utils/formatYupError";
//import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink"; // FIXME Zied :  Uncomment this when we have a domain name
// import { sendEmail } from "../../utils/sendEmail"; // FIXME Zied :  Uncomment this when we have a domain name

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3, errorMessages.emailNotLongEnough)
    .max(255)
    .email(errorMessages.inValidEmail),
  password: yup
    .string()
    .min(3, errorMessages.passwordNotLongEnough)
    .max(255)
});
export const resolvers: ResolverMap = {
  Query: {
    bye: () => "bye"
  },
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (error) {
        return formatYupError(error);
      }

      const { email, password } = args;
      const userAlreadyExist = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExist) {
        return [
          {
            path: "email",
            message: errorMessages.duplicateEmail,
            resultCode: ResultCode.ResultCodeEnum.UserEmailExists
          }
        ];
      }

      const user = await User.create({
        email,
        password
      });

      await user.save();
      // FIXME Zied :  Remove when we have a domain name
      //await createConfirmEmailLink(url, user.id, redis);
      // FIXME Zied :  Uncomment this when we have a domain name
      // await sendEmail(email, await createConfirmEmailLink(url, user.id, redis));
      return [
        {
          path: "register user",
          message: successMessages.userAdded,
          resultCode: ResultCode.ResultCodeEnum.Success
        }
      ];
    }
  }
};
