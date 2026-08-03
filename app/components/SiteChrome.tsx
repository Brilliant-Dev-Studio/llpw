"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import ScrollToTop from "./ScrollToTop";
import CursorFollower from "./CursorFollower";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <CursorFollower />
      <SiteHeader />
      {children}
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}
