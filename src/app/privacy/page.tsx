export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-heading font-black italic uppercase tracking-tighter mb-12">
            Privacy <span className="text-accent">Policy.</span>
        </h1>
        
        <div className="space-y-10 text-secondary leading-relaxed font-bold text-sm uppercase tracking-wider">
            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">01. Overview</h3>
                <p>
                    Your privacy is important to us. It is Zevens' policy to respect your privacy regarding any information we may collect from you across our website, zevens.vercel.app, and other sites we own and operate.
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">02. Data Collection</h3>
                <p>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </p>
                <p className="mt-4">
                    The types of information we collect include: Name, Shipping Address, Phone Number, and Transactional data for payment verification.
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">03. Data Security</h3>
                <p>
                    We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">04. Third-Party Sharing</h3>
                <p>
                    We don’t share any personally identifying information publicly or with third-parties, except when required to by law or to ensure the successful delivery of your order (e.g., sharing your address with our courier partners).
                </p>
            </section>

            <section>
                <h3 className="text-primary text-xl font-heading font-black mb-4 italic">05. Contact</h3>
                <p>
                    If you have any questions about how we handle user data and personal information, feel free to contact us via our official channels listed on the About page.
                </p>
            </section>
        </div>
      </div>
    </div>
  );
}
