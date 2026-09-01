import { cnr, cns } from "@/design-system"
import Link from "next/link"

export function InvisibleText() {
  return <span className={"opacity-0 pointer-events-none"}>a</span>
}
export function Lorem() {
  return <>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem culpa vel voluptate repellendus, commodi ad alias delectus nemo maiores. Consectetur ipsa quod quis. Blanditiis quaerat officiis rerum illum atque odit.
  </>
}

export const styles = {
  pageMaxWidth: "max-w-280",
}


export function Breadcrumb(props: {
  items: {
    label: string,
    href?: string,
  }[]
}) {

  const elements: React.JSX.Element[] = []

  props.items.forEach((item, i) => {
    if (i > 0) {
      elements.push(
        <div key={i + 'b'} className={cns.textFaint()}>
          {'>'}
        </div>
      )
    }
    elements.push(
      item.href !== undefined ?
        <Link key={i + 'a'} href={item.href} className={cns.navigationLink("text-nowrap text-ellipsis overflow-hidden shrink-0")}>
          {item.label}
        </Link> :
        <div key={i + 'a'} className={cns.textMuted("text-nowrap text-ellipsis overflow-hidden min-w-0")}>
          {item.label}
        </div>
    )
  })
  return (
    <div className="col-span-full flex mb-3 gap-3 text-sm">
      {elements}
    </div>
  )
}