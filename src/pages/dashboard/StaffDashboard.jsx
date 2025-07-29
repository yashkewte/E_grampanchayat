import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle, Users } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateDoc, doc } from 'firebase/firestore';

const StaffDashboard = () => {
  const { currentUser, userData } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, 'applications'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(apps);
      setLoading(false);
      setTotalApplications(querySnapshot.size);
    });

    const pendingQ = query(
      collection(db, 'applications'),
      orderBy('createdAt', 'desc'),
      where('status', '==', 'pending')
    );
    const unsubscribePending = onSnapshot(pendingQ, (querySnapshot) => {
      setPendingApplications(querySnapshot.size);
    });

    return () => {
      unsubscribe();
      unsubscribePending();
    };
  }, []);

  if (!currentUser || !userData) {
    return <Navigate to="/login" replace />;
  }

  if (userData.role !== 'staff') {
    return <Navigate to={`/dashboard/${userData.role}`} replace />;
  }

  const handleAction = async (appId, action) => {
    setProcessingId(appId);
    try {
      await updateDoc(doc(db, 'applications', appId), { status: action });
      toast.success(`Application ${action === 'approved' ? 'approved' : 'rejected'} successfully`);
    } catch {
      toast.error('Failed to update application');
    }
    setProcessingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
          <p className="text-muted-foreground">Review and process citizen applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{totalApplications}</h3>
              <p className="text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{pendingApplications}</h3>
              <p className="text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">0</h3>
              <p className="text-muted-foreground">Processed Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">0</h3>
              <p className="text-muted-foreground">Active Citizens</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : applications.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No applications assigned for review.
              </p>
            ) : (
              <ul className="divide-y divide-muted-foreground/10">
                {applications.map(app => (
                  <li key={app.id} className="py-3 px-2 rounded-lg transition hover:bg-muted/50 focus-within:bg-muted/50">
                    <div className="flex flex-col md:flex-row md:items-center w-full justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{app.serviceName || 'Service'}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              app.status === 'approved'
                                ? 'success'
                                : app.status === 'rejected'
                                ? 'destructive'
                                : app.status === 'completed'
                                ? 'success'
                                : app.status === 'cancelled'
                                ? 'destructive'
                                : 'secondary'
                            }
                            className="capitalize"
                          >
                            {app.status || 'Pending'}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            Submitted by: {app.submittedBy || 'Unknown'}
                          </span>
                          <span className="text-xs text-gray-400">
                            {app.createdAt?.toDate
                              ? new Date(app.createdAt.toDate()).toLocaleString()
                              : ''}
                          </span>
                        </div>
                      </div>
                      {app.status === 'pending' && (
                        <div className="flex gap-2 mt-2 md:mt-0">
                          <Button
                            size="sm"
                            variant="success"
                            disabled={processingId === app.id}
                            onClick={() => handleAction(app.id, 'completed')}
                          >
                            {processingId === app.id ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={processingId === app.id}
                            onClick={() => handleAction(app.id, 'rejected')}
                          >
                            {processingId === app.id ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;
