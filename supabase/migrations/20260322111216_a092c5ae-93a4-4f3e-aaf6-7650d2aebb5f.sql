
-- The contact_submissions INSERT policy with true is intentional for public contact forms.
-- Restrict it to authenticated or add rate limiting note. We keep it as-is since it's a public form.
-- No changes needed - the warning is expected for a public contact form.
-- Instead, let's add the missing policy note:
COMMENT ON POLICY "Anyone can submit contact" ON public.contact_submissions IS 'Public contact form - intentionally open for unauthenticated submissions';
