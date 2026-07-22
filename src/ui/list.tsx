import { cns } from "@/design-system"

export function CitationList(props: {
  title: string,
  author?: string,
  href: string,
}) {
  return (
    <li className="my-2">
      <span className="">{props.title}</span>
      {props.author ? <span className={cns.text.muted()}> by {props.author}</span> : ""}<br />
      <a className={cns.text.link("break-all")}
        href={props.href}
        target="_blank"
      >{props.href}</a>
    </li>
  )
}