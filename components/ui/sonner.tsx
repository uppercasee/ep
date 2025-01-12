'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      richColors
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: props.richColors
            ? // Removed everything where shadcn+tailwind affected the colors
              // https://github.com/shadcn-ui/ui/issues/2234#issuecomment-2294069038
              'group-[.toaster]:border group-[.toaster]:shadow-lg'
            : 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          closeButton: 'group-[.toaster]:bg-muted group-[.toaster]:border',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
