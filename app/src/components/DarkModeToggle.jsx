import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export function DarkModeToggle() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>
      <Switch id="dark-mode" />
      <Label htmlFor="dark-mode" style={{ color: 'white', fontSize: '16px' }}>
        Dark Mode
      </Label>
    </div>
  )
}
