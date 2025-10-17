
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** a0-project
- **Date:** 2025-10-16
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001
- **Test Name:** Load Home Screen with Categories and Featured Products
- **Test Code:** [TC001_Load_Home_Screen_with_Categories_and_Featured_Products.py](./TC001_Load_Home_Screen_with_Categories_and_Featured_Products.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/ce313703-8282-45d3-9604-c47ca2fea872
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002
- **Test Name:** ProductDetail Shows Accurate Details and Conditional 3D/VR Preview Button
- **Test Code:** [TC002_ProductDetail_Shows_Accurate_Details_and_Conditional_3DVR_Preview_Button.py](./TC002_ProductDetail_Shows_Accurate_Details_and_Conditional_3DVR_Preview_Button.py)
- **Test Error:** The ProductDetail screen shows complete product details for both products tested. However, the 'View in 3D/VR' button is incorrectly visible for the Vintage Office Desk, which should not have a 3D model. This is a failure of the requirement that the 3D/VR preview button only displays if a 3D model exists. Task is now complete.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/f261f493-062a-496b-9130-505874a1c8a2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003
- **Test Name:** 3D/VR Viewer Navigation Back to ProductDetail
- **Test Code:** [TC003_3DVR_Viewer_Navigation_Back_to_ProductDetail.py](./TC003_3DVR_Viewer_Navigation_Back_to_ProductDetail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/5175b1b4-cae4-4143-a1be-59ba8545ce8c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004
- **Test Name:** Add Items to Cart from Home and ProductDetail
- **Test Code:** [TC004_Add_Items_to_Cart_from_Home_and_ProductDetail.py](./TC004_Add_Items_to_Cart_from_Home_and_ProductDetail.py)
- **Test Error:** Add to Cart functionality is broken on both Home and ProductDetail screens. Unable to add items to cart or see cart updates. Stopping test as cart functionality is critical and non-functional.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[ERROR] The action 'NAVIGATE' with payload {"name":"Cart"} was not handled by any navigator.

Do you have a screen named 'Cart'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/cb7fb58c-8aad-42bb-bba8-253ce03b503b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005
- **Test Name:** Modify Items in Cart and Confirm Removal
- **Test Code:** [TC005_Modify_Items_in_Cart_and_Confirm_Removal.py](./TC005_Modify_Items_in_Cart_and_Confirm_Removal.py)
- **Test Error:** Tested updating quantities successfully with server update and total recalculation. However, removing an item from the cart does not work as expected: clicking remove does not prompt confirmation or remove the item. Reporting this issue and stopping further testing.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/cart_items?on_conflict=user_id%2Cproduct_id&select=id%2Cuser_id%2Cproduct_id%2Cquantity:0:0)
[ERROR] Error adding item to cart: {code: 42703, details: null, hint: null, message: record "new" has no field "updated_at"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155994:14)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/4e4bad29-4f40-4402-ae7e-a3ab8d64e2b2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006
- **Test Name:** Checkout with Valid Shipping Info and Cash on Delivery
- **Test Code:** [TC006_Checkout_with_Valid_Shipping_Info_and_Cash_on_Delivery.py](./TC006_Checkout_with_Valid_Shipping_Info_and_Cash_on_Delivery.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/6c94e240-28fe-4076-83ca-fb5398bea489
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007
- **Test Name:** Checkout Validation with Invalid or Missing Shipping Info
- **Test Code:** [TC007_Checkout_Validation_with_Invalid_or_Missing_Shipping_Info.py](./TC007_Checkout_Validation_with_Invalid_or_Missing_Shipping_Info.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/84c99e25-9126-4576-9dbe-835f1d18adde
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008
- **Test Name:** Profile Displays Environmental Metrics and Order History
- **Test Code:** [TC008_Profile_Displays_Environmental_Metrics_and_Order_History.py](./TC008_Profile_Displays_Environmental_Metrics_and_Order_History.py)
- **Test Error:** The Profile screen correctly shows user-specific environmental impact metrics and a list of past orders with details such as order number, date, item count, price, and status. However, clicking on an order does not display the order details as expected, indicating a functionality issue. This issue prevents full verification of the task. Reporting this issue and stopping further testing.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/c7a1cd86-dcb0-44e9-b8df-d5ff379f3d46
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009
- **Test Name:** User Creates a Furniture Listing with Photo Upload
- **Test Code:** [TC009_User_Creates_a_Furniture_Listing_with_Photo_Upload.py](./TC009_User_Creates_a_Furniture_Listing_with_Photo_Upload.py)
- **Test Error:** Testing stopped due to broken photo upload functionality on Sell Your Furniture screen. Both Gallery and Camera buttons do not trigger any photo upload interface, blocking listing submission. Issue reported for developer investigation.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/bee1cb04-ac0a-42e0-ae5c-75ab33a659b2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010
- **Test Name:** Admin Dashboard Displays Accurate Stats and Recent Activity
- **Test Code:** [TC010_Admin_Dashboard_Displays_Accurate_Stats_and_Recent_Activity.py](./TC010_Admin_Dashboard_Displays_Accurate_Stats_and_Recent_Activity.py)
- **Test Error:** Navigation to Admin Dashboard is broken. The Admin Dashboard link on the Profile page does not work, and direct URL access to /admin loads the Profile page instead. Cannot verify aggregate statistics or recent user activity as required. Stopping further actions.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] The action 'NAVIGATE' with payload {"name":"AdminDashboard"} was not handled by any navigator.

Do you have a screen named 'AdminDashboard'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
[ERROR] The action 'NAVIGATE' with payload {"name":"AdminDashboard"} was not handled by any navigator.

Do you have a screen named 'AdminDashboard'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/7c2833c0-9d14-404a-8284-43449085af65
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011
- **Test Name:** Admin Order Management: Update Order Status and Cancel Orders
- **Test Code:** [TC011_Admin_Order_Management_Update_Order_Status_and_Cancel_Orders.py](./TC011_Admin_Order_Management_Update_Order_Status_and_Cancel_Orders.py)
- **Test Error:** Testing stopped due to critical navigation issue. The 'Manage Orders' link in the Admin Panel does not lead to the Admin Order Management screen but redirects to an unrelated page. Unable to proceed with order viewing, status updates, or cancellations. Please fix this issue to enable further testing.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] The action 'NAVIGATE' with payload {"name":"AdminDashboard"} was not handled by any navigator.

Do you have a screen named 'AdminDashboard'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/e9e76529-05ee-43ac-8f8c-2cd8f9e916b3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012
- **Test Name:** Admin Listings Management: Approve and Reject User Listings
- **Test Code:** [TC012_Admin_Listings_Management_Approve_and_Reject_User_Listings.py](./TC012_Admin_Listings_Management_Approve_and_Reject_User_Listings.py)
- **Test Error:** Admin users can log in and view pending furniture listings, but there are no interactive elements to approve or reject these listings on the Admin Listings Management screen or profile page. The status updates for approval or rejection cannot be tested due to missing or non-functional UI controls. Recommend reporting this issue to the development team for resolution.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] The action 'NAVIGATE' with payload {"name":"AdminListingsManagement"} was not handled by any navigator.

