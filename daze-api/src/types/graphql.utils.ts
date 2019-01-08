// import { Redis } from "ioredis";

export interface ResolverMap {
  [Key: string]: {
    [Key: string]: (parent: any, args: any, context: {}, info: any) => any;
  };
}
