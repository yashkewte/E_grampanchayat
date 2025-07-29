import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { collection, addDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ServiceApplication = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const serviceRef = collection(db, 'services');
    const serviceDoc = doc(serviceRef, serviceId);
    const unsubscribe = onSnapshot(serviceDoc, (doc) => {
      setService(doc.data());
    })
    return () => unsubscribe();
  }, [serviceId, setService])
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  

  if (!service) {
    return <div>Loading...</div>;
  }

  // console.log(service);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const serviceRef = collection(db, 'applications');
    const serviceDoc = {
      serviceId: serviceId,
      userId: currentUser.uid,
      serviceName:service.title,
      status: 'pending',
      createdAt: new Date(),
      submittedBy: currentUser.displayName,
    }
    try {
      await addDoc(serviceRef, serviceDoc);
      toast.success('Application submitted successfully');
      navigate('/services');
    } catch (error) {
      toast.error('Failed to submit application');
      console.log(error.message);

    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Service Application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2 font-bold text-lg text-center">
                {service ? service.title : 'Loading...'}
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                {service ? service.description : 'Loading...'}
              </p>
              <p className="text-sm text-muted-foreground">
                Service ID: {serviceId}
              </p>
              <Button type='submit' className="mt-4">{loading ? 'Submitting...' : 'Submit Application'}</Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ServiceApplication;