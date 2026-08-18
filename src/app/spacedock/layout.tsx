import { cnr, cns } from "@/design-system"
import { SpacedockNavbar } from "./_components/nav"
import { Footer } from "./_components/footer"

const maxWidth = cnr("max-w-280 mx-auto w-full")

export default function SpacedockLayout(props: LayoutProps<'/spacedock'>) {
  return <div className={cns.page(maxWidth())}>

    <SpacedockNavbar />

    {props.children}

    <Footer />

  </div>
}