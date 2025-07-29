import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, Award } from 'lucide-react';

const About= () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-primary">
          About E-Gram Panchayat
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transforming rural governance through digital innovation, bringing efficient and transparent 
          government services directly to your doorstep.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center shadow-soft">
          <CardHeader>
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To digitize and streamline Gram Panchayat services, making government processes 
              more accessible, efficient, and transparent for rural communities.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-soft">
          <CardHeader>
            <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To create a fully digitized rural governance ecosystem where every citizen can 
              access government services seamlessly from anywhere, anytime.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center shadow-soft">
          <CardHeader>
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Transparency, accessibility, efficiency, and citizen-centric service delivery 
              form the cornerstone of our digital governance platform.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* About Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Empowering Rural Communities</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The E-Gram Panchayat platform represents a significant step forward in India's 
              digital governance journey. By leveraging modern technology, we bridge the gap 
              between rural communities and government services.
            </p>
            <p>
              Our platform eliminates the need for multiple visits to government offices, 
              reduces paperwork, and provides real-time tracking of applications. Citizens 
              can now apply for various certificates and services from the comfort of their homes.
            </p>
            <p>
              We are committed to ensuring that digital governance reaches every corner of 
              rural India, promoting inclusive growth and development.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Users className="h-5 w-5 text-primary mr-2" />
              For Citizens
            </h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• Easy online service applications</li>
              <li>• Real-time application tracking</li>
              <li>• Digital certificate downloads</li>
              <li>• 24/7 service availability</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">For Administration</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• Streamlined application processing</li>
              <li>• Digital workflow management</li>
              <li>• Performance analytics</li>
              <li>• Reduced administrative burden</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-16 bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground">Services Delivered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <div className="text-muted-foreground">Villages Connected</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">User Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">24/7</div>
            <div className="text-muted-foreground">Service Availability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;