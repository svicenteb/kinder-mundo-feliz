// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fxcntqqkvbfclbbkbvnd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Y250cXFrdmJmY2xiYmtidm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODcwMzUsImV4cCI6MjA2MzE2MzAzNX0.bD4BDcUJIeA44GFjmpbIQQSjhCdYwJ3pV2AZzAHLKP8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);