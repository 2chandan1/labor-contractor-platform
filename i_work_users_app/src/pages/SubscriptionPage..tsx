import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SubscriptionPageProps {
  userRole: "labour" | "contractor";
}

const SUBSCRIPTION_AMOUNT = {
  labour: 50, // ₹499.00
  contractor: 50, // ₹999.00
};

export function SubscriptionPage({ userRole }: SubscriptionPageProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Call your backend to create an order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: SUBSCRIPTION_AMOUNT["labour"] }),
      });
      const orderData = await orderResponse.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay Key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your App Name",
        description: `${userRole} subscription`,
        order_id: orderData.id,
        handler: async function (response: any) {
          // 2️⃣ Verify payment on backend
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userMobile") || "",
        },
        theme: { color: "#2563EB" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong with payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Subscribe as {userRole}</h1>
      <p className="mb-6">
        Subscribe for ₹{SUBSCRIPTION_AMOUNT["labour"] } per month.
      </p>
      <button
        onClick={handlePayment}
        className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-500 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
