/**
 * Navigation typée `next-intl` partagee par les composants client.
 */
import { createNavigation } from "next-intl/navigation";
import routing from "./routing";

export const { Link, usePathname, useRouter, getPathname } =
  createNavigation(routing);
