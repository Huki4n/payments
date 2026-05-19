export const apiTags = ["User", "Transaction", "Import", "Settings"] as const;

export type ApiTag = (typeof apiTags)[number];
