import { getUserAccounts } from '@/actions/dashboard'
import React from 'react'
import {AddTransactionForm} from '../_components/transaction-form';
import { defaultCategories } from '@/data/categories';
import {getTransaction}from '@/actions/transaction'

const AddTransactionPage =async  ({searchParams}) => {
  const accounts=await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8 ">{editId?"Edit":"Add"} Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  )
}

export default AddTransactionPage
