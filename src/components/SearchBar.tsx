import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./ui/input-group"

type SearchBarProps = {
  onSearch?: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  onSearch,
  placeholder = "Search...",
  className,
}: SearchBarProps) {
  return (
    <InputGroup className={className}>
      <InputGroupInput
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
