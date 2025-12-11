/* ========================================
   CONFIGURATION SUPABASE - EcoRevive
   ======================================== */

// Configuration Supabase
const SUPABASE_URL = 'https://tjgyzwvqhzxkrzbckzae.supabase.co';
const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZ3l6d3ZxaHp4a3J6YmNremFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTg1NDYsImV4cCI6MjA4MDM5NDU0Nn0.uFOb6EYI63wDhSdyZo8Dwqy_6phhlPhu94ExvZn1--I';

// Initialiser le client Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { supabaseClient, SUPABASE_URL, SUPABASE_PUBLIC_KEY };
}

console.log('✅ Supabase initialisé avec succès');
