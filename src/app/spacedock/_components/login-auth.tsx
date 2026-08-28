"use client"

import { cns } from "@/design-system"
import { useAppState } from "@/lib/use-app-state"
import { cn } from "@/ui/cn"
import { IcBaselineDiscord, LucideArrowUpRight } from "@/ui/icons"
import { CheckboxRow, InputBlock } from "@/ui/input"
import { Dialog, type ComponentRenderFn, type DialogTriggerState, type HTMLProps } from "@base-ui/react"
import Link from "next/link"
import { useState, type JSXElementConstructor, type ReactElement } from "react"

export function LoginDialog(props: {
  children?: ReactElement<unknown, string | JSXElementConstructor<any>> | ComponentRenderFn<HTMLProps, DialogTriggerState> | undefined
}) {
  return <Dialog.Root>
    <Dialog.Trigger render={props.children} />
    <Dialog.Portal>
      <Dialog.Backdrop className={cns.popoverBackdrop()} />
      <Dialog.Viewport className="fixed inset-0 grid place-items-center p-4 pointer-events-none">
        <Dialog.Popup className={cns.popoverSurface(
          cns.popoverSurfaceLargeBorder(),
          cns.popoverSurfaceLargeShadow(),
          "pointer-events-auto",
          "rounded-2xl",
          "p-7",
          "w-full max-w-180",
          "flex flex-col gap-4",
        )}>
          <LoginAndForgetSection />
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  </Dialog.Root>
}


function LoginAndForgetSection(props: {
  className?: string
}) {
  const [ isForget, setForget ] = useState(false)

  return <>
    <header className="">
      <Dialog.Title className="text-lg">
        {!isForget ? "Login" : "Request Password Reset"}
      </Dialog.Title>
      <Dialog.Description className={cns.textMuted("max-w-120")}>
        {!isForget ? "Log in to your Spacedock account" : "Forgot your password? It's cool, happens to the best of us. We can help you reset it."}
      </Dialog.Description>
    </header>
    <div className="grid sm:grid-cols-[auto_14rem] gap-8 gap-y-8">
      {!isForget
        ? <LoginForm />
        : <ForgetPasswordForm />
      }
      <div className="flex flex-col gap-2 max-w-80">
        <button
          onClick={() => setForget(!isForget)}
          className={cns.buttonBase()} >
          {!isForget ? "I forgot my password" : "Log In"}
        </button>
        <Link // TODO: Make a dialog to alert user that they need to register on spacedock.info website
          href="https://spacedock.info/register"
          className={cns.buttonBase()} >
          Create new account<LucideArrowUpRight />
        </Link>
        <p className="text-xs mt-4 text-pretty">
          If you run into any trouble, <br /> please get in touch.
        </p>
        <Link // TODO: Make a dialog to alert user that they need to register on spacedock.info website
          href="https://discord.gg/yrSWpxCP"
          className={cns.buttonBase()} >
          <IcBaselineDiscord />
          Support Discord <LucideArrowUpRight />
        </Link>
      </div>
    </div>
  </>
}



function LoginForm(props: {
  className?: string
}) {
  const [ state, setState ] = useAppState("remember-me", () => false, (r) => {
    if (typeof r !== "boolean") return "not a boolean"
    return true
  })
  return (
    <form className={cn("flex gap-4 flex-col", props.className)}>
      <InputBlock label="Username" row className="grid grid-cols-[5rem_auto]">
        <input
          name="username"
          className={cns.inputBox("")}
        />
      </InputBlock>
      <InputBlock label="Password" row className="grid grid-cols-[5rem_auto]">
        <input
          name="password"
          type="password"
          className={cns.inputBox("")}
        />
      </InputBlock>
      <div className="grid grid-cols-[5rem_auto] gap-2 justify-start">
        <div />
        <CheckboxRow
          className="justify-start"
          value={state ?? false}
          onValueChange={setState}
          label={"Remember Me"}
        />
      </div>
      <div className='grid grid-cols-[5rem_auto] gap-2 justify-start'>
        <div />

        <Dialog.Close className={cns.buttonBase("px-12")}>
          Login
        </Dialog.Close>
      </div>
    </form>
  )
}

function ForgetPasswordForm(props: {
  className?: string
}) {
  return (
    <form className={cn("flex gap-4 flex-col", props.className)}>
      <InputBlock label="Email" row className="grid grid-cols-[5rem_auto]">
        <input
          name="email"
          className={cns.inputBox("")}
        />
      </InputBlock>
      <div className='grid grid-cols-[5rem_auto] gap-2 justify-start'>
        <div />
        <Dialog.Close className={cns.buttonBase("px-12")}>
          Submit
        </Dialog.Close>
      </div>
    </form>
  )
}


// export default function ExampleDialog() {
//   return (
//     <Dialog.Root>
//       {/* <Dialog.Trigger className={cn(
//         "flex h-8 items-center justify-center gap-2 border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 px-3 text-sm leading-none whitespace-nowrap font-normal text-neutral-950 dark:text-white select-none hover:not-data-disabled:bg-neutral-100 dark:hover:not-data-disabled:bg-neutral-800 active:not-data-disabled:bg-neutral-200 dark:active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 dark:data-disabled:border-neutral-400 dark:data-disabled:text-neutral-400 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white")}>
//         View notifications
//       </Dialog.Trigger> */}
//       <Dialog.Portal>
//         <Dialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:opacity-50 supports-[-webkit-touch-callout:none]:absolute" />
//         <Dialog.Popup className="fixed top-1/2 left-1/2 -mt-8 flex w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 bg-white dark:bg-neutral-950 p-4 text-neutral-950 dark:text-white border border-neutral-950 dark:border-white shadow-[0.25rem_0.25rem_0] shadow-black/12 dark:shadow-none transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
//           <div className="flex flex-col gap-1">
//             <Dialog.Title className="text-base font-bold">Notifications</Dialog.Title>
//             <Dialog.Description className="text-sm text-neutral-600 dark:text-neutral-400">
//               You are all caught up. Good job!
//             </Dialog.Description>
//           </div>
//           <div className="flex justify-end gap-3">
//             <Dialog.Close className="flex h-8 items-center justify-center gap-2 border border-neutral-950 dark:border-white bg-white dark:bg-neutral-950 px-3 text-sm leading-none whitespace-nowrap font-normal text-neutral-950 dark:text-white select-none hover:not-data-disabled:bg-neutral-100 dark:hover:not-data-disabled:bg-neutral-800 active:not-data-disabled:bg-neutral-200 dark:active:not-data-disabled:bg-neutral-700 data-disabled:border-neutral-500 data-disabled:text-neutral-500 disabled:border-neutral-500 disabled:text-neutral-500 dark:data-disabled:border-neutral-400 dark:data-disabled:text-neutral-400 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950 dark:focus-visible:outline-white">
//               Close
//             </Dialog.Close>
//           </div>
//         </Dialog.Popup>
//       </Dialog.Portal>
//     </Dialog.Root>
//   )
// }