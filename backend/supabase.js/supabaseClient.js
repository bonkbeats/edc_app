// config/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');;

const supabaseUrl = 'https://pqyacvthkumxduejdpsu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxeWFjdnRoa3VteGR1ZWpkcHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTAzNjUsImV4cCI6MjA1MjQyNjM2NX0.vtsocUD5pqnot98g1n9xxjviSkf_gU9HOGh0-MKJBgw';
const supabase = createClient(supabaseUrl, supabaseKey);
//console.log(supabase);

module.exports = supabase;
