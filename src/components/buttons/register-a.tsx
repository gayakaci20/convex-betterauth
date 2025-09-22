import { Button } from "@/components/ui/button"

interface RegisterButtonProps {
  onClick?: () => void
  disabled?: boolean
  children?: React.ReactNode
}

export default function RegisterButton2({ onClick, disabled, children }: RegisterButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled} className="w-full">
      {children || "Register"}
    </Button>
  )
}
