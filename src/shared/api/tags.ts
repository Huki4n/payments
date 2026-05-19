export const apiTags = ["User", "Transaction", "Import", "Settings", "Goal"] as const;

export type ApiTag = (typeof apiTags)[number];
