import { Outlet } from "@remix-run/react";

export default function PublicLayoutRoute() {
  return (
    <div className="container mx-auto px-4">
      <Outlet />
    </div>
  );
}
