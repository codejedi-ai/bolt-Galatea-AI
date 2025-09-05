"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { Heart, Mail, Lock, User, Sparkles } from "lucide-react"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (!firstName.trim()) {
      setError("Please enter your first name")
      return
    }

    setIsLoading(true)
    
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: firstName.trim()
          }
        }
      })
      
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
      
      setSuccessMessage("Check your email to confirm your account before signing in.")
      setIsLoading(false)
    } catch (e: any) {
      setError(e?.message || "Failed to sign up with email")
      setIsLoading(false)
    }
  }

  const handleDiscordSignUp = async () => {
    setIsLoading(true)
    setError("")
    setSuccessMessage("")
    
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      })
      
      if (error) {
        setError(error.message)
        setIsLoading(false)
      }
      // Don't set loading to false here as we're redirecting
    } catch (e: any) {
      setError(e?.message || "Failed to sign up with Discord")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative min-h-screen flex">
        {/* Left Side - Welcome Content */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-teal-400" />
              <h1 className="text-4xl font-bold mb-4">Start Your Journey</h1>
              <p className="text-lg text-gray-300">
                Join thousands of users building confidence and making meaningful connections with AI companions.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-left border border-gray-800">
                <div className="flex items-center mb-2">
                  <Heart className="w-5 h-5 mr-2 text-teal-400" />
                  <span className="font-semibold">Build Confidence</span>
                </div>
                <p className="text-sm text-gray-400">Practice conversations in a judgment-free zone</p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-left border border-gray-800">
                <div className="flex items-center mb-2">
                  <Sparkles className="w-5 h-5 mr-2 text-teal-400" />
                  <span className="font-semibold">Meaningful Conversations</span>
                </div>
                <p className="text-sm text-gray-400">Engage in deep, thoughtful discussions anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-950">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-teal-400" />
              <h1 className="text-3xl font-bold text-white">Join Galatea.AI</h1>
              <p className="text-gray-400 mt-2">Create your account and start connecting</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400">Join our community and build your confidence</p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {successMessage}
              </div>
            )}

            {/* Discord Sign Up Button */}
            <button
              type="button"
              onClick={handleDiscordSignUp}
              disabled={isLoading}
              className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Continue with Discord</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-950 text-gray-400">Or continue with email</span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-gray-900 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-gray-900 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-gray-900 text-white placeholder-gray-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors bg-gray-900 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  required
                  className="w-4 h-4 text-teal-500 border-gray-600 rounded focus:ring-teal-500 bg-gray-900 mt-1" 
                />
                <span className="ml-2 text-sm text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-teal-400 hover:text-teal-300">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-teal-400 hover:text-teal-300">Privacy Policy</Link>
                </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-400 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating your account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link 
                  href="/sign-in" 
                  className="font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-teal-900/20 rounded-lg border border-teal-500/30">
              <p className="text-xs text-teal-400 text-center">
                🎉 Join over 10,000 users building confidence with AI companions!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}