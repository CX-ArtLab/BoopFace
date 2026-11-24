import { expect, test } from '@playwright/test';

// Eye colors captured from the original local workshop, including the saved
// lavender variant. Both live previews and exported thumbnails must keep them.
// Skin number -> [material key, eye color].
const iceEyes = {
  201:['iceglaze','#304c6e'], 202:['mintice','#3a6458'], 203:['blushice','#643a50'],
  204:['champagneice','#6b5834'], 205:['lavenderice','#304c6e'], 206:['whiteice','#405765'],
};

test('ice skin previews and catalog thumbnails preserve the original eye colors', async ({page}) => {
  for (const [skin, [key, color]] of Object.entries(iceEyes)) {
    await page.goto('/demo/?lang=zh-CN');
    await page.locator('#stageFace').evaluate((face, n) => face.setSkin(n), skin);
    await expect(page.locator(`#stageFace #material-${key}-eye-porcelain stop`).first()).toHaveAttribute('stop-color', color);
  }

  // The Studio's skin tab, "All": every ice card's thumbnail keeps its eye colour.
  await page.goto('/demo/?lang=zh-CN#skins');
  await page.locator('#skinFilters [data-filter="all"]').click();
  for (const [skin, [key, color]] of Object.entries(iceEyes)) {
    const image = page.locator(`#skinGrid .skin-card[data-skin="${skin}"] img`);
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('src', /^blob:/);
    const exportedEye = await image.evaluate(async (img, id) => {
      const svg = new DOMParser().parseFromString(await (await fetch(img.src)).text(), 'image/svg+xml');
      return svg.querySelector(`#material-${id}-eye-porcelain stop`).getAttribute('stop-color');
    }, key);
    expect(exportedEye, `${skin} thumbnail`).toBe(color);
  }
});
