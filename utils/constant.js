export const TICKET_STATUS = Object.freeze({
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  CLOSED: "closed",
});

export const TICKET_PRIORITY = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
});

export const USER_ROLES = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  MODERATOR: "moderator",
});

export const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
