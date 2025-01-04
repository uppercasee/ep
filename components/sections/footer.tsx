'use client'

import { Anchor, Container, Group } from '@mantine/core'
import classes from './footer.module.css'

const links = [
  { link: '/about', label: 'About Us' },
  { link: '/terms', label: 'Terms of Service' },
  { link: '/privacy', label: 'Privacy Policy' },
  { link: '/contact', label: 'Contact' },
]

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <Container size={'xl'} className={classes.inner}>
        <div>Study With Us</div>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  )
}
