import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { FileText, Users, Settings, BarChart3 } from 'lucide-react';
import { collection, onSnapshot, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

const AdminDashboard = () => {
  const { currentUser, userData } = useAuth();
  // Service management state
  const [services, setServices] = useState([]);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', category: '', isActive: true, fee: '', requirements: [''], processingTime: '' });
  const [serviceLoading, setServiceLoading] = useState(false);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(applications.length / pageSize);
  const paginatedApplications = applications.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const [serviceCurrentPage, setServiceCurrentPage] = useState(1);
  const servicePageSize = 5; // Services per page
  const serviceTotalPages = Math.ceil(services.length / servicePageSize);
  const paginatedServices = services.slice(
    (serviceCurrentPage - 1) * servicePageSize,
    serviceCurrentPage * servicePageSize
  );

  

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Fetch applications count
    const fetchApplicationsCount = async () => {
      const snap = await getDocs(collection(db, 'applications'));
      setApplicationsCount(snap.size);
    };
    fetchApplicationsCount();
    // Optionally, you can set up a real-time listener for applications as well:
    const unsubscribeApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      setApplicationsCount(snapshot.size);
    });

    // Fetch users count (role === 'user')
    const fetchUsersCount = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'user'));
      const snap = await getDocs(q);
      setUsersCount(snap.size);
    };
    fetchUsersCount();
    // Real-time listener for users
    const unsubscribeUsers = onSnapshot(query(collection(db, 'users'), where('role', '==', 'user')), (snapshot) => {
      setUsersCount(snapshot.size);
    });

    // Fetch staff count (role === 'staff')
    const fetchStaffCount = async () => {
      const q = query(collection(db, 'users'), where('role', '==', 'staff'));
      const snap = await getDocs(q);
      setStaffCount(snap.size);
    };
    fetchStaffCount();
    // Real-time listener for staff
    const unsubscribeStaff = onSnapshot(query(collection(db, 'users'), where('role', '==', 'staff')), (snapshot) => {
      setStaffCount(snapshot.size);
    });

    // Real-time listener for active services
    const unsubscribeActiveServices = onSnapshot(query(collection(db, 'services'), where('isActive', '==', true)), (snapshot) => {
      setActiveServicesCount(snapshot.size);
    });
    // Real-time listener for all applications
    const unsubscribeAllApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubscribe();
      unsubscribeApps();
      unsubscribeUsers();
      unsubscribeStaff();
      unsubscribeActiveServices();
      unsubscribeAllApps();
    };
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setServiceForm({ title: '', description: '', category: '', isActive: true, fee: '', requirements: [''], processingTime: '' });
    setServiceModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title || '',
      description: service.description || '',
      category: service.category || '',
      isActive: service.isActive !== undefined ? service.isActive : true,
      fee: service.fee || '',
      requirements: Array.isArray(service.requirements) ? service.requirements : [''],
      processingTime: service.processingTime || '',
    });
    setServiceModalOpen(true);
  };

  const closeModal = () => {
    setServiceModalOpen(false);
    setEditingService(null);
    setServiceForm({ title: '', description: '', category: '', isActive: true, fee: '', requirements: [''], processingTime: '' });
    setServiceCurrentPage(1);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;
    if (name === 'requirements') {
      const idx = Number(dataset.idx);
      setServiceForm((prev) => {
        const reqs = [...prev.requirements];
        reqs[idx] = value;
        return { ...prev, requirements: reqs };
      });
    } else {
      setServiceForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const addRequirementField = () => {
    setServiceForm((prev) => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };

  const removeRequirementField = (idx) => {
    setServiceForm((prev) => {
      const reqs = prev.requirements.filter((_, i) => i !== idx);
      return { ...prev, requirements: reqs.length ? reqs : [''] };
    });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setServiceLoading(true);
    try {
      if (editingService) {
        await updateDoc(doc(db, 'services', editingService.id), serviceForm);
        toast.success('Service updated successfully');
      } else {
        await addDoc(collection(db, 'services'), serviceForm);
        toast.success('Service created successfully');
      }
      closeModal();
    } catch {
      toast.error('Failed to save service');
    }
    setServiceLoading(false);
  };

  const handleToggleActive = async (service) => {
    try {
      await updateDoc(doc(db, 'services', service.id), { isActive: !service.isActive });
    } catch {
      toast.error('Failed to update active status');
    }
  };

  const handleUpdateApplicationStatus = async (appId, status) => {
    try {
      await updateDoc(doc(db, 'applications', appId), { status });
      toast.success(`Application ${status}`);
    } catch {
      toast.error('Failed to update application status');
    }
  };

  if (!currentUser || !userData) {
    return <Navigate to="/login" replace />;
  }

  if (userData.role !== 'admin') {
    return <Navigate to={`/dashboard/${userData.role}`} replace />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage services, users, and system settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{applicationsCount}</h3>
              <p className="text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{usersCount}</h3>
              <p className="text-muted-foreground">Registered Users</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Settings className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{activeServicesCount}</h3>
              <p className="text-muted-foreground">Active Services</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{staffCount}</h3>
              <p className="text-muted-foreground">Staff Members</p>
            </CardContent>
          </Card>
        </div>

        {/* Service Management Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Service Management</h2>
            <Button onClick={openCreateModal} variant="primary">Add Service</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Title</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Description</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Category</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Fee</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Processing Time</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Requirements</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Active</th>
                  <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedServices.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-4" style={{ color: 'var(--muted-foreground)' }}>No services found.</td></tr>
                ) : (
                  paginatedServices.map(service => (
                    <tr key={service.id}>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{service.title}</td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{service.description}</td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{service.category}</td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{service.fee}</td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{service.processingTime}</td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{Array.isArray(service.requirements) ? service.requirements.join(', ') : ''}</td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                        <Switch checked={service.isActive} onCheckedChange={() => handleToggleActive(service)} />
                      </td>
                      <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                        <Button size="sm" onClick={() => openEditModal(service)}>Edit</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {serviceTotalPages > 1 && (
  <Pagination className="mt-4">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => setServiceCurrentPage((p) => Math.max(1, p - 1))}
          disabled={serviceCurrentPage === 1}
        />
      </PaginationItem>
      {Array.from({ length: serviceTotalPages }).map((_, idx) => (
        <PaginationItem key={idx}>
          <PaginationLink
            isActive={serviceCurrentPage === idx + 1}
            onClick={() => setServiceCurrentPage(idx + 1)}
          >
            {idx + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          onClick={() => setServiceCurrentPage((p) => Math.min(serviceTotalPages, p + 1))}
          disabled={serviceCurrentPage === serviceTotalPages}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)}
          </div>

        </div>
        {/* Service Modal */}
        {serviceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeModal}>&times;</button>
              <h3 className="text-xl font-bold mb-4">{editingService ? 'Edit Service' : 'Add Service'}</h3>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Title</label>
                  <Input name="title" value={serviceForm.title} onChange={handleFormChange} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <Input name="description" value={serviceForm.description} onChange={handleFormChange} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <Input name="category" value={serviceForm.category} onChange={handleFormChange} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Fee</label>
                  <Input name="fee" type="number" value={serviceForm.fee} onChange={handleFormChange} required min="0" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Processing Time</label>
                  <Input name="processingTime" value={serviceForm.processingTime} onChange={handleFormChange} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Requirements</label>
                  {serviceForm.requirements.map((req, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <Input name="requirements" data-idx={idx} value={req} onChange={handleFormChange} required />
                      {serviceForm.requirements.length > 1 && (
                        <Button type="button" size="sm" variant="secondary" onClick={() => removeRequirementField(idx)}>-</Button>
                      )}
                      {idx === serviceForm.requirements.length - 1 && (
                        <Button type="button" size="sm" variant="secondary" onClick={addRequirementField}>+</Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isActive" checked={serviceForm.isActive} onChange={handleFormChange} id="isActive" />
                  <label htmlFor="isActive">Active</label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={closeModal}>Cancel</Button>
                  <Button type="submit" variant="primary" disabled={serviceLoading}>{serviceLoading ? 'Saving...' : (editingService ? 'Update' : 'Create')}</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>User</th>
                      <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Service</th>
                      <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Status</th>
                      <th className="px-4 py-2 border-b" style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.length === 0 ? (
                      <tr><td colSpan={4} className="text-center py-4" style={{ color: 'var(--muted-foreground)' }}>No applications found.</td></tr>
                    ) : (
                      paginatedApplications.map(app => (
                        <tr key={app.id}>
                          <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{app.submittedBy || app.userId}</td>
                          <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{app.serviceName || app.serviceId}</td>
                          <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>{app.status || 'pending'}</td>
                          <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                            <Button size="sm" variant="success" onClick={() => handleUpdateApplicationStatus(app.id, 'approved')} disabled={app.status === 'approved'}>Approve</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleUpdateApplicationStatus(app.id, 'rejected')} disabled={app.status === 'rejected'}>Reject</Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          aria-disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <PaginationItem key={idx}>
                          <PaginationLink
                            isActive={currentPage === idx + 1}
                            onClick={() => setCurrentPage(idx + 1)}
                          >
                            {idx + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          aria-disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
