import { getMenu } from "lib/shopify";
import MotionNavbar from "./MotionNavbar"; // ✅ Import Client Component

export default async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu"); // ✅ Fetching menu in Server Component

  return <MotionNavbar menu={menu} />; // ✅ Passing data to the Client Component
}
