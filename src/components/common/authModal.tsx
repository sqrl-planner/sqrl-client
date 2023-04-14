import React, { useState } from "react"
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation"

import { Dialog, Rule } from "../ui"

import Button from "./button"
import Wordmark from "./wordmark"

const ProviderButton = ({
  // provider,
  // supabaseClient,
  pathname,
  icon,
  name,
}: {
  // provider: Provider
  // supabaseClient: SupabaseClient<any, "public", any>
  pathname: string
  icon: any
  name: string
}) => {
  const Icon = icon
  return (
    <button
      className="flex flex-1 items-center justify-center gap-2 rounded-md border p-2 hover:bg-gray-100"
      onClick={
        async () => {}
        // await supabaseClient.auth.signInWithOAuth({
        //   provider,
        //   options: {
        //     redirectTo: `${getUrl()}${pathname}`,
        //   },
        // })
      }
    >
      <Icon className="h-5 w-5 opacity-70" />
      <span className="relative top-0.5 text-sm font-semibold">{name}</span>
      {/* <span className="sr-only">Sign in with {provider}</span> */}
    </button>
  )
}

const PROVIDERS: Readonly<
  {
    provider: string
    icon: any
    name: string
  }[]
> = [
  {
    provider: "github",
    icon: GitHubLogoIcon,
    name: "GitHub",
  },
  {
    provider: "discord",
    icon: DiscordLogoIcon,
    name: "Discord",
  },
] as const

const AuthModal = () => {
  // const supabaseClient = useSupabaseClient()
  const pathname = usePathname()

  const [showLogin, setShowLogin] = useState(true)

  return (
    <Dialog
      trigger={<Button>Open Dialog</Button>}
      title={
        <div className="flex">
          <Wordmark />
        </div>
      }
    >
      {(closeDialog) => (
        <>
          <div className="flex flex-col gap-4 pt-4">
            {/* <button
              className="flex flex-1 items-center justify-center gap-2 rounded-md border bg-uoft p-2 text-white "
              onClick={() => {
                window.open("https://sp.auth.sqrlplanner.com/secure")
              }}
            >
              <span className="relative top-0.5 text-sm font-semibold">
                Continue with U of T
              </span>
            </button> */}

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold opacity-60">
                <Rule />
                {/* Or&nbsp;use */}
                Continue&nbsp;with&nbsp;
                <Rule />
              </div>
              <div className="flex w-full justify-between gap-4">
                {PROVIDERS.map((provider) => (
                  <ProviderButton
                    key={provider.provider}
                    // provider={provider.provider}
                    // supabaseClient={supabaseClient}
                    pathname={pathname}
                    icon={provider.icon}
                    name={provider.name}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* <div className="w-full overflow-hidden">
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
          </div> */}
        </>
      )}
    </Dialog>
  )
}

export default AuthModal
