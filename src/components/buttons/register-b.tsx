import { Button } from "@/components/ui/button"

interface CreateAccountButtonProps {
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export default function CreateAccountButton({ onClick, disabled, children }: CreateAccountButtonProps) {
  return (
    <Button variant="outline" onClick={onClick} disabled={disabled} className="w-full">
      {children || "Create account"}
    </Button>
  )
}
