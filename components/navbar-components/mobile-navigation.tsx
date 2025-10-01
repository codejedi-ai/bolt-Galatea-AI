"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import { MobileNavProps } from "./navbar-types"

export function MobileNavigation({ 
  currentUser, 
  handleLogout, 
  mounted, 
  isAuthPage,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: MobileNavProps) {
  if (!isMobileMenuOpen) return null

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <div className="md:hidden bg-black/90 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
        {currentUser && (
          <>
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-teal-400 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              className="text-gray-300 hover:text-teal-400 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
            <Link
              href="/swipe/enhanced"
              className="text-gray-300 hover:text-teal-400 transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Discover
            </Link>
          </>
        )}
        
        <div className="flex flex-col space-y-2 pt-2">
          {!mounted ? (
            // Show loading state during hydration
            <div className="w-32 h-8 bg-gray-700 rounded animate-pulse"></div>
          ) : currentUser ? (
            <>
              <div className="flex items-center space-x-3 text-gray-300 py-2">
                {/* Profile Picture */}
                {currentUser.user_metadata?.avatar_url ? (
                  <img
                    src={currentUser.user_metadata.avatar_url || "/placeholder.svg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-teal-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                    <User size={18} className="text-black" />
                  </div>
                )}
                {/* Username */}
                <span className="text-sm font-medium">
                  {currentUser.user_metadata?.full_name ||
                    currentUser.user_metadata?.name ||
                    currentUser.user_metadata?.preferred_username ||
                    currentUser.email?.split("@")[0]}
                </span>
              </div>
              <div className="text-xs text-gray-500 px-2">
                Secured by Supabase
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  handleLogout()
                  closeMobileMenu()
                }}
                className="text-gray-300 hover:text-teal-400 justify-start"
              >
                <LogOut size={18} className="mr-2" />
                Log Out
              </Button>
            </>
          ) : !isAuthPage ? (
            <Button
              className="bg-teal-500 text-black hover:bg-teal-400"
              asChild
              onClick={closeMobileMenu}
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
