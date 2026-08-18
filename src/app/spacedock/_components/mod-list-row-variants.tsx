import { getFeaturedMods, getNewMods, getTopMods } from "../_data-cache/get-mods-lists"
import { ModListRow } from "./mod-list-row"


export function FeaturedModSection(props: {
  maxWidth: string,
  gameid?: number,
  // shown in homepage and game details so might need to be hidden
  showGameLabel?: boolean
  showUpdatedAt?: boolean,
}) {
  return <ModListRow
    maxWidth={props.maxWidth}
    title="Featured"
    emptyLabel="Nothing featured yet"
    seeMore={{
      href: props.gameid ? `/spacedocks/${ props.gameid }/featured` : `/spacedocks/featured`,
      label: "See all featured mods"
    }}
    data={getFeaturedMods({ game_id: props.gameid, trim: 8 })}
    showGameLabel={props.showGameLabel}
    showUpdatedAt={props.showUpdatedAt}
  />
}


export function TopModSection(props: {
  maxWidth: string,
  // gameid?: number, // not viable to get top mod because we have to index the entire mod...
  showGameLabel?: boolean
  showUpdatedAt?: boolean,
}) {
  return <ModListRow
    maxWidth={props.maxWidth}
    title="Most Popular"
    emptyLabel="No popular mods"
    seeMore={{
      href: `/spacedocks/featured`,
      label: "See all popular mods"
    }}
    data={getTopMods({ trim: 8 })}
    showGameLabel={props.showGameLabel}
    showUpdatedAt={props.showUpdatedAt}
  />
}


export function NewestModSection(props: {
  maxWidth: string,
  gameid?: number,
  showGameLabel?: boolean
  showUpdatedAt?: boolean,
}) {
  return <ModListRow
    maxWidth={props.maxWidth}
    title="Newest Mods"
    emptyLabel="No new mods"
    seeMore={{
      href: props.gameid ? `/spacedocks/${ props.gameid }/new` : `/spacedocks/new`,
      label: "See all newly added mods"
    }}
    data={getNewMods({ trim: 8, game_id: props.gameid }).then(e => e.result)}
    showGameLabel={props.showGameLabel}
    showUpdatedAt={props.showUpdatedAt}
  />
}


export function RecentlyUpdatedModSection(props: {
  maxWidth: string,
  gameid?: number,
  showGameLabel?: boolean
  showUpdatedAt?: boolean,
}) {
  return <ModListRow
    maxWidth={props.maxWidth}
    title="RecentlyUpdatedModSection"
    emptyLabel="No recently updated mods"
    seeMore={{
      href: props.gameid ? `/spacedocks/${ props.gameid }/updated` : `/spacedocks/updated`,
      label: "See all recently updated mods"
    }}
    data={getNewMods({ trim: 8, game_id: props.gameid }).then(e => e.result)}
    showGameLabel={props.showGameLabel}
    showUpdatedAt={props.showUpdatedAt}
  />
}






export function TestModSection() {
  return <ModListRow
    maxWidth={""}
    title="Test Row"
    emptyLabel="No new mods"
    seeMore={{
      href: "",
      label: ""
    }}
    data={new Promise(res => setTimeout(() => res([]), 5000))}
  />
}