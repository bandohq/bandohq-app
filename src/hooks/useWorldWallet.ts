import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

type WorldWallet = {
  username: string | null;
};

export const useWorldWallet = (): WorldWallet => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const inWorld = MiniKit.isInstalled();

      if (!inWorld) return;

      try {
        const username = MiniKit.user.username;
        setUsername(username);
      } catch (e) {
        console.warn("walletAuth error:", e);
      }
    };

    run();
  }, []);

  return { username };
};
