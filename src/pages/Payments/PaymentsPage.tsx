// src/pages/Payments/PaymentsPage.tsx 
//Remember folders under "pages start with upper case

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


