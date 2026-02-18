require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabase() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Environment variables missing!');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Testing connection to Supabase...');

    // Try to insert a dummy record
    const dummyData = {
        full_name: 'Test Setup',
        email: `test_${Date.now()}@example.com`,
        role: 'student',
        current_platform: 'None',
        frustrations: [],
        desired_features: [],
        pricing_expectation: 'Free only',
        early_access_interest: false,
        beta_tester: false,
        source: 'backend_test_script'
    };

    const { data, error } = await supabase
        .from('marketing_waitlist_users')
        .insert([dummyData])
        .select();

    if (error) {
        console.error('Supabase Error:', error);
        if (error.code === 'PGRST204') {
            console.error('Possible cause: Table "marketing_waitlist_users" does not exist.');
        } else if (error.code === '42501') {
            console.error('Possible cause: RLS Policy violation. Did you enable "Allow anon inserts"?');
        }
    } else {
        console.log('Success! Test user created:', data);

        // Cleanup - delete the test user
        if (data && data[0] && data[0].id) {
            await supabase.from('marketing_waitlist_users').delete().eq('id', data[0].id);
            console.log('Cleanup: Test user deleted.');
        }
    }
}

testSupabase();
