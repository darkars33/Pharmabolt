import { StatusBar } from 'react-native';
import { usePathname } from 'expo-router';

export function HomeStatusBar() {
  const pathname = usePathname();
  const isHome = pathname === '/home' || pathname === '/deliveryStatus/orderStatus';

  return (
    <StatusBar 
      barStyle={isHome ? "light-content" : "dark-content"}
      backgroundColor={isHome ? "#00BFB3" : "#ffff"}
    />
  );
}
