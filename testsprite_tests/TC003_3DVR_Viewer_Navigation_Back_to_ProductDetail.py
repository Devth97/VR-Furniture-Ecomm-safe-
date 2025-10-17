import asyncio
from playwright import async_api

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:8081", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # Input email and password, then click Log In button.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div[2]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('thammikt@gmail.com')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div[2]/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('123123')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div[2]/div[5]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the 'View in VR' button on the first product to open the Sketchfab 3D/VR viewer.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[6]/div[2]/div[4]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the back navigation control within the VRView screen to return to the ProductDetail screen and verify product data is preserved.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Restart the test by navigating to the home page, then open a product with a 3D/VR model and test the full flow again to verify the Sketchfab viewer loads and back navigation works correctly.
        await page.goto('http://localhost:8081', timeout=10000)
        

        # Click the 'View in VR' button on the first featured product to open the Sketchfab 3D/VR viewer.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[6]/div[2]/div[4]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the back navigation control (Home tab) to return to the ProductDetail screen and verify product data is preserved.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the 'View in VR' button on the first product (Vintage Leather Sofa) to open the Sketchfab 3D/VR viewer.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[6]/div[2]/div[4]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the Home tab navigation control to return to the ProductDetail screen and verify product data is preserved.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the 'View in VR' button on the first product (Vintage Leather Sofa) to open the Sketchfab 3D/VR viewer.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[6]/div[2]/div[4]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the Home tab navigation control to return to the ProductDetail screen and verify product data is preserved.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the 'View in VR' button on the first product (Vintage Leather Sofa) to open the Sketchfab 3D/VR viewer.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[6]/div[2]/div[4]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click the Home tab navigation control to return to the ProductDetail screen and verify product data is preserved.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Assert that the Sketchfab 3D/VR viewer iframe is visible and loaded correctly after clicking 'View in VR' button.
        viewer_iframe = frame.locator('iframe[src*="sketchfab.com"]')
        await viewer_iframe.wait_for(state='visible', timeout=10000)
        assert await viewer_iframe.is_visible(), "Sketchfab 3D/VR viewer iframe is not visible."
        # Assert that after clicking back navigation control, the ProductDetail screen is displayed with the correct product name.
        product_name_locator = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[1]/div[1]/h1')
        await product_name_locator.wait_for(state='visible', timeout=5000)
        product_name_text = await product_name_locator.text_content()
        assert 'Vintage Leather Sofa' in product_name_text, f"Expected product name 'Vintage Leather Sofa' but got {product_name_text}"
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    