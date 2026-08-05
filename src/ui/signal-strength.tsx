import { cns } from "@/design-system"
import { Divider, SignalSymbol } from "./common"
import { cn } from "./cn"
import { getScienceBonusfromSignalStrength } from "@/lib/antenna"

export default function SignalStrengthItems(props: {
  strength: number,
  size?: "sm",
  className?: string,
}) {
  const scienceBonus = getScienceBonusfromSignalStrength(props.strength)
  const sm = props.size === "sm"

  return (
    <>
      <div className="flex items-center gap-2">
        <SignalSymbol strength={props.strength} className={cn(
          sm && "size-3"
        )} />
        {strengthNum(props.strength)}
      </div>
      <Divider className={cns.dividerStrong()} />
      <div className="flex items-center gap-2">
        <SignalSymbol barClassname={cns.bgScience()} className={cn(
          sm && "size-3"
        )} />
        <div className={cns.textScience("text-[0.9em]")}>
          +{scienceBonus?.bonus}%
        </div>
      </div>
    </>
  )
}

export function strengthNum(n: number) {
  return Math.round(n * 100) + '%'
}