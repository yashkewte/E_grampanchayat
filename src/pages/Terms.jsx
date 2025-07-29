import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-primary">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        <Card className="shadow-soft">
          <CardContent className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to the E-Gram Panchayat digital platform. These Terms and Conditions ("Terms") 
                govern your use of our website and services. By accessing or using our platform, you 
                agree to be bound by these Terms. If you disagree with any part of these terms, 
                then you may not access the service.
              </p>
            </section>

            <Separator />

            {/* Definitions */}
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Definitions</h2>
              <div className="space-y-3 text-muted-foreground">
                <p><strong>"Platform"</strong> refers to the E-Gram Panchayat digital service portal.</p>
                <p><strong>"User"</strong> refers to any individual accessing or using the platform.</p>
                <p><strong>"Services"</strong> refers to the digital government services offered through the platform.</p>
                <p><strong>"We," "Us," "Our"</strong> refers to the Gram Panchayat administration.</p>
              </div>
            </section>

            <Separator />

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold text-foreground">3.1 Account Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">3.2 Accurate Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate, current, and complete information</li>
                  <li>You must update your information to maintain its accuracy</li>
                  <li>Providing false information may result in service termination</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">3.3 Prohibited Activities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Using the platform for any unlawful purpose</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Interfering with the proper functioning of the platform</li>
                  <li>Submitting false or fraudulent applications</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Service Availability</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  We strive to maintain continuous service availability. However, we do not guarantee 
                  uninterrupted access to the platform. Services may be temporarily unavailable due to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Scheduled maintenance</li>
                  <li>Technical difficulties</li>
                  <li>Force majeure events</li>
                  <li>Government policy changes</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Privacy and Data Protection */}
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Privacy and Data Protection</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Your privacy is important to us. We collect and process personal data in accordance 
                  with applicable laws and regulations. By using our platform, you consent to the 
                  collection and use of your information as described in our Privacy Policy.
                </p>
                <h3 className="text-lg font-semibold text-foreground">5.1 Data Collection</h3>
                <p>We collect information necessary for service delivery including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal identification information</li>
                  <li>Contact details</li>
                  <li>Documents required for service applications</li>
                  <li>Usage analytics for platform improvement</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Service Processing */}
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Service Processing</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Processing times for applications vary depending on the service type and complexity. 
                  We will make reasonable efforts to process applications within stated timeframes, 
                  but cannot guarantee specific completion dates.
                </p>
                <h3 className="text-lg font-semibold text-foreground">6.1 Application Status</h3>
                <p>You can track your application status through your dashboard. Status updates include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Application received</li>
                  <li>Under review</li>
                  <li>Additional information required</li>
                  <li>Approved/Rejected</li>
                  <li>Certificate issued</li>
                </ul>
              </div>
            </section>

            <Separator />

            {/* Fees and Payments */}
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Fees and Payments</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Some services may require payment of government fees. All fees are clearly displayed 
                  before application submission. Fees are non-refundable except in cases of system error 
                  or service cancellation by the administration.
                </p>
              </div>
            </section>

            <Separator />

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  To the maximum extent permitted by law, we shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including loss of profits, 
                  data, or other intangible losses resulting from your use of the platform.
                </p>
              </div>
            </section>

            <Separator />

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of 
                  significant changes through the platform. Your continued use of the service after 
                  changes constitutes acceptance of the new Terms.
                </p>
              </div>
            </section>

            <Separator />

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@egrampanchayat.gov.in</p>
                  <p><strong>Phone:</strong> +91 12345 67890</p>
                  <p><strong>Address:</strong> Village Panchayat Office, Main Road, Village Name, District, State - 123456</p>
                </div>
              </div>
            </section>

            {/* Acceptance */}
            <div className="bg-primary/10 p-6 rounded-lg mt-8">
              <p className="text-center font-medium">
                By using the E-Gram Panchayat platform, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;