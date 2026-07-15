import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hotel, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo to-gold rounded-xl flex items-center justify-center">
                <Hotel className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Stay<span className="text-gradient">Wise</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm mb-6">
              AI-powered hotel booking platform. Discover, compare, and book the world's finest hotels with personalized recommendations.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-light" />
                <span>hello@staywise.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-light" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-light" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <div className="flex flex-col gap-2">
              {['Hotels', 'Destinations', 'Deals', 'Travel Guides', 'About Us'].map((item) => (
                <Link key={item} to="/search" className="text-slate-400 hover:text-indigo-light text-sm transition-colors flex items-center gap-1 group">
                  {item}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="flex flex-col gap-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map((item) => (
                <span key={item} className="text-slate-400 hover:text-indigo-light text-sm transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} StayWise.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-gold fill-gold" />
            <span>for travelers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
