"use client"
import { title } from "@/components/primitives";
import { supabase } from '../supadb.js';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import {useUser,useClerk} from "@clerk/nextjs";
let  emaildata={};
export default function DocsPage() {
  const { user } = useUser();
  // console.log(user);

  if(user){
    
    emaildata.fullName= user.fullName,
    emaildata.email= user.emailAddresses[0].emailAddress,
    emaildata.phonenumber=user.phoneNumbers[0].phoneNumber
    
  }

console.log("email data from clerk"+JSON.stringify(emaildata));
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

    if (!user) {
      console.error('User not authenticated');
      return;
    }
  
    // const org = orglist.find(org => org.id === orgId);
    // if (!org) {
    //   console.error('Organization not found');
    //   return;
    // }
  
    console.log("org id: "+orgId);
const { data, error } = await supabase
.from('orglist')
.select('floating_org_email')
.eq('floating_org_id', orgId)
let form
if(data){
  emaildata.orgemail=data[0].floating_org_email;
  console.log("org email "+emaildata.orgemail);
   form = document.createElement('form');
  form.style.display = 'none';
  form.innerHTML = `
    <input type="hidden" name="orgemail" value="${emaildata.orgemail}">
    <input type="hidden" name="fullName" value="${emaildata.fullName}">
    <input type="hidden" name="email" value="${emaildata.email}">
    <input type="hidden" name="phonenumber" value="${emaildata.phonenumber}">
  `;
  document.body.appendChild(form);
}

console.log("data "+(emaildata));
console.log("error "+error);
    try {
   // convert emaildata to form data
    // console.log("email data"+JSON.stringify(emaildata));
      await emailjs
      .sendForm('service_k55rrqh', 'template_ca8uz8u',form, {
        publicKey: 'BuL2lIt048GBByM0A',
      })
      .then(
        () => {
          console.log('Email sent successfully');
          toast.success('Email sent successfully');
        },
        (error) => {
          console.error('Failed to send email:', error);
          toast.error('Failed to send email');
        },
      );
     
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Failed to send email');
    }
  };
  
  return (
    <div>
      <h1 className={title()}>Organisation List</h1>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
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
              <button onClick={() => handleInterest(org.floating_org_id)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Interested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}