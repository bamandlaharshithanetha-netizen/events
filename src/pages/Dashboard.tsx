import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Calendar, User, Heart, LogOut, Clock, MapPin } from "lucide-react";

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [tab, setTab] = useState<"bookings" | "wishlist" | "profile">("bookings");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [{ data: b }, { data: w }, { data: p }] = await Promise.all([
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("wishlist").select("*, event_categories(name, slug)").eq("user_id", user.id),
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
      ]);
      setBookings(b || []);
      setWishlist(w || []);
      setProfile(p);
    };
    fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  if (authLoading) return <PageLayout><div className="py-32 text-center text-muted-foreground">Loading...</div></PageLayout>;

  return (
    <PageLayout>
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Welcome, <span className="text-gradient-warm">{profile?.full_name || "there"}</span> ✨
          </motion.h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: "bookings" as const, label: "My Bookings", icon: Calendar },
              { id: "wishlist" as const, label: "Wishlist", icon: Heart },
              { id: "profile" as const, label: "Profile", icon: User },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all active:scale-[0.97] ${
                  tab === t.id ? "bg-primary text-primary-foreground shadow-lg" : "glass hover:bg-muted"
                }`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
            <button onClick={handleSignOut} className="ml-auto inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 active:scale-[0.97]">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

          {/* Bookings */}
          {tab === "bookings" && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookings yet</p>
                  <Link to="/booking" className="inline-block mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                    Book Your First Event
                  </Link>
                </div>
              ) : bookings.map((b) => (
                <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{b.event_type}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor(b.status)}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {b.event_date}</span>
                      {b.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {b.location}</span>}
                    </div>
                  </div>
                  {b.budget && <div className="text-right"><span className="text-lg font-bold tabular-nums">₹{Number(b.budget).toLocaleString()}</span></div>}
                </motion.div>
              ))}
            </div>
          )}

          {/* Wishlist */}
          {tab === "wishlist" && (
            <div className="space-y-4">
              {wishlist.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                  <Link to="/events" className="inline-block mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                    Explore Events
                  </Link>
                </div>
              ) : wishlist.map((w) => (
                <div key={w.id} className="glass rounded-2xl p-6">
                  <h3 className="font-bold">{w.event_categories?.name}</h3>
                  {w.notes && <p className="text-sm text-muted-foreground mt-1">{w.notes}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Profile */}
          {tab === "profile" && profile && (
            <div className="glass-strong rounded-2xl p-8 max-w-md">
              <h2 className="text-lg font-bold mb-6">Edit Profile</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input type="text" value={profile.full_name || ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</label>
                  <input type="tel" value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                </div>
                <button onClick={async () => {
                  const { error } = await supabase.from("profiles").update({ full_name: profile.full_name, phone: profile.phone }).eq("user_id", user!.id);
                  if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
                  else toast({ title: "Profile updated ✨" });
                }}
                  className="rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.97]">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Dashboard;
