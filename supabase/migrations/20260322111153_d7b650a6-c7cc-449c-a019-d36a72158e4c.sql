
-- Timestamp updater function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile + user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Event categories
CREATE TABLE public.event_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view categories" ON public.event_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.event_categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Pricing packages
CREATE TABLE public.pricing_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.event_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pricing_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pricing" ON public.pricing_packages FOR SELECT USING (true);
CREATE POLICY "Admins can manage pricing" ON public.pricing_packages FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  budget NUMERIC,
  guest_count INTEGER,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  special_requirements TEXT,
  package_id UUID REFERENCES public.pricing_packages(id),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON public.bookings FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage bookings" ON public.bookings FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Gallery
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Wishlist
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_category_id UUID REFERENCES public.event_categories(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own wishlist" ON public.wishlist FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON public.wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist" ON public.wishlist FOR DELETE USING (auth.uid() = user_id);

-- Contact submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  event_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contacts" ON public.contact_submissions FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Gallery storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
CREATE POLICY "Public gallery access" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Admins can upload to gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
