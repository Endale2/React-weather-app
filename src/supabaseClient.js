import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvagjrcnewknfmpoardu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YWdqcmNuZXdrbmZtcG9hcmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MjA0ODQsImV4cCI6MjAzOTk5NjQ4NH0.7Yx4AdRdWErCZc_GRNJCmRUZvg1gm_YnADfhLJKn_Ps';
export const supabase = createClient(supabaseUrl, supabaseKey);
