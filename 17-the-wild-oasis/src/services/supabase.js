import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://oewfelnqknspnejspcoz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ld2ZlbG5xa25zcG5lanNwY296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1OTkyNDcsImV4cCI6MjAyMTE3NTI0N30.Gu3mdxjxShU9q4NYz-ZS47IdXe4TfjxGsvN5EZgIJF0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
