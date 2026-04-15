import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  Calendar, Users, Image, DollarSign, LayoutDashboard, Trash2, CheckCircle, XCircle, Eye,
} from "lucide-react";

type Tab = "bookings" | "gallery" | "users" | "contacts";

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [stats, setStats] = useState({ bookings: 0, users: 0, contacts: 0 });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast({ title: "Access denied", description: "Admin privileges required.", variant: "destructive" });
      navigate("/");
    }
  }, [user, isAdmin, authLoading]);

  useEffect(() => {
    if (!isAdmin) return;
    const load = async () => {
      const [{ data: b }, { data: c }] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      ]);
      setBookings(b || []);
      setContacts(c || []);
      setStats({ bookings: b?.length || 0, users: 0, contacts: c?.length || 0 });
    };
    load();
  }, [isAdmin]);

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setBookings(bookings.map((b) => b.id === id ? { ...b, status } : b));
      toast({ title: `Booking ${status}` });
    }
  };

  if (authLoading) return <PageLayout><div className="py-32 text-center">Loading...</div></PageLayout>;
  if (!isAdmin) return null;

  return (
    <PageLayout>
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold">
            Admin <span className="text-gradient-warm">Dashboard</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Bookings", value: stats.bookings, icon: Calendar, color: "bg-peach/10 text-peach" },
              { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Eye, color: "bg-yellow-100 text-yellow-600" },
              { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: CheckCircle, color: "bg-green-100 text-green-600" },
              { label: "Contact Msgs", value: stats.contacts, icon: Users, color: "bg-sky/10 text-sky" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className={`inline-flex p-2 rounded-lg ${s.color} mb-3`}><s.icon className="h-5 w-5" /></div>
                <div className="text-2xl font-bold tabular-nums">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {[
              { id: "bookings" as const, label: "Bookings", icon: Calendar },
              { id: "contacts" as const, label: "Messages", icon: Users },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${
                  tab === t.id ? "bg-primary text-primary-foreground shadow-lg" : "glass hover:bg-muted"
                }`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          {/* Bookings */}
          {tab === "bookings" && (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{b.event_type}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {b.contact_name} · {b.contact_email} · {b.event_date}
                    </div>
                    {b.location && <div className="text-xs text-muted-foreground">{b.location}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      b.status === "confirmed" ? "bg-green-100 text-green-700" :
                      b.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>{b.status}</span>
                    {b.status === "pending" && (
                      <>
                        <button onClick={() => updateBookingStatus(b.id, "confirmed")} className="p-2 rounded-lg hover:bg-green-50 text-green-600 active:scale-95">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button onClick={() => updateBookingStatus(b.id, "cancelled")} className="p-2 rounded-lg hover:bg-red-50 text-red-500 active:scale-95">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {bookings.length === 0 && <p className="text-center text-muted-foreground py-12">No bookings yet</p>}
            </div>
          )}

          {/* Contacts */}
          {tab === "contacts" && (
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="glass rounded-2xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-sm">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.email} · {c.event_type}</div>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  {c.message && <p className="text-sm text-muted-foreground mt-2">{c.message}</p>}
                </div>
              ))}
              {contacts.length === 0 && <p className="text-center text-muted-foreground py-12">No messages yet</p>}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Admin;
