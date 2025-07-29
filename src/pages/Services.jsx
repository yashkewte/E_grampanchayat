import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Search,
  Clock,
  Users,
  Heart,
  GraduationCap,
  Home,
  Building2,
  Shield,
  Banknote,
  Bus,
  } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Services = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [services, setServices] = useState([]);
  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db,'services'),(snapshot)=>{
      const servicesData = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);

    })
    return ()=>unsubscribe();
  },[setServices])

      // console.log(services);
  
  const icons = {
    'Civil Registration': <Users className="h-6 w-6" />,
    'Revenue': <Banknote className="h-6 w-6" />,
    'Social Welfare': <Heart className="h-6 w-6" />,
    'Education': <GraduationCap className="h-6 w-6" />,
    'Utilities': <FileText className="h-6 w-6" />,
    'Health': <Heart className="h-6 w-6" />,
    'Transport': <Bus className="h-6 w-6" />,
  }
  // const services = [
  //   {
  //     id: '1',
  //     title: 'Birth Certificate',
  //     description: 'Official certificate for birth registration',
  //     category: 'Civil Registration',
  //     processingTime: '7-10 days',
  //     fee: '₹50',
  //     icon: <Users className="h-6 w-6" />,
  //     requirements: ['Birth registration form', 'Hospital certificate', 'Parent ID proof'],
  //     isActive: true,
  //   },
  //   {
  //     id: '2',
  //     title: 'Death Certificate',
  //     description: 'Official certificate for death registration',
  //     category: 'Civil Registration',
  //     processingTime: '5-7 days',
  //     fee: '₹50',
  //     icon: <Heart className="h-6 w-6" />,
  //     requirements: ['Death registration form', 'Medical certificate', 'ID proof of deceased'],
  //     isActive: true,
  //   },
  //   {
  //     id: '3',
  //     title: 'Income Certificate',
  //     description: 'Certificate showing annual income for various purposes',
  //     category: 'Revenue',
  //     processingTime: '10-15 days',
  //     fee: '₹100',
  //     icon: <Banknote className="h-6 w-6" />,
  //     requirements: ['Income proof documents', 'Employment certificate', 'Address proof'],
  //     isActive: true,
  //   },
  //   {
  //     id: '4',
  //     title: 'Residence Certificate',
  //     description: 'Certificate proving residence in the village',
  //     category: 'Revenue',
  //     processingTime: '7-10 days',
  //     fee: '₹75',
  //     icon: <Home className="h-6 w-6" />,
  //     requirements: ['Address proof', 'Utility bills', 'Rental agreement'],
  //     isActive: true,
  //   },
  //   {
  //     id: '5',
  //     title: 'Caste Certificate',
  //     description: 'Certificate for caste verification',
  //     category: 'Social Welfare',
  //     processingTime: '15-20 days',
  //     fee: '₹100',
  //     icon: <Shield className="h-6 w-6" />,
  //     requirements: ['Caste proof documents', 'Family tree', 'Community leader certificate'],
  //     isActive: true,
  //   },
  //   {
  //     id: '6',
  //     title: 'Property Tax Certificate',
  //     description: 'Certificate for property tax payment verification',
  //     category: 'Revenue',
  //     processingTime: '5-7 days',
  //     fee: '₹25',
  //     icon: <Building2 className="h-6 w-6" />,
  //     requirements: ['Property documents', 'Tax payment receipts', 'Survey number'],
  //     isActive: true,
  //   },
  //   {
  //     id: '7',
  //     title: 'School Leaving Certificate',
  //     description: 'Certificate for students leaving village schools',
  //     category: 'Education',
  //     processingTime: '3-5 days',
  //     fee: 'Free',
  //     icon: <GraduationCap className="h-6 w-6" />,
  //     requirements: ['School records', 'Student ID', 'Parent consent'],
  //     isActive: true,
  //   },
  //   {
  //     id: '8',
  //     title: 'Water Connection Certificate',
  //     description: 'Certificate for new water connection application',
  //     category: 'Utilities',
  //     processingTime: '10-12 days',
  //     fee: '₹200',
  //     icon: <FileText className="h-6 w-6" />,
  //     requirements: ['Property ownership proof', 'Site plan', 'No objection certificate'],
  //     isActive: true,
  //   },
  // ];

  const categories = ['All', ...Array.from(new Set(services.map(service => service.category)))];

  const filteredServices = services.filter(service => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory && service.isActive;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-primary">
          Government Services
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Access various government services online. Apply for certificates and track your
          applications from the comfort of your home.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredServices.map((service) => (
          <Card key={service.id} className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {icons[service.category]}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {service.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{service.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{service.processingTime}</span>
                </div>
                <div className="font-medium text-primary">₹{service.fee}</div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Requirements:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {service.requirements.slice(0, 2).map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                  {service.requirements.length > 2 && (
                    <li>• +{service.requirements.length - 2} more...</li>
                  )}
                </ul>
              </div>

              <div className="pt-4">
                {currentUser ? (
                  <Button asChild className="w-full">
                    <Link to={`/apply/${service.id}`}>Apply Now</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">Login to Apply</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <div className="mt-16 bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">How to Apply</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Register/Login', 'Fill Application', 'Track Progress'].map((step, idx) => (
            <div className="text-center" key={idx}>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">{idx + 1}</span>
              </div>
              <h3 className="font-semibold mb-2">{step}</h3>
              <p className="text-muted-foreground text-sm">
                {idx === 0 && 'Create an account or log in to access our services'}
                {idx === 1 && 'Complete the application form and upload required documents'}
                {idx === 2 && 'Monitor your application status and download certificates'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
