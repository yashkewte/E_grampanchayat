import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { FileText, Plus, Clock, CheckCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import {toast} from 'sonner'
import { Badge } from '@/components/ui/badge';
import { Loader2, Inbox } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';


const UserDashboard = () => {

  const { currentUser, userData } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);
  const [pendingApplication, setPendingApplication] = useState(0);
  const [completedApplication, setCompletedApplication] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(applications.length / PAGE_SIZE);
  const paginatedApplications = applications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);


  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    const q = query(
      collection(db, 'applications'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc'),
      
    );

    const totalQ = query(
      collection(db, 'applications'),
      where('userId', '==', currentUser.uid)
    );
    const pendingQ = query(
      collection(db, 'applications'),
      where('userId', '==', currentUser.uid),
      where('status', '==', 'pending')
    );
    const completedQ = query(
      collection(db, 'applications'),
      where('userId', '==', currentUser.uid),
      where('status', '==', 'completed')
    );

    const unsubscribeRecent = onSnapshot(q, (querySnapshot) => {
      const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(apps);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching applications:', error);
      setLoading(false);
    });

    const unsubscribeTotal = onSnapshot(totalQ, (querySnapshot) => {
      setTotalApplications(querySnapshot.size);
    });
    const unsubscribePending = onSnapshot(pendingQ, (querySnapshot) => {
      setPendingApplication(querySnapshot.size);
    });
    const unsubscribeCompleted = onSnapshot(completedQ, (querySnapshot) => {
      setCompletedApplication(querySnapshot.size);
    });

    return () => {
      unsubscribeRecent();
      unsubscribeTotal();
      unsubscribePending();
      unsubscribeCompleted();
    };
  }, [currentUser, setApplications]);

  const handleCancel = async (appId) => {
    setCancellingId(appId);
    try {
      
      await deleteDoc(doc(db, 'applications', appId))
      // await updateDoc(doc(db, 'applications', appId), { status: 'cancelled' });
      // setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: 'cancelled' } : app));
      toast.success('Applications canceled successfully')
    } catch (error) {
      console.error('Error cancelling application:', error);
    }
    setCancellingId(null);
  };

  if (!currentUser || !userData) {
    return <Navigate to="/login" replace />;
  }

  if (userData.role !== 'user') {
    return <Navigate to={`/dashboard/${userData.role}`} replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userData.displayName}</h1>
          <p className="text-muted-foreground">Manage your applications and access government services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <h3 className="text-2xl font-bold mb-2">{pendingApplication}</h3>
              <p className="text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{completedApplication}</h3>
              <p className="text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 ">
          

          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Loading...</div>
              ) : applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <Inbox className="w-10 h-10 mb-2 opacity-60" />
                  <span>No recent applications found.</span>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-muted-foreground/10">
                    {paginatedApplications.map(app => (
                      <li
                        key={app.id}
                        className="flex flex-col md:flex-row md:items-center justify-center gap-2 py-3 px-2 rounded-lg transition hover:bg-muted/50 focus-within:bg-muted/50 text-center"
                      >
                        <div className="flex flex-col md:flex-row md:items-center w-full justify-center text-center gap-2">
                          <div className="font-semibold truncate w-full md:w-1/3 text-center">{app.serviceName || 'Service'}</div>
                          <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full md:w-1/3 mt-1 md:mt-0">
                            <Badge
                              variant={
                                app.status === 'completed'
                                  ? 'success'
                                  : app.status === 'cancelled'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="capitalize"
                            >
                              {app.status || 'Pending'}
                            </Badge>
                            <span className="text-xs text-gray-400 block md:inline-block">
                              {app.createdAt?.toDate
                                ? new Date(app.createdAt.toDate()).toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : ''}
                            </span>
                          </div>
                          {app.status !== 'cancelled' && app.status !== 'completed' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="mt-2 md:mt-0 min-w-[90px] flex items-center justify-center mx-auto"
                              onClick={() => handleCancel(app.id)}
                              disabled={cancellingId === app.id || app.status === 'completed'}
                            >
                              {cancellingId === app.id ? (
                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                              ) : null}
                              Cancel
                            </Button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={e => {
                              e.preventDefault();
                              setCurrentPage(p => Math.max(1, p - 1));
                            }}
                            aria-disabled={currentPage === 1}
                            tabIndex={currentPage === 1 ? -1 : 0}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <PaginationItem key={idx}>
                            <PaginationLink
                              isActive={currentPage === idx + 1}
                              onClick={e => {
                                e.preventDefault();
                                setCurrentPage(idx + 1);
                              }}
                            >
                              {idx + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={e => {
                              e.preventDefault();
                              setCurrentPage(p => Math.min(totalPages, p + 1));
                            }}
                            aria-disabled={currentPage === totalPages}
                            tabIndex={currentPage === totalPages ? -1 : 0}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;