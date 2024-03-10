"use client"
import { title } from "@/components/primitives";
import { supabase } from '../supadb.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function DocsPage() {
  const [orglist, setOrglist] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('orglist').select();
      if (error) {
        console.error(error);
      } else {
        setOrglist(data);
      }
    }
    fetchData();
  }, []);
  const handleInterest = async (orgId) => {
    const user = await supabase.auth.user();
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const org = orglist.find(org => org.id === orgId);
    if (!org) {
      console.error('Organization not found');
      return;
    }

    try {
      await axios.post('/api/email', {
        recipientEmail: org.floating_org_email,
        message: `A user with email ${user.email} is interested in your organization.`
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div>
      <h1 className={title()}>Organisation List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {orglist.map((org, index) => (
          <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="p-8 rounded-t-lg" src={org.floating_photo_link} alt="organization image" />
            </a>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{org.floating_name}</h5>
              </a>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{org.floating_description}</p>
              <div className="flex items-center justify-between mt-5">
                <span className="text-sm text-gray-600 dark:text-gray-400">{org.floating_address}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{org.floating_phone_number}</span>
              </div>
              <div className="flex items-center justify-between mt-5">
                <span className="text-sm text-gray-600 dark:text-gray-400">{org.floating_org_email}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{org.created_at}</span>
              </div>
              <button onClick={() => handleInterest(org.id)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Interested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}