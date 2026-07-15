import { Navigate } from 'react-router-dom'
import PaymentForm from '../components/PaymentForm'

function Payment() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Payment</h1>
          <p className="text-slate-400">Complete your booking with secure payment</p>
        </div>
        <PaymentForm />
      </div>
    </div>
  )
}

export default Payment
