import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Clock, Shield, FileText, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-500">
        <div className="container mx-auto px-4 py-20 text-center text-white">
          <Building2 className="h-20 w-20 mx-auto mb-8 opacity-90 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight  text-primary">
            Digital E-Gram Panchayat
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto text-muted-foreground">
            Bringing government services to your doorstep through digital innovation. 
            Apply for certificates, track applications, and access services 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary-foreground text-primary hover:bg-white/90">
              <Link to="/services">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-primary hover:bg-white/10">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Digital E-Gram Panchayat?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience efficient, transparent, and accessible government services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center shadow-soft hover:shadow-elegant transition-shadow">
            <CardContent className="p-8">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-muted-foreground">Access services anytime, from anywhere</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft hover:shadow-elegant transition-shadow">
            <CardContent className="p-8">
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-muted-foreground">Your data is protected with advanced security</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft hover:shadow-elegant transition-shadow">
            <CardContent className="p-8">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Digital Certificates</h3>
              <p className="text-muted-foreground">Download verified digital certificates instantly</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-soft hover:shadow-elegant transition-shadow">
            <CardContent className="p-8">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Citizen-Centric</h3>
              <p className="text-muted-foreground">Designed with citizens' needs in mind</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Available Services</h2>
            <p className="text-xl text-muted-foreground">
              Access essential government services with just a few clicks
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              'Birth Certificate',
              'Death Certificate', 
              'Income Certificate',
              'Residence Certificate',
              'Caste Certificate',
              'Property Tax',
              'School Leaving',
              'Water Connection'
            ].map((service) => (
              <div key={service} className="bg-card p-4 rounded-lg text-center shadow-soft">
                <p className="font-medium">{service}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;