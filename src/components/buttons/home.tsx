import { Button } from "@/components/ui/button"

interface BackToHomeButtonProps {
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export default function BackToHomeButton({ onClick, disabled, children }: BackToHomeButtonProps) {
  return (
    <Button variant="outline" onClick={onClick} disabled={disabled} className="w-full">
      {children || "Back to home"}
    </Button>
  )
}
