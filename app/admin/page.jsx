import React from 'react'
import { supabase } from '../supadb.js'

const { data, error } = await supabase
  .from('posts')
  .select()
function Page() {
  return (
    <div>Page</div>
  )
}

export default Page