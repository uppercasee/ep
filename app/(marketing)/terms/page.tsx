import Link from 'next/link'

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8">
        Terms and Conditions
      </h1>

      <p className="text-lg text-muted-foreground mb-4">
        Last Updated: February 14, 2025
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="">
          Welcome to <strong>Study With Us</strong>! These terms and conditions
          ("Terms") govern your access to and use of our website and services,
          including any content, functionality, and services offered on or
          through Study With Us (collectively, "Services"). By using our
          Services, you agree to comply with these Terms. Please read them
          carefully.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
        <p className="">
          By accessing or using Study With Us, you agree to be bound by these
          Terms. If you do not agree to these Terms, you should not use our
          Services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          User Registration and Account
        </h2>
        <p className="">
          To access certain features of the platform, you may need to create an
          account. You agree to provide accurate and up-to-date information when
          registering. You are responsible for maintaining the confidentiality
          of your account credentials, and for all activities under your
          account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
        <p className="">
          Our platform is designed to provide a gamified e-learning experience.
          You agree to use the Services only for lawful purposes, and you will
          not:
          <ul className="list-disc ml-6 ">
            <li>
              Engage in any activities that interfere with or disrupt the
              platform.
            </li>
            <li>
              Upload or transmit any harmful, illegal, or offensive content.
            </li>
            <li>Attempt to access any unauthorized areas of the platform.</li>
          </ul>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="">
          All content and materials available on Study With Us, including text,
          graphics, logos, videos, and course materials, are the property of
          Study With Us or its licensors. You may not use, copy, or distribute
          any of our content without prior written permission, except as
          permitted by these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="">
          Your use of Study With Us is also governed by our{' '}
          <Link href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
          , which explains how we collect, use, and protect your personal
          information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="">
          We reserve the right to suspend or terminate your access to the
          platform at any time, without notice, for any reason, including if you
          violate these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="">
          To the fullest extent permitted by law, Study With Us will not be
          liable for any damages, including indirect, incidental, or
          consequential damages, arising from your use or inability to use the
          Services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p className="">
          These Terms will be governed by and construed in accordance with the
          laws of the jurisdiction in which Study With Us operates. Any disputes
          arising from these Terms will be subject to the exclusive jurisdiction
          of the courts in that jurisdiction.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p className="">
          We may update these Terms from time to time. When we do, we will post
          the updated Terms on this page and indicate the date of the most
          recent revision. You are responsible for reviewing these Terms
          periodically to stay informed about any changes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="">
          If you have any questions or concerns about these Terms or our
          Services, please contact us at:{' '}
          <strong>support@studywithus.com</strong>.
        </p>
      </section>
    </div>
  )
}

export default TermsAndConditions
