export function getErrorMsg(error: any) {
  return error instanceof Error ? error.message : String(error);
}
