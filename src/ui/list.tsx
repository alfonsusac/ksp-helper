export function CitationList(props: {
  title: string,
  author?: string,
  href: string,
}) {
  return (
    <li>
      <span className="text-slate-700">{props.title}</span>{props.author ? <span className="text-slate-500"> by {props.author}</span> : ""}<br />
      <a className="text-slate-400/75 underline underline-offset-3 decoration-slate-300 hover:text-slate-400 hover:decoration-slate-400 break-all" href={props.href} target="_blank">{props.href}</a>
    </li>
  )
}