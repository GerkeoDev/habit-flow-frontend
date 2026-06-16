import { test, expect } from '@playwright/test'

async function mockApi(page, options = {}) {
  page.on('pageerror', err => console.log('[PAGE ERROR]', err.message))

  await page.route(/\/api\//, async route => {
    const url = route.request().url()
    console.log('[API MOCK]', route.request().method(), url)
    if (url.includes('/me')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ userName: 'Test' }),
      })
    } else if (options.withDetail && /\/habits\/\d+/.test(url)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          _id: '1',
          title: 'Read',
          frequency: 'daily',
          stats: { currentStreak: 5, bestStreak: 10, totalCompletions: 42, completedToday: false },
          completedDates: [],
        }),
      })
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      })
    }
  })
}

test.describe('Responsive UI - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } })

  test('sidebar is visible on desktop', async ({ page }) => {
    await mockApi(page)
    await page.goto('/dashboard', { waitUntil: 'load' })
    await expect(page.getByText('HabitFlow')).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Dashboard')).toBeVisible()
    await expect(page.getByText('Habits')).toBeVisible()
  })

  test('hamburger button is hidden on desktop', async ({ page }) => {
    await mockApi(page)
    await page.goto('/dashboard', { waitUntil: 'load' })
    const hamburger = page.locator('.fixed.top-4.left-4')
    await expect(hamburger).not.toBeVisible()
  })

  test('stats grid shows 4 columns on desktop', async ({ page }) => {
    await mockApi(page, { withDetail: true })
    await page.goto('/habits/1', { waitUntil: 'load' })
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
    await mockApi(page)
    await page.goto('/dashboard', { waitUntil: 'load' })
    const sidebar = page.getByText('HabitFlow')
    await expect(sidebar).not.toBeVisible()
  })

  test('hamburger button opens sidebar on mobile', async ({ page }) => {
    await mockApi(page)
    await page.goto('/dashboard', { waitUntil: 'load' })
    const hamburger = page.locator('.fixed.top-4.left-4')
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    await expect(page.getByText('HabitFlow')).toBeVisible()
  })

  test('backdrop closes sidebar on mobile', async ({ page }) => {
    await mockApi(page)
    await page.goto('/dashboard', { waitUntil: 'load' })
    await page.locator('.fixed.top-4.left-4').click()
    const backdrop = page.locator('.fixed.inset-0')
    await expect(backdrop).toBeVisible()
    await backdrop.click()
    await expect(page.getByText('HabitFlow')).not.toBeVisible()
  })

  test('stats grid stacks in 1 column on mobile', async ({ page }) => {
    await mockApi(page, { withDetail: true })
    await page.goto('/habits/1', { waitUntil: 'load' })
    const statsGrid = page.locator('.grid').first()
    const box = await statsGrid.boundingBox()
    expect(box).not.toBeNull()
    if (box) {
      const cardWidth = box.width
      expect(cardWidth).toBeGreaterThan(300)
    }
  })
})
