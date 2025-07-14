import { useEffect, useState } from "react";

/**
 * Este componente força o unmount/remount dos portais Radix
 * sempre que o evento global 'close-all-radix-portals' for disparado.
 * Basta renderizá-lo no topo da sua árvore de Providers.
 */
export function RadixPortalReset({ children }: { children: React.ReactNode }) {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    function handleReset() {
      setResetKey((k) => k + 1);
    }
    window.addEventListener("close-all-radix-portals", handleReset);
    return () => window.removeEventListener("close-all-radix-portals", handleReset);
  }, []);

  return <div key={resetKey}>{children}</div>;
} 