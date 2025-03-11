// components/ui/visually-hidden.tsx
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="sr-only">{children}</span>
)

export { VisuallyHidden }
