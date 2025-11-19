// src/pages/Payments/PaymentsPage.tsx 
//Remember folders under "pages start with upper case

import { useState } from "react"; // we import useState because later we will probably need to track filters
// selected rows, UI changes, etc. Even if we don’t use it yet, this page
// normally needs some local state for payments (status filter, search, etc.)

// simple union type so the status can only be these 3 strings,
//  do not get scared , this is only to avoid typos like "pendng" and makes the flow safer.
type PaymentStatus = "Paid" | "Pending" | "Overdue";

// Just the main payments page layout
function PaymentsPage() {

  return (
    // whole page background + makes page take full height
    <div className="min-h-screen bg-slate-50">

      {/* centers the content and keeps it at a nice width */}
      <div className="mx-auto max-w-6xl px-6 py-6">

        {/* main title of the page */}
        <h1 className="text-2xl font-semibold tracking-tight">
          Payments
        </h1>

        {/* quick description of what this section is about */}
        <p className="text-sm text-muted-foreground">
          Manage and review all payments.
        </p>
      </div>
    </div>
  );
}

//ensaladini estuvo aqui
export default PaymentsPage;


