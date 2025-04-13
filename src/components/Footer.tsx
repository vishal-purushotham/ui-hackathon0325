import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="font-bold text-xl text-primary">
              Forum
            </Link>
            <p className="mt-2 text-subtle-text">
              A modern, responsive text-based forum
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-text mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-subtle-text hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-subtle-text hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/members" className="text-subtle-text hover:text-primary transition-colors">
                    Members
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-text mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-subtle-text hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="text-subtle-text hover:text-primary transition-colors">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-subtle-text hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-semibold text-text mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-subtle-text hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-subtle-text hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-subtle-text hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-subtle-text">
          <p>&copy; {new Date().getFullYear()} Forum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 