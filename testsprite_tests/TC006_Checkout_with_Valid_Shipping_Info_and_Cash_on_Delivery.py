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
        # Input email and password, then click Log In button to authenticate user.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div[2]/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('thammikt@gmail.com')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div[2]/div[3]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('123123')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div[2]/div[5]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Add first product (Vintage Leather Sofa) to cart and then go to Cart page.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[6]/div[2]/div[4]/div[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Try adding 'Reclaimed Wood Bookshelf' to cart by clicking its 'Add to Cart' button.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[8]/div[2]/div[4]/div[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click on Cart tab to view cart contents and proceed to checkout.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click 'Proceed to Checkout' button to go to the checkout screen.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div/div/div/div/div[4]/div[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Fill shipping details with valid information and click 'Place Order (COD)' button.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Thammikt Aung')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('1234567890')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/input[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('123 Green Street')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/div[2]/input').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Yangon')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/div[2]/input[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('Yangon Region')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[2]/div/div/input[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.fill('11011')
        

        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[3]/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Navigate to Profile tab to check if cart is cleared or any user order history is visible for verification.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div/div[3]/div/div[4]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Click on 'Profile' tab to check cart clearing and order history for verification.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div[4]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Verify cart is cleared server-side by checking cart icon or cart page for zero items.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Confirm navigation to OrderSuccess screen with confirmation message to complete the final assertion.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div[4]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Verify navigation to OrderSuccess screen with confirmation message to complete final assertion.
        frame = context.pages[-1]
        elem = frame.locator('xpath=html/body/div/div/div[2]/div[3]/div[2]/div/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # Assert that the cart is cleared server-side after order creation
        assert 'empty' == page_content['cart']['status'], "Cart is not cleared after order creation"
          
        # Assert that an order is created in the backend with expected properties
        assert len(page_content['orders']) > 0, "No orders found in backend after order creation"
        latest_order = page_content['orders'][0]  # Assuming the latest order is at index 0
        assert latest_order['itemsCount'] > 0, "Order items count should be greater than 0"
        assert latest_order['status'] == 'pending', "Order status should be 'pending'"
          
        # Assert navigation to OrderSuccess screen by checking for confirmation message presence
        confirmation_message_locator = frame.locator("text=Order placed successfully")
        assert await confirmation_message_locator.is_visible(), "Order success confirmation message not visible"
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    