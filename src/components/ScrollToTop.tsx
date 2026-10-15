import { useEffect } from "react";
import { useLocation } from "react-router";

// Ao mudar de página, vai para o topo (ou para a secção indicada no #)
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
