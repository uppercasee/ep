'use client'

import { CloseButton, Input } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useState } from 'react'

const SearchBox = () => {
  const [value, setValue] = useState('')
  const isMdScreen = useMediaQuery('(max-width: 900px)')
  const isLgScreen = useMediaQuery('(max-width: 1100px)')
  const inputSize = isMdScreen ? '12' : isLgScreen ? '20' : '46'

  return (
    <Input
      visibleFrom="xs"
      inputSize={inputSize}
      placeholder="Search for Courses..."
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSectionPointerEvents="all"
      rightSection={
        value && (
          <CloseButton aria-label="Clear input" onClick={() => setValue('')} />
        )
      }
    />
  )
}

export default SearchBox
