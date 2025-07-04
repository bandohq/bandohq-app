import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { generateUUID } from "../utils/generateUUID";

type WorldWallet = {
  address: string | null;
  signature: string | null;
  version: number | null;
  username: string | null;
};

export const useWorldWallet = (): WorldWallet => {
  const [address, setAddress] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [version, setVersion] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const inWorld = MiniKit.isInstalled();

      if (!inWorld) return;

      // Generate a random UUID for the nonce
      const nonce = generateUUID();

      try {
        const username = MiniKit.user.username;
        const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
          nonce,
        });

        if (finalPayload.status === "success") {
          setAddress(finalPayload.address);
          setSignature(finalPayload.signature);
          setVersion(finalPayload.version);
          setUsername(username);
        }
      } catch (e) {
        console.warn("walletAuth error:", e);
      }
    };

    run();
  }, []);

  return { address, signature, version, username };
};
