import { AxiosError } from "axios";

export function getErrorMessage(err: unknown): string {
  if (err instanceof AxiosError) {
    return (
      (err.response?.data?.error as string) ||
      err.message ||
      "An unexpected server error occurred"
    );
  }

  if (err instanceof Error) {
    return err.message || "An unknown error occurred";
  }

  return "Something went wrong";
}
