const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-card shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-card-foreground">
        Privacy Policy
      </h1>

      <p className="text-lg text-muted-foreground mb-4">
        Last Updated: February 14, 2025
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Introduction
        </h2>
        <p className="text-secondary-foreground">
          At <strong>Study With Us</strong>, we take your privacy seriously.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use our website and services. By using
          our platform, you agree to the practices described in this policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Information We Collect
        </h2>
        <p className="text-secondary-foreground">
          We collect the following types of information to provide and improve
          our services:
          <ul className="list-disc ml-6 text-secondary-foreground">
            <li>
              <strong>Personal Information:</strong> When you create an account,
              we may collect your name, email address, and other contact
              details.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect data about how you
              interact with our platform, such as your browsing behavior,
              interactions with courses, and gamification activities.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about
              the devices you use to access our services, including IP
              addresses, browser types, and operating systems.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies to enhance your
              experience on our platform. For more information, see our{' '}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Cookie Policy
              </a>
              .
            </li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          How We Use Your Information
        </h2>
        <p className="text-secondary-foreground">
          We use the information we collect for the following purposes:
          <ul className="list-disc ml-6 text-secondary-foreground">
            <li>To provide, personalize, and improve our services.</li>
            <li>
              To communicate with you, including sending account-related
              updates, notifications, and marketing materials (if you opt-in).
            </li>
            <li>To ensure the security and integrity of our platform.</li>
            <li>
              To analyze usage patterns and improve the functionality of our
              platform.
            </li>
            <li>
              To comply with legal obligations and enforce our Terms of Service.
            </li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          How We Share Your Information
        </h2>
        <p className="text-secondary-foreground">
          We do not sell or rent your personal information to third parties. We
          may share your information with:
          <ul className="list-disc ml-6 text-secondary-foreground">
            <li>
              <strong>Service Providers:</strong> We may share information with
              third-party vendors who help us deliver our services, such as
              hosting, payment processing, and analytics.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose information if
              required by law or to comply with legal processes, such as court
              orders or subpoenas.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of all or part of our assets, your
              information may be transferred as part of that transaction.
            </li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Data Security
        </h2>
        <p className="text-secondary-foreground">
          We take the security of your personal information seriously and use
          industry-standard measures to protect it. However, please be aware
          that no method of data transmission over the internet is completely
          secure. While we strive to protect your information, we cannot
          guarantee its absolute security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Your Data Rights
        </h2>
        <p className="text-secondary-foreground">
          Depending on your location, you may have certain rights regarding your
          personal data, including:
          <ul className="list-disc ml-6 text-secondary-foreground">
            <li>The right to access and update your information.</li>
            <li>
              The right to request the deletion of your account and personal
              data.
            </li>
            <li>The right to opt-out of marketing communications.</li>
          </ul>
          To exercise these rights, please contact us at{' '}
          <strong>support@studywithus.com</strong>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Children's Privacy
        </h2>
        <p className="text-secondary-foreground">
          Study With Us is not intended for children under the age of 13. We do
          not knowingly collect personal information from children under 13. If
          you believe we have collected such information, please contact us
          immediately so we can take appropriate action.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Changes to This Privacy Policy
        </h2>
        <p className="text-secondary-foreground">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated date. Please review this policy
          periodically to stay informed about how we protect your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Contact Us</h2>
        <p className="text-secondary-foreground">
          If you have any questions or concerns about this Privacy Policy or how
          we handle your personal information, please contact us at:
          <br />
          <strong>Email:</strong> support@studywithus.com
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy
