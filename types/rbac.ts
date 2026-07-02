// types/rbac.ts

export const ROLES = ["SUPER_ADMIN", "EDITOR", "OBSERVATOR"] as const;

export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "users:read",
  "users:write",
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
  // Accès total, y compris gestion des utilisateurs et des rôles
  SUPER_ADMIN: [...PERMISSIONS],

  // Peut créer/modifier du contenu, événements, projets, et uploader des médias
  // Ne peut ni supprimer, ni gérer les utilisateurs/rôles/paramètres/dons
  EDITOR: [
    "content:read",
    "content:write",
    "content:publish",
    "projects:read",
    "projects:write",
    "events:read",
    "events:write",
    "media:upload",
  ],

  // Lecture seule sur tout le contenu
  OBSERVATOR: [
    "content:read",
    "projects:read",
    "events:read",
    "donations:read",
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}