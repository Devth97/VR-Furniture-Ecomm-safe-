import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer";

serve(async (req) => {
  const { record } = await req.json();

  // record is expected to be an order row: { id, user_id, total_amount, ... }
  const orderId = record?.id;
  const userId = record?.user_id;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
    return new Response("Server misconfigured", { status: 500 });
  }

  const sb = createClient(supabaseUrl, serviceRoleKey);

  // Fetch user email using Admin API
  let email = "";
  try {
    const { data, error } = await sb.auth.admin.getUserById(userId);
    if (error) throw error;
    email = data.user?.email || "";
  } catch (e) {
    console.error("Failed to fetch user email", e);
  }

  // Fetch order items with product details
  let orderItems: Array<{ name: string; price: number; quantity: number }>= [];
  let total = record?.total_amount ?? 0;
  try {
    const { data, error } = await sb
      .from('order_items')
      .select('quantity, price, product:products(name, price)')
      .eq('order_id', orderId);
    if (error) throw error;
    orderItems = (data || []).map((row: any) => ({
      name: row.product?.name ?? 'Item',
      price: row.price ?? row.product?.price ?? 0,
      quantity: row.quantity ?? 1,
    }));
    if (!total) {
      total = orderItems.reduce((s, it) => s + (it.price * it.quantity), 0);
    }
  } catch (e) {
    console.error("Failed to fetch order items", e);
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: Deno.env.get("EMAIL_USER"),
      pass: Deno.env.get("EMAIL_PASS"),
    },
  });

  const mailOptions = {
    from: `"VRE Furniture" <${Deno.env.get("EMAIL_USER")}>`,
    to: email,
    subject: "Your VRE Furniture Order Confirmation",
    html: `
      <h2>Order Confirmation</h2>
      <p>Dear Customer,</p>
      <p>Thank you for shopping with <b>VRE Furniture</b>!</p>
      <p>Your order has been successfully placed.</p>
      <h3>Order Details:</h3>
      <ul>
        ${orderItems.map((item) => `<li>${item.quantity} × ${item.name} - ₹${item.price}</li>`).join('')}
      </ul>
      <p><b>Total:</b> ₹${total}</p>
      <p>We’ll notify you when it’s shipped!</p>
      <br/>
      <p>Warm regards,</p>
      <p><b>Team VRE Furniture</b></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending mail:", error);
    return new Response("Error sending mail", { status: 500 });
  }
});


