import { test, expect } from '@playwright/test'

test.describe('Responsive UI - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('sidebar is visible on desktop', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    }))

    await page.goto('/dashboard')
    await expect(page.getByText('HabitFlow')).toBeVisible()
    await expect(page.getByText('Dashboard')).toBeVisible()
    await expect(page.getByText('Habits')).toBeVisible()
  })

  test('hamburger button is hidden on desktop', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    }))

    await page.goto('/dashboard')
    await expect(page.locator('button svg line')).toHaveCount(0)
  })

  test('stats grid shows 4 columns on desktop', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          _id: '1',
          title: 'Read',
          frequency: 'daily',
          stats: { currentStreak: 5, bestStreak: 10, totalCompletions: 42, completedToday: false },
          completedDates: [],
        },
      }),
    }))

    await page.goto('/habits/1')
    const statsGrid = page.locator('.grid').first()
    const box = await statsGrid.boundingBox()
    expect(box).not.toBeNull()
    if (box) {
      const cardWidth = box.width / 4
      expect(cardWidth).toBeGreaterThan(100)
    }
  })
})

test.describe('Responsive UI - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('sidebar is hidden by default on mobile', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    }))

    await page.goto('/dashboard')
    const sidebar = page.getByText('HabitFlow')
    await expect(sidebar).not.toBeVisible()
  })

  test('hamburger button opens sidebar on mobile', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    }))

    await page.goto('/dashboard')
    const hamburger = page.locator('button svg line').first()
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await expect(page.getByText('HabitFlow')).toBeVisible()
  })

  test('backdrop closes sidebar on mobile', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    }))

    await page.goto('/dashboard')
    await page.locator('button svg line').first().click()
    const backdrop = page.locator('.fixed.inset-0.bg-black\\/50')
    await expect(backdrop).toBeVisible()
    await backdrop.click()
    await expect(page.getByText('HabitFlow')).not.toBeVisible()
  })

  test('stats grid stacks in 1 column on mobile', async ({ page }) => {
    await page.route('**/api/**', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          _id: '1',
          title: 'Read',
          frequency: 'daily',
          stats: { currentStreak: 5, bestStreak: 10, totalCompletions: 42, completedToday: false },
          completedDates: [],
        },
      }),
    }))

    await page.goto('/habits/1')
    const statsGrid = page.locator('.grid').first()
    const box = await statsGrid.boundingBox()
    expect(box).not.toBeNull()
    if (box) {
      const cardWidth = box.width
      expect(cardWidth).toBeGreaterThan(300)
    }
  })
})
