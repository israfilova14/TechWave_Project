import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-200 text-slate-600 flex items-center justify-center'>
      <div className='container mx-auto p-3 mt-8'>
        <div className='flex flex-col md:flex-row gap-10 mx-auto items-start md:items-center justify-around'>
          <div className='mb-6 md:mb-0'>
            <h2 className='font-medium'>Get to Know Us</h2>
            <p>Careers</p>
            <p>About Amazon</p>
            <p>Investor Relations</p>
            <p>Amazon Devices</p>
          </div>
          <div className='mb-6 md:mb-0'>
            <h2 className='font-medium'>Make Money with Us</h2>
            <p>Sell on Amazon</p>
            <p>Sell Your Services on Amazon</p>
            <p>Sell on Amazon Business</p>
            <p>Sell Your Apps on Amazon</p>
            <p>Become an Affiliate</p>
          </div>
          <div className='mb-6 md:mb-0'>
            <h2 className='font-medium'>Amazon Payment Products</h2>
            <p>Amazon Rewards Visa Signature Cards</p>
            <p>Amazon.com Store Card</p>
            <p>Amazon.com Corporate Credit Line</p>
            <p>Shop with Points</p>
            <p>Credit Card Marketplace</p>
          </div>
          <div className='mb-6 md:mb-0'>
            <h2 className='font-medium'>Let Us Help You</h2>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping Rates & Policies</p>
            <p>Amazon Prime</p>
            <p>Returns & Replacements</p>
            <p>Manage Your Content and Devices</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer