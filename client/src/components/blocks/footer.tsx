import React from "react"
import Link from "next/link"
import { EarthLock } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-background/70 backdrop-blur-lg mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & description */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <EarthLock className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">MyApp</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Bringing you secure and fast solutions across the web.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Subscribe for updates and news.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1"
            />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border mt-6 py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