Do you have a screen named 'AdminListingsManagement'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
[ERROR] The action 'NAVIGATE' with payload {"name":"Home"} was not handled by any navigator.

Do you have a screen named 'Home'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/f0d16a8f-bfe2-4278-9948-70d169040174
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013
- **Test Name:** Authentication Flow Success and Session Management
- **Test Code:** [TC013_Authentication_Flow_Success_and_Session_Management.py](./TC013_Authentication_Flow_Success_and_Session_Management.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/8d37cea4-ccf2-4ba2-858a-cc8276ed81c3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014
- **Test Name:** Authentication Flow Error Handling: Login with Invalid Credentials
- **Test Code:** [TC014_Authentication_Flow_Error_Handling_Login_with_Invalid_Credentials.py](./TC014_Authentication_Flow_Error_Handling_Login_with_Invalid_Credentials.py)
- **Test Error:** Login attempt with invalid credentials was not rejected as expected. No error message was displayed and the user was redirected to the main page. This is a critical issue in the login functionality that needs to be fixed.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/46c782cc-83dc-4cbe-a647-5b7c6c063c24
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015
- **Test Name:** Admin Access Restriction Based on Email Allowlist
- **Test Code:** [TC015_Admin_Access_Restriction_Based_on_Email_Allowlist.py](./TC015_Admin_Access_Restriction_Based_on_Email_Allowlist.py)
- **Test Error:** Reported the issue with the Admin Dashboard link not navigating as expected. Task to verify admin allowlist access and restriction for non-admin users cannot be fully completed due to this issue.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] The action 'NAVIGATE' with payload {"name":"AdminDashboard"} was not handled by any navigator.

Do you have a screen named 'AdminDashboard'?

If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

If you're using conditional rendering, navigation will happen automatically and you shouldn't navigate manually, see.

