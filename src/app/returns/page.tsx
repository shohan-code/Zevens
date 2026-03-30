export default function ReturnsPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-heading font-black italic uppercase tracking-tighter mb-12">
            Return <span className="text-accent">Policy.</span>
        </h1>
        
        <div className="space-y-10 text-secondary leading-relaxed font-bold text-sm uppercase tracking-wider">
            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">01. Standard Returns</h3>
                <p>
                    We want you to be completely satisfied with your Zevens purchase. If for any reason you are not happy with your order, you can return it within 7 days of delivery.
                </p>
                <p className="mt-4">
                    The item must be in its original condition, unworn, and with all tags and packaging intact.
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">02. Exceptions</h3>
                <p>
                    Please note that customized or pre-ordered items may have specific return conditions. We do not accept returns for items that show clear signs of wear or damage after delivery.
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">03. Return Process</h3>
                <p>
                    To initiate a return, please contact our support team via WhatsApp or Email. Provide your Order ID and the reason for the return.
                </p>
                <p className="mt-4">
                    Once approved, our courier partner will collect the item, or you can ship it to our hub. Refunds will be processed within 5-7 business days after the item passes inspection.
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">04. Shipping Costs</h3>
                <p>
                    In cases of defective products, Zevens will cover all return shipping costs. For returns due to change of mind, the customer is responsible for the shipping fees.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
}
