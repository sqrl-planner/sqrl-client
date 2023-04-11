import React, { useState } from "react"
import { Dialog, Rule } from "../ui"
import Button from "./button"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { usePathname } from "next/navigation"
import { getUrl } from "@/utils"
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { Provider, SupabaseClient } from "@supabase/supabase-js"
import {
  IconBrandGoogle,
  IconBrandGoogleAnalytics,
  IconBrandGoogleOne,
} from "@tabler/icons-react"
import { AnimatePresence, motion } from "framer-motion"

const ProviderButton = ({
  provider,
  supabaseClient,
  pathname,
  icon,
}: {
  provider: Provider
  supabaseClient: SupabaseClient<any, "public", any>
  pathname: string
  icon: any
}) => {
  const Icon = icon
  return (
    <button
      className="flex flex-1 items-center justify-center gap-2 rounded-md border p-2 hover:bg-gray-100"
      onClick={async () =>
        await supabaseClient.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${getUrl()}${pathname}`,
          },
        })
      }
    >
      <Icon className="h-5 w-5 opacity-70" />
      <span className="sr-only">Sign in with {provider}</span>
    </button>
  )
}

const variants = {
  hidden: {
    opacity: 0,
    // x: 100,
  },
  visible: {
    opacity: 1,
    // x: 0,
  },
  leave: {
    opacity: 0,
    // x: -100,
  },
}

const RegisterForm = () => {
  const supabaseClient = useSupabaseClient()
  const pathname = usePathname()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        await supabaseClient.auth.signInWithPassword({
          email,
          password,
        })
        setLoading(false)
      }}
      className="flex flex-col gap-4 pt-4"
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-t-md border px-3 py-1.5 text-gray-900 outline-1 outline-blue-700 placeholder:text-gray-400 focus:z-10  sm:text-sm sm:leading-6"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="f relative block w-full rounded-b-md border px-3 py-1.5  text-gray-900 outline-1 outline-blue-700 placeholder:text-gray-400 focus:z-10  sm:text-sm sm:leading-6"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="text-sm">
      Register
      </Button>
    </form>
  )
}

const LoginForm = () => {
  const supabaseClient = useSupabaseClient()
  const pathname = usePathname()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setLoading(true)
        await supabaseClient.auth.signInWithPassword({
          email,
          password,
        })
        setLoading(false)
      }}
      className="flex flex-col gap-4 pt-4"
    >
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full rounded-t-md border px-3 py-1.5 text-gray-900 outline-1 outline-blue-700 placeholder:text-gray-400 focus:z-10  sm:text-sm sm:leading-6"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="f relative block w-full rounded-b-md border px-3 py-1.5  text-gray-900 outline-1 outline-blue-700 placeholder:text-gray-400 focus:z-10  sm:text-sm sm:leading-6"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="text-sm">
        Login
      </Button>
    </form>
  )
}

const PROVIDERS: Readonly<
  {
    provider: Provider
    icon: any
  }[]
> = [
  {
    provider: "github",
    icon: GitHubLogoIcon,
  },
  {
    provider: "discord",
    icon: DiscordLogoIcon,
  },
] as const

const AuthModal = () => {
  const supabaseClient = useSupabaseClient()
  const pathname = usePathname()

  const [showLogin, setShowLogin] = useState(true)

  return (
    <Dialog trigger={<Button>Open Dialog</Button>} title="Login">
      {(closeDialog) => (
        <>
          <button onClick={() => setShowLogin(!showLogin)}>toggle</button>
          <div className="w-full overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              {showLogin ? (
                <motion.div
                  key="login"
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="leave"
                  transition={{
                    type: "ease-in-out",
                  }}
                >
                  <LoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key={"register"}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="leave"
                  transition={{
                    type: "ease-in-out",
                  }}
                >
                  <RegisterForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="my-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-60">
            <Rule />
            <span>Or&nbsp;continue&nbsp;with</span>
            <Rule />
          </div>

          <div className="flex w-full justify-between gap-4">
            {PROVIDERS.map((provider) => (
              <ProviderButton
                key={provider.provider}
                provider={provider.provider}
                supabaseClient={supabaseClient}
                pathname={pathname}
                icon={provider.icon}
              />
            ))}
          </div>
        </>
      )}
    </Dialog>
  )
}

export default AuthModal
