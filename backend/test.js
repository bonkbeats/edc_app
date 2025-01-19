const { createClient } = require('@supabase/supabase-js');
const fs = require('fs'); // File system module to read files

// Replace with your actual Supabase URL and Key
const supabaseUrl = 'https://pqyacvthkumxduejdpsu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxeWFjdnRoa3VteGR1ZWpkcHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTAzNjUsImV4cCI6MjA1MjQyNjM2NX0.vtsocUD5pqnot98g1n9xxjviSkf_gU9HOGh0-MKJBgw';
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadTest() {
  // Replace 'path/to/your/image.jpg' with the path to the image you want to test
  const filePath = 'D:/edc_app/backend/public/images/1736025038594.jpg';
  
  // Read the file into a buffer
  const buffer = fs.readFileSync(filePath);
  const fileName = 'test_image.jpg'; // Name for the file in Supabase

  const { data, error } = await supabase
    .storage
    .from('events') // Your Supabase storage bucket
    .upload(`images/${fileName}`, buffer, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Supabase upload test error:', error);
  } else {
    console.log('Supabase upload test success:', data);
  }
}

uploadTest();
