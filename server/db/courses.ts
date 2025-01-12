'use server'

import { db } from '@/drizzle/db'
import { CoursesTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

interface updateTitleProps {
  title: string
  courseId: string
}

export async function updateTitle({ title, courseId }: updateTitleProps) {
  if (!title || !courseId) {
    throw new Error('Title and courseId are required.')
  }

  try {
    const result = await db
      .update(CoursesTable)
      .set({ title: title })
      .where(eq(CoursesTable.id, courseId))
      .execute()

    if (result.rowCount === 0) {
      throw new Error('No course found with the provided ID.')
    }

    return title
  } catch (error) {
    console.error('Error updating course title:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update title.'
    )
  }
}

interface updateDescProps {
  desc: string
  courseId: string
}

export async function updateDesc({ desc, courseId }: updateDescProps) {
  if (!desc || !courseId) {
    throw new Error('Title and courseId are required.')
  }

  try {
    const result = await db
      .update(CoursesTable)
      .set({ description: desc })
      .where(eq(CoursesTable.id, courseId))
      .execute()

    if (result.rowCount === 0) {
      throw new Error('No course found with the provided ID.')
    }

    return desc
  } catch (error) {
    console.error('Error updating course description:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update description.'
    )
  }
}

interface updateThumbUrlProps {
  url: string
  courseId: string
}

export async function updateThumbUrl({ url, courseId }: updateThumbUrlProps) {
  if (!url || !courseId) {
    throw new Error('Url and courseId are required.')
  }

  try {
    const result = await db
      .update(CoursesTable)
      .set({ thumbnailUrl: url })
      .where(eq(CoursesTable.id, courseId))
      .execute()

    if (result.rowCount === 0) {
      throw new Error('No course found with the provided ID.')
    }

    return url
  } catch (error) {
    console.error('Error updating course thubmnail url:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update thubmnail url.'
    )
  }
}

interface updateTagsProps {
  tags: string[]
  courseId: string
}

export async function updateTags({ tags, courseId }: updateTagsProps) {
  if (!tags || !courseId) {
    throw new Error('Tags and courseId are required.')
  }

  try {
    const result = await db
      .update(CoursesTable)
      .set({ tags: tags })
      .where(eq(CoursesTable.id, courseId))
      .execute()

    if (result.rowCount === 0) {
      throw new Error('No course found with the provided ID.')
    }

    return tags
  } catch (error) {
    console.error('Error updating course description:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update description.'
    )
  }
}

interface updatePriceProps {
  price: number
  courseId: string
}

export async function updatePrice({ price, courseId }: updatePriceProps) {
  if (!price || !courseId) {
    throw new Error('Price and courseId are required.')
  }

  try {
    const result = await db
      .update(CoursesTable)
      .set({ price: price })
      .where(eq(CoursesTable.id, courseId))
      .execute()

    if (result.rowCount === 0) {
      throw new Error('No course found with the provided ID.')
    }

    return price
  } catch (error) {
    console.error('Error updating course price:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update price.'
    )
  }
}

interface updateCategoryProps {
  category: string
  courseId: string
}

export async function updateCategory({
  category,
  courseId,
}: updateCategoryProps) {
  if (!category || !courseId) {
    throw new Error('Category and courseId are required.')
  }

  try {
    const result = await db
      .update(CoursesTable)
      .set({ category: category })
      .where(eq(CoursesTable.id, courseId))
      .execute()

    if (result.rowCount === 0) {
      throw new Error('No course found with the provided ID.')
    }

    return category
  } catch (error) {
    console.error('Error updating course category:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to update category.'
    )
  }
}