This is a development-only warning and won't be shown in production. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:46714:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/91f51563-6d0b-4f60-bb3c-90e2c1bf7e06
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016
- **Test Name:** Security Enforcement via Supabase Row Level Security (RLS)
- **Test Code:** [TC016_Security_Enforcement_via_Supabase_Row_Level_Security_RLS.py](./TC016_Security_Enforcement_via_Supabase_Row_Level_Security_RLS.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/70c47b4d-8a2c-4215-bd10-cbd8e8604a37
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017
- **Test Name:** Cart Persistence Across Sessions
- **Test Code:** [TC017_Cart_Persistence_Across_Sessions.py](./TC017_Cart_Persistence_Across_Sessions.py)
- **Test Error:** Test completed. Cart contents did not persist after logout and re-login, indicating failure in server-side cart persistence. Issue reported.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/cart_items?on_conflict=user_id%2Cproduct_id&select=id%2Cuser_id%2Cproduct_id%2Cquantity:0:0)
[ERROR] Error adding item to cart: {code: 42703, details: null, hint: null, message: record "new" has no field "updated_at"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155994:14)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/e1e88766-3208-4293-aac6-91a57e972e9b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018
- **Test Name:** UI Accessibility Checks for Key Screens
- **Test Code:** [TC018_UI_Accessibility_Checks_for_Key_Screens.py](./TC018_UI_Accessibility_Checks_for_Key_Screens.py)
- **Test Error:** Accessibility verification summary: 
- Home screen: All key UI elements have accessibility labels and ARIA attributes. Focus order is logical. Color contrast verification not possible due to missing CSS data.
- ProductDetail screen: Navigation links have labels, but 'Buy Now' button lacks an explicit accessibility label. Focus order is logical. Color contrast verification not possible.
- Cart screen: All interactive elements including product images, buttons, and navigation links have appropriate accessibility labels. Focus order and color contrast verified visually.
- Checkout screen: Payment method, order summary, and Place Order button have accessibility labels. Shipping detail form inputs lack explicit accessibility labels. Focus order is logical. Color contrast verification not possible.
- Profile and Admin screens were not checked due to task constraints.

Overall, the application has good accessibility support on the checked screens, with minor gaps in labeling and limited color contrast verification due to missing style data. Further testing on Profile and Admin screens and improved CSS availability for contrast checks is recommended.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Allow attribute will take precedence over 'allowfullscreen'. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:12768:0)
[WARNING] [GroupMarkerNotSet(crbug.com/242999)!:A0ECDB0014000000]Automatic fallback to software WebGL has been deprecated. Please use the --enable-unsafe-swiftshader flag to opt in to lower security guarantees for trusted content. (at https://sketchfab.com/models/18b45eaaea4c4d1dab1b0228cb3a4ced/embed?autostart=1&ui_controls=1&ui_infos=0&ui_watermark=0&ui_stop=0&preload=1:1033:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/c5793df2-4757-4f8f-bdfe-961feed115eb
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019
- **Test Name:** Error Handling When Image Upload Fails During Listing Creation
- **Test Code:** [TC019_Error_Handling_When_Image_Upload_Fails_During_Listing_Creation.py](./TC019_Error_Handling_When_Image_Upload_Fails_During_Listing_Creation.py)
- **Test Error:** Image upload failure simulation could not be performed because the 'Gallery' button does not initiate any upload process. Therefore, error notification and form integrity verification could not be completed. Reporting this issue and stopping the task.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/47fbaeeb-9d8f-4af3-a476-dba08ab3a113
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020
- **Test Name:** Order Success Screen Navigation Options Verification
- **Test Code:** [TC020_Order_Success_Screen_Navigation_Options_Verification.py](./TC020_Order_Success_Screen_Navigation_Options_Verification.py)
- **Test Error:** Reported the 'Add to Cart' functionality issue preventing order placement. Cannot proceed with testing OrderSuccess screen or navigation. Task stopped.
Browser Console Logs:
[WARNING] Require cycle: App.tsx -> screens\HomeScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] "shadow*" style props are deprecated. Use "boxShadow". (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[WARNING] Require cycle: App.tsx -> screens\ProductDetailScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CartScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\CheckoutScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\ProfileScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\SellFurnitureScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\LoginScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminDashboardScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminOrderManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] Require cycle: App.tsx -> screens\AdminListingsManagementScreen.tsx -> App.tsx

Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:112:18)
[WARNING] props.pointerEvents is deprecated. Use style.pointerEvents (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/user_profiles?select=id%2Ctotal_trees_saved%2Ctotal_carbon_reduced%2Ctotal_waste_diverted&id=eq.undefined:0:0)
[ERROR] Error fetching user impact: {code: 22P02, details: null, hint: null, message: invalid input syntax for type uuid: "undefined"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155924:14)
[WARNING] Image: style.resizeMode is deprecated. Please use props.resizeMode. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:41172:14)
[ERROR] Failed to load resource: the server responded with a status of 400 () (at https://ahklrtnidiriqrgfoehq.supabase.co/rest/v1/cart_items?on_conflict=user_id%2Cproduct_id&select=id%2Cuser_id%2Cproduct_id%2Cquantity:0:0)
[ERROR] Error adding item to cart: {code: 42703, details: null, hint: null, message: record "new" has no field "updated_at"} (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:155994:14)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
[WARNING] [Reanimated] Couldn't load entering/exiting animation. Current version supports only predefined animations with modifiers: duration, delay, easing, randomizeDelay, withCallback, reducedMotion. (at http://localhost:8081/index.ts.bundle?platform=web&dev=true&hot=false&transform.engine=hermes&transform.routerRoot=app&unstable_transformProfile=hermes-stable:83382:18)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/7d68114e-333b-48c3-b51f-3f5cb53935b6/048e64a5-2a24-44e1-9d1c-fdefc18ad18b
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **30.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---