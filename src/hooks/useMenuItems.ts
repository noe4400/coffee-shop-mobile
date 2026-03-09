import { SHOP_ADDRESS } from "@/services/solana/solana";
import { fetchMenuItemsByShop } from "@/services/solana/store.service";
import { useQuery } from "@tanstack/react-query";


export const useMenuItems = () => {
  return useQuery({
    queryKey: ["menuItems", SHOP_ADDRESS],
    queryFn: () => fetchMenuItemsByShop(SHOP_ADDRESS),
  });
};