import type SearchItem from "./SearchItem"

export default interface SearchGroup {
    group: string
    items: SearchItem[]
}