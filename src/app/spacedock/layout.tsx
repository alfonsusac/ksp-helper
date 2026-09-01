import { cnr, cns } from "@/design-system"
import { SpacedockNavbar } from "./_components/navbar"
import { Footer } from "./_components/footer"
import { styles } from "./_components/shared"

export default function SpacedockLayout(props: LayoutProps<'/spacedock'>) {
  return <div className={cns.page(
    styles.pageMaxWidth,
    "mx-auto w-full"
  )}>

    <SpacedockNavbar />

    <div className="grow">
      {props.children}
    </div>

    <Footer />

  </div>
}