// Role hierarchy — ordered from highest to lowest privilege
export const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "PROJECT_MANAGER",
  "VOLUNTEER",
  "DONOR",
  "PUBLIC",
] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "users:read",
  "users:write",
  "users:delete",
  "roles:manage",
  "content:read",
  "content:write",
  "content:publish",
  "content:delete",
  "projects:read",
  "projects:write",
  "projects:delete",
  "donations:read",
  "donations:manage",
  "events:read",
  "events:write",
  "events:delete",
  "media:upload",
  "media:delete",
  "audit:read",
  "settings:manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

/** Default permission sets per role */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [...PERMISSIONS],
  ADMIN: [
    "users:read", "users:write",
    "content:read", "content:write", "content:publish", "content:delete",
    "projects:read", "projects:write", "projects:delete",
    "donations:read", "donations:manage",
    "events:read", "events:write", "events:delete",
    "media:upload", "media:delete",
    "audit:read",
  ],
  EDITOR: [
    "content:read", "content:write", "content:publish",
    "projects:read", "projects:write",
    "events:read", "events:write",
    "media:upload",
  ],
  PROJECT_MANAGER: [
    "projects:read", "projects:write",
    "events:read", "events:write",
    "content:read",
  ],
  VOLUNTEER: [
    "projects:read",
    "events:read",
    "content:read",
  ],
  DONOR: [
    "donations:read",
    "content:read",
    "events:read",
  ],
  PUBLIC: [
    "content:read",
    "events:read",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
