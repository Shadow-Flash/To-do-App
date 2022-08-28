import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gsifhnzgjxvlvdmzhukh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzaWZobnpnanh2bHZkbXpodWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEyNTk5NjAsImV4cCI6MTk3NjgzNTk2MH0.wY6sWmTxSrSWGIHPv_qorT474c-UakGd9QtURRtMKWE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)