import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL  = "https://nanjoltorotrmmetanaa.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbmpvbHRvcm90cm1tZXRhbmFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNDA2OTksImV4cCI6MjA5MDkxNjY5OX0.pEODJSNQdQa4oKkgjXzMTpMA2ohMBMK8mrECTOSOwUY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);