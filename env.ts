import { ZodError, z } from "zod"
import { expand } from "dotenv-expand";;
import { config } from "dotenv";

config({path :".env.local"});

const stringBoolean = z.coerce.string().transform((val) => {
    return val === "true";
  }).default("false");
  
const envSchema = z.object({
    DB_URI:z.string(),
});

expand(config({path :".env.local"}));
try {
    envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof ZodError) {
      let message = "Missing required values in .env:\n";
      error.issues.forEach((issue) => {
        message += issue.path[0] + "\n";
      });
      const e = new Error(message);
      e.stack = "";
      throw e;
    } else {
      console.error(error);
    }
  }

const env = envSchema.parse(process.env);

export default env