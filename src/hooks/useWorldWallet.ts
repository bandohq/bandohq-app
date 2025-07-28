import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { generateUUID } from "../utils/generateUUID";

type WorldWallet = {
  username: string | null;
  address: string | null;
};

export const useWorldWallet = (): WorldWallet => {
  const [username, setUsername] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const inWorld = MiniKit.isInstalled();

      if (!inWorld) return;

      try {
        const username = MiniKit.user.username;
        setUsername(username);
        const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
          nonce: generateUUID(),
        });

        if (finalPayload.status === "success") {
          setAddress(finalPayload.address);
        }
      } catch (e) {
        console.warn("walletAuth error:", e);
      }
    };

    run();
  }, []);

  return { username, address };
};
