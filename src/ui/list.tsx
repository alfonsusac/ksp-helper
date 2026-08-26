import { cns } from "@/design-system"

export function CitationList(props: {
  title: string,
  author?: string,
  href: string,
}) {
  return (
    <li className="my-2">
      <span className="">{props.title}</span>
      {props.author ? <span className={cns.textMuted()}> by {props.author}</span> : ""}<br />
      <a className={cns.articleLink("break-all")}
        href={props.href}
        target="_blank"
      >{props.href}</a>
    </li>
  )
}