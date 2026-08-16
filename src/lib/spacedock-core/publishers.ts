import { spacedockApi, type ModList } from "./spacedock"

export type PublisherInfo = { // publisher_inf()
  id: number
  name: string
  short_description: null
  description: null
  created: null
  background: null
  bg_offset_x: null
  bg_offset_y: null
  link: null
}

export const SpacedockPublishers = {
  getPublishers,
}

function getPublishers() {
  return spacedockApi("/api/publishers")<[ 200, PublisherInfo ]>()
}

// https://discord.com/channels/603643254759489555/763685596556165121/1536804836769661049
// "@VITAS did an import at one point of a database of like every game ever made. There are tons of inactive ones in SpaceDock's backend."
